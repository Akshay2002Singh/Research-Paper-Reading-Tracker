import { useState } from 'react';
import { Paper, ResearchDomain, ReadingStage, ImpactScore } from '../types';
import { enumToDisplay } from '@/lib/enumUtils';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    TextField,
    MenuItem,
    Grid,
    CircularProgress
} from '@mui/material';
import { DOMAINS, STAGES, IMPACTS } from '@/lib/constants';

interface PaperFormProps {
    onSubmit: (data: Omit<Paper, 'id' | 'dateAdded' | 'createdAt'>) => void;
    isLoading?: boolean;
}

export default function PaperForm({ onSubmit, isLoading }: PaperFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        firstAuthor: '',
        domain: 'Computer_Science' as ResearchDomain,
        readingStage: 'Abstract_Read' as ReadingStage,
        citationCount: 0 as number | string,
        impactScore: 'Unknown' as ImpactScore,
    });

    const handleChange = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            citationCount: Number(formData.citationCount) || 0
        } as any);
    };

    return (
        <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
            <CardHeader title="Add New Research Paper" titleTypographyProps={{ align: 'center', variant: 'h5' }} />
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        label="Paper Title"
                        required
                        fullWidth
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="e.g. Attention Is All You Need"
                    />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="First Author"
                                required
                                fullWidth
                                value={formData.firstAuthor}
                                onChange={(e) => handleChange('firstAuthor', e.target.value)}
                                placeholder="e.g. Vaswani"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                label="Research Domain"
                                fullWidth
                                value={formData.domain}
                                onChange={(e) => handleChange('domain', e.target.value)}
                            >
                                {DOMAINS.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {enumToDisplay(option)}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                label="Reading Stage"
                                fullWidth
                                value={formData.readingStage}
                                onChange={(e) => handleChange('readingStage', e.target.value)}
                            >
                                {STAGES.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {enumToDisplay(option)}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Citation Count"
                                type="number"
                                fullWidth
                                value={formData.citationCount}
                                onChange={(e) => handleChange('citationCount', e.target.value)}
                                InputProps={{
                                    inputProps: { min: 0 }
                                }}
                            />
                        </Grid>
                    </Grid>

                    <TextField
                        select
                        label="Impact Score"
                        fullWidth
                        value={formData.impactScore}
                        onChange={(e) => handleChange('impactScore', e.target.value)}
                    >
                        {IMPACTS.map((option) => (
                            <MenuItem key={option} value={option}>
                                {enumToDisplay(option)}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                        startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
                    >
                        {isLoading ? 'Adding...' : 'Add Paper'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
