"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytics = exports.getPapers = exports.createPaper = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createPaper = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.paper.create({ data });
});
exports.createPaper = createPaper;
const getPapers = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const where = {};
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
    return yield prisma_1.default.paper.findMany({
        where,
        orderBy: { dateAdded: 'desc' },
    });
});
exports.getPapers = getPapers;
const getAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    const funnelRaw = yield prisma_1.default.paper.groupBy({
        by: ['readingStage'],
        _count: { readingStage: true },
    });
    const funnel = funnelRaw.map(item => ({ stage: item.readingStage, count: item._count.readingStage }));
    const scatterRaw = yield prisma_1.default.paper.findMany({
        select: { citationCount: true, impactScore: true },
    });
    const scatter = scatterRaw.map(p => ({ citationCount: p.citationCount, impactScore: p.impactScore }));
    const stackedRaw = yield prisma_1.default.paper.groupBy({
        by: ['domain', 'readingStage'],
        _count: { id: true },
    });
    const stacked = stackedRaw.map(item => ({ domain: item.domain, stage: item.readingStage, count: item._count.id }));
    const totalPapers = yield prisma_1.default.paper.count();
    const fullyReadCount = yield prisma_1.default.paper.count({ where: { readingStage: 'Fully Read' } });
    const completionRate = totalPapers > 0 ? (fullyReadCount / totalPapers) * 100 : 0;
    const avgCitationsRaw = yield prisma_1.default.paper.groupBy({
        by: ['domain'],
        _avg: { citationCount: true },
    });
    const avgCitationsByDomain = avgCitationsRaw.map(item => ({ domain: item.domain, avgCitations: item._avg.citationCount || 0 }));
    const papersByStage = {};
    funnel.forEach(f => { papersByStage[f.stage] = f.count; });
    return {
        funnel,
        scatter,
        stacked,
        summary: { papersByStage, avgCitationsByDomain, completionRate },
    };
});
exports.getAnalytics = getAnalytics;
