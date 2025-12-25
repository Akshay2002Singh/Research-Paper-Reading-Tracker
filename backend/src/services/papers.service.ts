import prisma from '../utils/prisma';
import { Prisma, ResearchDomain, ReadingStage, ImpactScore } from '@prisma/client';

export const createPaper = async (data: Prisma.PaperCreateInput) => {
    return await prisma.paper.create({ data });
};

interface GetPapersFilters {
    readingStage?: ReadingStage[];
    domain?: ResearchDomain[];
    impactScore?: ImpactScore[];
    dateRange?: string;
}

export const getPapers = async (filters: GetPapersFilters) => {
    const where: Prisma.PaperWhereInput = {};

    if (filters.readingStage && filters.readingStage.length > 0) {
        where.readingStage = { in: filters.readingStage };
    }
    if (filters.domain && filters.domain.length > 0) {
        where.domain = { in: filters.domain };
    }
    if (filters.impactScore && filters.impactScore.length > 0) {
        where.impactScore = { in: filters.impactScore };
    }
    if (filters.dateRange && filters.dateRange !== 'all') {
        const now = new Date();
        let pastDate = new Date();
        switch (filters.dateRange) {
            case 'week':
                pastDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                pastDate.setMonth(now.getMonth() - 1);
                break;
            case '3months':
                pastDate.setMonth(now.getMonth() - 3);
                break;
        }
        where.dateAdded = { gte: pastDate };
    }
    return await prisma.paper.findMany({
        where,
        orderBy: { dateAdded: 'desc' },
    });
};

export const getAnalytics = async () => {
    const funnelRaw = await prisma.paper.groupBy({
        by: ['readingStage'],
        _count: { readingStage: true },
    });
    const funnel = funnelRaw.map(item => ({ stage: item.readingStage, count: item._count.readingStage }));

    const scatterRaw = await prisma.paper.findMany({
        select: { citationCount: true, impactScore: true },
    });
    const scatter = scatterRaw.map(p => ({ citationCount: p.citationCount, impactScore: p.impactScore }));

    const stackedRaw = await prisma.paper.groupBy({
        by: ['domain', 'readingStage'],
        _count: { id: true },
    });
    const stacked = stackedRaw.map(item => ({ domain: item.domain, stage: item.readingStage, count: item._count.id }));

    const totalPapers = await prisma.paper.count();
    const fullyReadCount = await prisma.paper.count({ where: { readingStage: ReadingStage.Fully_Read } });
    const completionRate = totalPapers > 0 ? (fullyReadCount / totalPapers) * 100 : 0;

    const avgCitationsRaw = await prisma.paper.groupBy({
        by: ['domain'],
        _avg: { citationCount: true },
    });
    const avgCitationsByDomain = avgCitationsRaw.map(item => ({ domain: item.domain, avgCitations: item._avg.citationCount || 0 }));

    const papersByStage: Record<string, number> = {};
    funnel.forEach(f => { papersByStage[f.stage] = f.count; });

    return {
        funnel,
        scatter,
        stacked,
        summary: { papersByStage, avgCitationsByDomain, completionRate },
    };
};
