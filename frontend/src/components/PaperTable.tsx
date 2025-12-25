import { useState } from 'react';
import { Paper as PaperType } from '@/types';
import { enumToDisplay } from '@/lib/enumUtils';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

interface PaperTableProps {
    papers: PaperType[];
}

export default function PaperTable({ papers }: PaperTableProps) {
    const [selectedPaper, setSelectedPaper] = useState<PaperType | null>(null);
    const [open, setOpen] = useState(false);

    const handleViewClick = (paper: PaperType) => {
        setSelectedPaper(paper);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPaper(null);
    };

    if (papers.length === 0) {
        return <Typography variant="h6" align="center" sx={{ py: 5, color: 'text.secondary', border: '1px dashed #ccc', borderRadius: 2 }}>No papers found.</Typography>;
    }

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'High Impact': return 'error';
            case 'Medium Impact': return 'primary';
            default: return 'default';
        }
    };

    return (
        <>
            <TableContainer component={Paper} elevation={1}>
                <Table sx={{ minWidth: 650 }} aria-label="papers table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Title</strong></TableCell>
                            <TableCell><strong>Author</strong></TableCell>
                            <TableCell><strong>Domain</strong></TableCell>
                            <TableCell><strong>Stage</strong></TableCell>
                            <TableCell><strong>Impact</strong></TableCell>
                            <TableCell align="right"><strong>Citations</strong></TableCell>
                            <TableCell align="right"><strong>Date Added</strong></TableCell>
                            <TableCell align="center"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {papers.map((paper) => (
                            <TableRow
                                key={paper.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Typography variant="body2" sx={{ fontWeight: 500 }} title={paper.title}>
                                        {paper.title.length > 50 ? `${paper.title.substring(0, 50)}...` : paper.title}
                                    </Typography>
                                </TableCell>
                                <TableCell>{paper.firstAuthor}</TableCell>
                                <TableCell>{enumToDisplay(paper.domain)}</TableCell>
                                <TableCell>
                                    <Chip label={enumToDisplay(paper.readingStage)} size="small" variant="outlined" />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={enumToDisplay(paper.impactScore)}
                                        size="small"
                                        color={getImpactColor(paper.impactScore) as any}
                                        variant={paper.impactScore === 'Unknown' ? 'outlined' : 'filled'}
                                    />
                                </TableCell>
                                <TableCell align="right">{paper.citationCount}</TableCell>
                                <TableCell align="right">{new Date(paper.dateAdded).toLocaleDateString()}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        size="small"
                                        onClick={() => handleViewClick(paper)}
                                        title="View Details"
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* View Paper Modal */}
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Paper Details</Typography>
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {selectedPaper && (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" color="text.secondary">Title</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                                    {selectedPaper.title}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="text.secondary">First Author</Typography>
                                <Typography variant="body1" sx={{ mt: 0.5 }}>
                                    {selectedPaper.firstAuthor}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="text.secondary">Research Domain</Typography>
                                <Typography variant="body1" sx={{ mt: 0.5 }}>
                                    {enumToDisplay(selectedPaper.domain)}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="text.secondary">Reading Stage</Typography>
                                <Chip
                                    label={enumToDisplay(selectedPaper.readingStage)}
                                    variant="outlined"
                                    sx={{ mt: 0.5 }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="text.secondary">Impact Score</Typography>
                                <Chip
                                    label={enumToDisplay(selectedPaper.impactScore)}
                                    color={getImpactColor(selectedPaper.impactScore) as any}
                                    variant={selectedPaper.impactScore === 'Unknown' ? 'outlined' : 'filled'}
                                    sx={{ mt: 0.5 }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="text.secondary">Citation Count</Typography>
                                <Typography variant="h6" sx={{ mt: 0.5, color: 'primary.main' }}>
                                    {selectedPaper.citationCount.toLocaleString()}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="text.secondary">Date Added</Typography>
                                <Typography variant="body1" sx={{ mt: 0.5 }}>
                                    {new Date(selectedPaper.dateAdded).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
