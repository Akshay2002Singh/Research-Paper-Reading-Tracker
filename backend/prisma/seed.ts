import { PrismaClient, ResearchDomain, ReadingStage, ImpactScore } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    const papers = [
        {
            title: "Attention Is All You Need",
            firstAuthor: "Vaswani",
            domain: ResearchDomain.Computer_Science,
            readingStage: ReadingStage.Notes_Completed,
            citationCount: 95000,
            impactScore: ImpactScore.High_Impact,
        },
        {
            title: "Deep Residual Learning for Image Recognition",
            firstAuthor: "He",
            domain: ResearchDomain.Computer_Science,
            readingStage: ReadingStage.Fully_Read,
            citationCount: 150000,
            impactScore: ImpactScore.High_Impact,
        },
        {
            title: "Generative Adversarial Nets",
            firstAuthor: "Goodfellow",
            domain: ResearchDomain.Computer_Science,
            readingStage: ReadingStage.Results_Analyzed,
            citationCount: 60000,
            impactScore: ImpactScore.High_Impact,
        },
        {
            title: "The Molecular Biology of the Gene",
            firstAuthor: "Watson",
            domain: ResearchDomain.Biology,
            readingStage: ReadingStage.Methodology_Done,
            citationCount: 5000,
            impactScore: ImpactScore.Medium_Impact,
        },
        {
            title: "Quantum Mechanics and Path Integrals",
            firstAuthor: "Feynman",
            domain: ResearchDomain.Physics,
            readingStage: ReadingStage.Introduction_Done,
            citationCount: 12000,
            impactScore: ImpactScore.High_Impact,
        },
        {
            title: "Asymptotic Expansions of Integrals",
            firstAuthor: "Bleistein",
            domain: ResearchDomain.Mathematics,
            readingStage: ReadingStage.Abstract_Read,
            citationCount: 2000,
            impactScore: ImpactScore.Low_Impact,
        },
        {
            title: "The Structure of Scientific Revolutions",
            firstAuthor: "Kuhn",
            domain: ResearchDomain.Social_Sciences,
            readingStage: ReadingStage.Fully_Read,
            citationCount: 40000,
            impactScore: ImpactScore.High_Impact,
        },
        {
            title: "A Relational Model of Data for Large Shared Data Banks",
            firstAuthor: "Codd",
            domain: ResearchDomain.Computer_Science,
            readingStage: ReadingStage.Notes_Completed,
            citationCount: 15000,
            impactScore: ImpactScore.High_Impact,
        },
        {
            title: "CRISPR-Cas9 Gene Editing",
            firstAuthor: "Doudna",
            domain: ResearchDomain.Biology,
            readingStage: ReadingStage.Fully_Read,
            citationCount: 25000,
            impactScore: ImpactScore.High_Impact,
        },
        {
            title: "General Theory of Relativity",
            firstAuthor: "Einstein",
            domain: ResearchDomain.Physics,
            readingStage: ReadingStage.Results_Analyzed,
            citationCount: 80000,
            impactScore: ImpactScore.High_Impact,
        },
        {
            title: "The Selfish Gene",
            firstAuthor: "Dawkins",
            domain: ResearchDomain.Biology,
            readingStage: ReadingStage.Methodology_Done,
            citationCount: 18000,
            impactScore: ImpactScore.High_Impact,
        },
        {
            title: "Introduction to Algorithms",
            firstAuthor: "Cormen",
            domain: ResearchDomain.Computer_Science,
            readingStage: ReadingStage.Fully_Read,
            citationCount: 55000,
            impactScore: ImpactScore.High_Impact,
        },
        {
            title: "On the Origin of Species",
            firstAuthor: "Darwin",
            domain: ResearchDomain.Biology,
            readingStage: ReadingStage.Notes_Completed,
            citationCount: 35000,
            impactScore: ImpactScore.High_Impact,
        },
        {
            title: "Thermodynamics of Small Systems",
            firstAuthor: "Hill",
            domain: ResearchDomain.Chemistry,
            readingStage: ReadingStage.Introduction_Done,
            citationCount: 3000,
            impactScore: ImpactScore.Medium_Impact,
        },
        {
            title: "A Mathematical Theory of Communication",
            firstAuthor: "Shannon",
            domain: ResearchDomain.Mathematics,
            readingStage: ReadingStage.Results_Analyzed,
            citationCount: 120000,
            impactScore: ImpactScore.High_Impact,
        }
    ];

    for (const paper of papers) {
        const created = await prisma.paper.create({
            data: paper,
        });
        console.log(`Created paper: ${created.title}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
