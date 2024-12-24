import React, { useState, useRef, useEffect }  from "react";
import { Tabs, Tab, Box, IconButton , Tooltip, Typography, Dialog, DialogContent, Button, DialogTitle, DialogActions, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HandymanIcon from '@mui/icons-material/Handyman';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from "@mui/lab";



const FileTabsComponent = ({ selectedFile, fileNames, onCompile, setSelectedFile, onNewFile, onDeleteSelected, onRenameSelected, displayLoading }) => {

    const [renameFileModalOpen, setRenameFileModalOpen] = useState(false);
    const [newFileName, setNewFileName] = useState("");

    const inputRef = useRef(null);

    const closeModalWithoutRenamingFile = () => {
        setNewFileName("");
        setRenameFileModalOpen(false);
    }

    const closeModalAndRenameFile = () => {
        onRenameSelected(newFileName)
        setNewFileName("");
        setRenameFileModalOpen(false);
    }

    useEffect(() => {
        if (renameFileModalOpen && inputRef.current) {
          inputRef.current.focus();
        }
      }, [renameFileModalOpen]);

  return (


    <Box sx={{
      display: "flex", alignItems: "center", width: "100%",
      maxWidth: "100%",
      overflowX: "auto", justifyContent: "space-between"
    }}>
      <Tabs
        value={selectedFile}
        onChange={(e, newValue) => setSelectedFile(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {fileNames.map((tab, index) => (
          <Tab
            value={tab}
            key={tab}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }} >
                {tab}

              </Box>
            }
          />
        ))}
      </Tabs>

      <Box>

    <Tooltip title="rename">
        <IconButton variant="contained" onClick={() => { setRenameFileModalOpen(true); }}>
            <EditIcon />
        </IconButton>
      </Tooltip>

    <Tooltip title='delete'>
        <IconButton sx={{
          color: "red"
        }} onClick={onDeleteSelected}>
            <DeleteForeverIcon />
        </IconButton>
    </Tooltip>
       
    <Tooltip title ='new file'>
        <IconButton
          onClick={onNewFile}
          variant="contained"
          sx={{ marginLeft: "auto" }}
        >
            <AddIcon />
        </IconButton>
    </Tooltip>
        
    <Tooltip title = 'compile'>
        <LoadingButton

          loading={displayLoading}
          onClick={onCompile}
          variant="contained"
          sx={{ marginLeft: "auto", color: "#90ee90" }}
        >
            <HandymanIcon />
        </LoadingButton>
    </Tooltip>

      </Box>

      <Dialog open={renameFileModalOpen} onClose={closeModalWithoutRenamingFile} PaperProps={{
          sx: {
            width: "400px",
            height: "300px",
          },
        }}>

                <DialogTitle>
                    <Typography id="about-modal-title" variant="h5" component="h2" gutterBottom>
                        Rename File
                    </Typography></DialogTitle>

                <DialogContent>
                <Box sx={{padding:'20px'}}>
                <TextField
                    label="Enter text"
                    variant="outlined" 
                    inputRef={inputRef}
                    value={newFileName}
                    onChange={(event) => {setNewFileName(event.target.value)}}
                    fullWidth 
                    placeholder={selectedFile}
                    error={fileNames.includes(newFileName)}
                    helperText={fileNames.includes(newFileName) ? "file name already used" : ""}
                    />
                </Box>
                    
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModalWithoutRenamingFile}>Close</Button>
                    <Button onClick={closeModalAndRenameFile}>Rename</Button>
                </DialogActions>
            </Dialog>
    </Box>

        

  );
};

export default FileTabsComponent;
