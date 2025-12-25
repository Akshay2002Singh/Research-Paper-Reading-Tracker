export type ResearchDomain =
    | "Computer Science"
    | "Biology"
    | "Physics"
    | "Chemistry"
    | "Mathematics"
    | "Social Sciences";

export type ReadingStage =
    | "Abstract Read"
    | "Introduction Done"
    | "Methodology Done"
    | "Results Analyzed"
    | "Fully Read"
    | "Notes Completed";

export type ImpactScore =
    | "High Impact"
    | "Medium Impact"
    | "Low Impact"
    | "Unknown";

export interface Paper {
    id: string;
    title: string;
    firstAuthor: string;
    domain: ResearchDomain;
    readingStage: ReadingStage;
    citationCount: number;
    impactScore: ImpactScore;
    dateAdded: string;
    createdAt: string;
}

export interface AnalyticsData {
    funnel: { stage: ReadingStage; count: number }[];
    scatter: { citationCount: number; impactScore: ImpactScore }[];
    stacked: { domain: ResearchDomain; stage: ReadingStage; count: number }[];
    summary: {
        papersByStage: Record<string, number>;
        avgCitationsByDomain: { domain: ResearchDomain; avgCitations: number }[];
        completionRate: number;
    };
}
