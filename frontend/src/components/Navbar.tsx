import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { href: '/library', label: 'Library', icon: <LibraryBooksIcon /> },
        { href: '/add-paper', label: 'Add Paper', icon: <AddCircleIcon /> },
        { href: '/analytics', label: 'Analytics', icon: <DashboardIcon /> },
    ];

    return (
        <AppBar position="sticky" color="default" sx={{ bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4, fontWeight: 'bold' }}>
                    ResearchTracker
                </Typography>
                <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                    {navItems.map((item) => (
                        <Button
                            key={item.href}
                            color={location.pathname === item.href ? 'primary' : 'inherit'}
                            startIcon={item.icon}
                            onClick={() => navigate(item.href)}
                            sx={{ fontWeight: location.pathname === item.href ? 700 : 500 }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
