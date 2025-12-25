import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useTheme, useMediaQuery } from '@mui/material';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const navItems = [
        { href: '/library', label: 'Library', icon: <LibraryBooksIcon /> },
        { href: '/add-paper', label: 'Add Paper', icon: <AddCircleIcon /> },
        { href: '/analytics', label: 'Analytics', icon: <DashboardIcon /> },
    ];

    return (
        <AppBar position="sticky" color="default" sx={{ bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', borderBottom: '1px solid', borderColor: 'divider' }}>
            <Toolbar sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'center', sm: 'center' },
                py: { xs: 1, sm: 0 },
                gap: { xs: 1, sm: 0 }
            }}>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: { xs: 0, sm: 0 },
                        mr: { xs: 0, sm: 4 },
                        fontWeight: 'bold',
                        fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}
                >
                    ResearchTracker
                </Typography>
                <Box sx={{
                    display: 'flex',
                    gap: { xs: 0.5, sm: 2 },
                    width: { xs: '100%', sm: 'auto' },
                    justifyContent: { xs: 'center', sm: 'flex-start' }
                }}>
                    {navItems.map((item) => (
                        <Button
                            key={item.href}
                            color={location.pathname === item.href ? 'primary' : 'inherit'}
                            startIcon={item.icon}
                            onClick={() => navigate(item.href)}
                            size={isMobile ? 'small' : 'medium'}
                            sx={{
                                fontWeight: location.pathname === item.href ? 700 : 500,
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
