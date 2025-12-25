import { ResponsiveContainer, FunnelChart as ReFunnelChart, Funnel, LabelList, Tooltip, Cell } from 'recharts';
import { Card, CardContent, CardHeader } from '@mui/material';

const COLORS = [
    "#0f172a", // Primary dark
    "#334155",
    "#475569",
    "#64748b",
    "#94a3b8",
    "#cbd5e1"
];

interface Props {
    data: { stage: string; count: number }[];
}

export default function FunnelChart({ data }: Props) {
    return (
        <Card>
            <CardHeader title="Reading Pipeline" titleTypographyProps={{ variant: 'h6' }} />
            <CardContent sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ReFunnelChart>
                        <Tooltip />
                        <Funnel dataKey="count" data={data} isAnimationActive>
                            <LabelList position="right" fill="#000" stroke="none" dataKey="stage" />
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Funnel>
                    </ReFunnelChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
