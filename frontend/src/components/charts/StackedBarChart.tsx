import { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader } from '@mui/material';
import { STAGES } from '@/lib/constants';

const STAGE_COLORS = [
    "#0d47a1",
    "#1565c0",
    "#1976d2",
    "#2196f3",
    "#42a5f5",
    "#90caf9"
];

interface Props {
    data: { domain: string; stage: string; count: number }[];
}

export default function StackedBarChart({ data }: Props) {
    const chartData = useMemo(() => {
        const map: Record<string, any> = {};
        data.forEach(item => {
            if (!map[item.domain]) map[item.domain] = { domain: item.domain };
            map[item.domain][item.stage] = item.count;
        });
        return Object.values(map);
    }, [data]);

    return (
        <Card>
            <CardHeader title="Distribution by Domain" titleTypographyProps={{ variant: 'h6' }} />
            <CardContent sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="domain" fontSize={12} interval={0} angle={-30} textAnchor="end" height={60} />
                        <YAxis />
                        <Tooltip />
                        <Legend wrapperStyle={{ paddingTop: "20px" }} />
                        {STAGES.map((stage, idx) => (
                            <Bar key={stage} dataKey={stage} stackId="a" fill={STAGE_COLORS[idx % STAGE_COLORS.length]} />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
