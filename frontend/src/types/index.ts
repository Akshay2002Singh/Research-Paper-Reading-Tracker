export type ResearchDomain =
    | "Computer_Science"
    | "Biology"
    | "Physics"
    | "Chemistry"
    | "Mathematics"
    | "Social_Sciences";

export type ReadingStage =
    | "Abstract_Read"
    | "Introduction_Done"
    | "Methodology_Done"
    | "Results_Analyzed"
    | "Fully_Read"
    | "Notes_Completed";

export type ImpactScore =
    | "High_Impact"
    | "Medium_Impact"
    | "Low_Impact"
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
