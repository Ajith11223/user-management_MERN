import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AdminAuthContext } from '../../../context/AdminAuthContext.js'
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
    const navigate = useNavigate()
    const { admin,dispatch } = useContext(AdminAuthContext)
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/admin')
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        Users Management
                    </Typography>
                    {
                        admin?<Button color="inherit" onClick={handleLogout}>Logout</Button>:null
                    }
                    
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar
