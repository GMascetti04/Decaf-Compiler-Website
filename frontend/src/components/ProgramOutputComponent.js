import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import MonacoEditor from "@monaco-editor/react";



const ProgramOutputComponent = ({ assemblyOutput, commandLineOutput, otherContent }) => {
  const [selectedTab, setSelectedTab] = useState(0); 

  
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={selectedTab} 
        onChange={handleTabChange} 
        aria-label="compiler output tabs"
        variant="fullWidth"
      >
        <Tab label="Assembly Output" />
        <Tab label="Command Line Output" />
        
      </Tabs>

    
      <Box>
        {selectedTab === 0 && (
            <MonacoEditor
                height="500px"
                width="100%"
                readOnly={true}
                value={assemblyOutput}
                theme="vs-dark" 
                options={{domReadOnly: true}}
            />
        )}
        {selectedTab === 1 && (
            <Typography variant="body1" sx={{whiteSpace: 'pre-line'}}>
            {commandLineOutput}
          </Typography> 
        )}
        
      </Box>
    </Box>
  );
};

export default ProgramOutputComponent;
