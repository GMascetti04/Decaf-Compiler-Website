import React, { useState } from "react";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const url = "https://github.com/GMascetti04/Decaf-Compiler";

const MenuBar = () => {

    const [aboutModalOpen, setAboutModalOpen] = useState(false)
    const [helpModalOpen, setHelpModalOpen] = useState(false)

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Decaf Compiler
                    </Typography>
                    <Button color="inherit" onClick={() => { window.open(url, '_blank'); }}>  <GitHubIcon /> <Typography>GitHub</Typography>   </Button>
                    <Button color="inherit" onClick={() => { setAboutModalOpen(true); }}>About</Button>
                    <Button color='inherit' onClick={() => { setHelpModalOpen(true); }}> <HelpOutlineIcon /> Help </Button>
                </Toolbar>
            </AppBar>


            <Dialog open={helpModalOpen} onClose={() => { setHelpModalOpen(false); }}>

                <DialogTitle>
                    <Typography id="about-modal-title" variant="h5" component="h2" gutterBottom>
                        Help
                    </Typography></DialogTitle>

                <DialogContent>

                    
                    <Typography variant="body1" paragraph>
                        Add help text here!
                    </Typography>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setHelpModalOpen(false); }}>Close</Button>
                </DialogActions>
            </Dialog>



            <Dialog open={aboutModalOpen} onClose={() => { setAboutModalOpen(false); }}>

                <DialogTitle>
                    <Typography id="about-modal-title" variant="h5" component="h2" gutterBottom>
                        About This Project
                    </Typography></DialogTitle>

                <DialogContent>

                    
                    <Typography variant="body1" paragraph>
                        Decaf is an object-oriented programming language similar to Java. It was designed to
                        provide students with experience in compiler development.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The compiler compiles Decaf source code into abstract assembly code that can be executed
                        in a custom virtual machine.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <i>Note:</i> This project was created by Giovanni Mascetti as part of a compiler design
                        course at Stony Brook University.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setAboutModalOpen(false); }}>Close</Button>
                </DialogActions>
            </Dialog></div>
    );
};

export default MenuBar;
