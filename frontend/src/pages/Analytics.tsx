import { useQuery } from '@tanstack/react-query';
import { getAnalytics } from '@/api/papers';
import FunnelChart from '@/components/charts/FunnelChart';
import ScatterPlot from '@/components/charts/ScatterPlot';
import StackedBarChart from '@/components/charts/StackedBarChart';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Box,
    CircularProgress
} from '@mui/material';

export default function Analytics() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['analytics'],
        queryFn: getAnalytics,
    });

    if (isLoading) return <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box>;
    if (isError || !data) return <Typography color="error" align="center" mt={4}>Error loading analytics data.</Typography>;

    const topDomain = data.summary.avgCitationsByDomain.length > 0
        ? [...data.summary.avgCitationsByDomain].sort((a, b) => b.avgCitations - a.avgCitations)[0]
        : null;

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>Analytics Dashboard</Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">Completion Rate</Typography>
                            <Typography variant="h4" fontWeight="bold">
                                {data.summary.completionRate.toFixed(1)}%
                            </Typography>
                            <Typography variant="caption" color="text.secondary">Papers Fully Read</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary">Highest Avg Citations</Typography>
                            {topDomain ? (
                                <>
                                    <Typography variant="h4" fontWeight="bold">
                                        {Math.round(topDomain.avgCitations)}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {topDomain.domain}
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="h4" fontWeight="bold">-</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid item xs={12} lg={6}>
                    <FunnelChart data={data.funnel} />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <ScatterPlot data={data.scatter} />
                </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
                <StackedBarChart data={data.stacked} />
            </Box>
        </Container>
    );
}
