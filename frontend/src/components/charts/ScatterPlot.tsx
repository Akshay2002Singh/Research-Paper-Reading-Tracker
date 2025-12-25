import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader } from '@mui/material';

const IMPACT_COLORS: Record<string, string> = {
    "High Impact": "#d32f2f", // Error Red
    "Medium Impact": "#1976d2", // Primary Blue
    "Low Impact": "#757575",   // Grey
    "Unknown": "#e0e0e0"       // Light Grey
};

interface Props {
    data: { citationCount: number; impactScore: string }[];
}

export default function ScatterPlot({ data }: Props) {
    const grouped = data.reduce((acc, curr) => {
        if (!acc[curr.impactScore]) acc[curr.impactScore] = [];
        acc[curr.impactScore].push(curr);
        return acc;
    }, {} as Record<string, typeof data>);

    return (
        <Card>
            <CardHeader title="Impact vs Citations" titleTypographyProps={{ variant: 'h6' }} />
            <CardContent sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="citationCount" name="Citations" />
                        <YAxis type="category" dataKey="impactScore" name="Impact" width={100} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        {Object.entries(grouped).map(([impact, items]) => (
                            <Scatter key={impact} name={impact} data={items} fill={IMPACT_COLORS[impact] || "#8884d8"} />
                        ))}
                    </ScatterChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
