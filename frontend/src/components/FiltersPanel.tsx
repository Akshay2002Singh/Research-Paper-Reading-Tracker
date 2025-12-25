import { useState } from 'react';
import { DOMAINS, STAGES, IMPACTS } from '@/lib/constants';
import { enumToDisplay } from '@/lib/enumUtils';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Checkbox,
    FormControlLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface FilterState {
    domain: string[];
    readingStage: string[];
    impactScore: string[];
    dateRange: string;
}

interface FiltersPanelProps {
    initialFilters?: FilterState;
    onFilterChange: (filters: FilterState) => void;
}

export default function FiltersPanel({ initialFilters, onFilterChange }: FiltersPanelProps) {
    const [filters, setFilters] = useState<FilterState>(initialFilters || {
        domain: [],
        readingStage: [],
        impactScore: [],
        dateRange: 'all',
    });

    const handleCheckboxChange = (category: keyof FilterState, value: string, checked: boolean) => {
        const currentList = filters[category] as string[];
        const newList = checked
            ? [...currentList, value]
            : currentList.filter(item => item !== value);

        const newFilters = { ...filters, [category]: newList };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleDateChange = (val: string) => {
        const newFilters = { ...filters, dateRange: val };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <Box sx={{ width: '100%', mb: 2 }}>
            <Typography variant="h6" gutterBottom>Filters</Typography>

            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Date Added</InputLabel>
                <Select
                    label="Date Added"
                    value={filters.dateRange}
                    onChange={(e) => handleDateChange(e.target.value)}
                >
                    <MenuItem value="all">All Time</MenuItem>
                    <MenuItem value="week">Past Week</MenuItem>
                    <MenuItem value="month">Past Month</MenuItem>
                    <MenuItem value="3months">Past 3 Months</MenuItem>
                </Select>
            </FormControl>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Research Domain</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {DOMAINS.map(d => (
                            <FormControlLabel
                                key={d}
                                control={
                                    <Checkbox
                                        checked={filters.domain.includes(d)}
                                        onChange={(e) => handleCheckboxChange('domain', d, e.target.checked)}
                                        size="small"
                                    />
                                }
                                label={enumToDisplay(d)}
                            />
                        ))}
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Reading Stage</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {STAGES.map(s => (
                            <FormControlLabel
                                key={s}
                                control={
                                    <Checkbox
                                        checked={filters.readingStage.includes(s)}
                                        onChange={(e) => handleCheckboxChange('readingStage', s, e.target.checked)}
                                        size="small"
                                    />
                                }
                                label={enumToDisplay(s)}
                            />
                        ))}
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Impact Score</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {IMPACTS.map(i => (
                            <FormControlLabel
                                key={i}
                                control={
                                    <Checkbox
                                        checked={filters.impactScore.includes(i)}
                                        onChange={(e) => handleCheckboxChange('impactScore', i, e.target.checked)}
                                        size="small"
                                    />
                                }
                                label={enumToDisplay(i)}
                            />
                        ))}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
