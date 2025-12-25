import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPapers } from '@/api/papers';
import FiltersPanel, { FilterState } from '@/components/FiltersPanel';
import PaperTable from '@/components/PaperTable';
import {
    Container,
    Grid,
    Typography,
    Box,
    CircularProgress,
    Alert,
    Paper
} from '@mui/material';

export default function Library() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Parse params
    const filtersFromUrl: FilterState = useMemo(() => {
        return {
            domain: searchParams.getAll('domain'),
            readingStage: searchParams.getAll('readingStage'),
            impactScore: searchParams.getAll('impactScore'),
            dateRange: searchParams.get('dateRange') || 'all',
        }
    }, [searchParams]);

    const { data: papers, isLoading, isError } = useQuery({
        queryKey: ['papers', searchParams.toString()], // Key depends on all params
        queryFn: () => getPapers(filtersFromUrl),
    });

    const handleFilterChange = (newFilters: FilterState) => {
        const params = new URLSearchParams();
        if (newFilters.dateRange && newFilters.dateRange !== 'all') params.set('dateRange', newFilters.dateRange);
        // Multi-values
        newFilters.domain.forEach(d => params.append('domain', d));
        newFilters.readingStage.forEach(s => params.append('readingStage', s));
        newFilters.impactScore.forEach(i => params.append('impactScore', i));

        setSearchParams(params);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={3} sx={{ position: { md: 'sticky' }, top: 80, height: 'fit-content' }}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0' }}>
                        <FiltersPanel initialFilters={filtersFromUrl} onFilterChange={handleFilterChange} />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={9}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>Paper Library</Typography>

                    {isLoading ? (
                        <Box display="flex" justifyContent="center" p={10}><CircularProgress /></Box>
                    ) : isError ? (
                        <Alert severity="error">Error loading papers. Ensure backend is running.</Alert>
                    ) : (
                        <PaperTable papers={papers || []} />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}
