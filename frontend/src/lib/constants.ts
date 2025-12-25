import { ResearchDomain, ReadingStage, ImpactScore } from "@/types";

export const DOMAINS: ResearchDomain[] = [
    "Computer_Science", "Biology", "Physics", "Chemistry", "Mathematics", "Social_Sciences"
];

export const STAGES: ReadingStage[] = [
    "Abstract_Read", "Introduction_Done", "Methodology_Done", "Results_Analyzed", "Fully_Read", "Notes_Completed"
];

export const IMPACTS: ImpactScore[] = [
    "High_Impact", "Medium_Impact", "Low_Impact", "Unknown"
];
