import React from "react";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HandymanIcon from '@mui/icons-material/Handyman';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



const FileTabsComponent = ({ selectedFile, fileNames, onCompile, setSelectedFile, onNewFile, onDeleteSelected }) => {

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

        <IconButton sx={{
          color: "red"
        }} onClick={onDeleteSelected}>
          <DeleteForeverIcon />
        </IconButton>


        <IconButton
          onClick={onNewFile}
          variant="contained"
          sx={{ marginLeft: "auto" }}
        >
          <AddIcon />
        </IconButton>

        <IconButton
          onClick={onCompile}
          variant="contained"
          sx={{ marginLeft: "auto", color: "#90ee90" }}
        >
          <HandymanIcon />
        </IconButton>
      </Box>
    </Box>



  );
};

export default FileTabsComponent;
