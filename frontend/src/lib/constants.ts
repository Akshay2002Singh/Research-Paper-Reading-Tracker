import { ResearchDomain, ReadingStage, ImpactScore } from "@/types";

export const DOMAINS: ResearchDomain[] = [
    "Computer Science", "Biology", "Physics", "Chemistry", "Mathematics", "Social Sciences"
];

export const STAGES: ReadingStage[] = [
    "Abstract Read", "Introduction Done", "Methodology Done", "Results Analyzed", "Fully Read", "Notes Completed"
];

export const IMPACTS: ImpactScore[] = [
    "High Impact", "Medium Impact", "Low Impact", "Unknown"
];
