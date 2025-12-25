import { Request, Response } from 'express';
import * as paperService from '../services/papers.service';
import { ResearchDomain, ReadingStage, ImpactScore } from '@prisma/client';

// Helper function to convert display names to enum keys
const convertToEnumKey = (value: string): string => {
    return value.replace(/ /g, '_');
};

// Helper function to convert enum keys back to display names
const convertToDisplayName = (value: string): string => {
    return value.replace(/_/g, ' ');
};

export const createPaperHandler = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        
        // Transform display names to enum keys
        const transformedData = {
            ...data,
            domain: convertToEnumKey(data.domain) as ResearchDomain,
            readingStage: convertToEnumKey(data.readingStage) as ReadingStage,
            impactScore: convertToEnumKey(data.impactScore) as ImpactScore,
        };
        
        const newPaper = await paperService.createPaper(transformedData);
        res.status(201).json(newPaper);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getPapersHandler = async (req: Request, res: Response) => {
    try {
        const { readingStage, domain, impactScore, dateRange } = req.query;
        const parseArray = (val: any) => {
            if (!val) return undefined;
            return Array.isArray(val) ? val : [val];
        };
        const filters = {
            readingStage: parseArray(readingStage) as ReadingStage[] | undefined,
            domain: parseArray(domain) as ResearchDomain[] | undefined,
            impactScore: parseArray(impactScore) as ImpactScore[] | undefined,
            dateRange: dateRange as string | undefined,
        };
        const papers = await paperService.getPapers(filters);
        res.json(papers);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAnalyticsHandler = async (req: Request, res: Response) => {
    try {
        const analytics = await paperService.getAnalytics();
        res.json(analytics);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
