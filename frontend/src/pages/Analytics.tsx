import { useQuery } from '@tanstack/react-query';
import { getAnalytics } from '@/api/papers';
import { enumToDisplay } from '@/lib/enumUtils';
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
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Completion Rate</Typography>
                            <Typography variant="h4" fontWeight="bold">
                                {data.summary.completionRate.toFixed(1)}%
                            </Typography>
                            <Typography variant="caption" color="text.secondary">Papers Fully Read / Total</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Top Research Domain</Typography>
                            {topDomain ? (
                                <>
                                    <Typography variant="h4" fontWeight="bold">
                                        {Math.round(topDomain.avgCitations)}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Avg. citations in {enumToDisplay(topDomain.domain)}
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="h4" fontWeight="bold">-</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Papers by Stage</Typography>
                            <Box sx={{ mt: 1 }}>
                                {Object.entries(data.summary.papersByStage).map(([stage, count]) => (
                                    <Box key={stage} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                        <Typography variant="caption">{enumToDisplay(stage)}</Typography>
                                        <Typography variant="caption" fontWeight="bold">{count}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Avg Citations by Domain</Typography>
                            <Box sx={{ mt: 1 }}>
                                {data.summary.avgCitationsByDomain.map((item) => (
                                    <Box key={item.domain} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                        <Typography variant="caption">{enumToDisplay(item.domain)}</Typography>
                                        <Typography variant="caption" fontWeight="bold">{Math.round(item.avgCitations)}</Typography>
                                    </Box>
                                ))}
                            </Box>
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
