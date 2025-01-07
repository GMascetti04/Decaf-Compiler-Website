import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import MonacoEditor from "@monaco-editor/react";
import CompilerTerminalComponent from './CompilerTerminalComponent';
import ReactJson from 'react-json-view'


const ProgramOutputComponent = ({commandLineOutput, ASTOutput, IROutput, STOutput } :
   {commandLineOutput : string, ASTOutput : JSON, IROutput : string, STOutput : JSON}) => {
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
        
        <Tab label="Command Line Output" />
        <Tab label="Abstract Syntax Tree" />
        <Tab label="Symbol Table" />
        <Tab label="IR Code" />
        
      </Tabs>

    
      <Box >

      

        {selectedTab === 0 && (

          <CompilerTerminalComponent output={commandLineOutput} />

        )}

        {selectedTab === 1 && (
          <ReactJson src={ASTOutput} />
        )}

        {selectedTab === 2 && (
          <ReactJson src={STOutput} />
        )}

        {selectedTab === 3 && (

          <CompilerTerminalComponent output={IROutput}/>

         

        )}
        
      </Box>
    </Box>
  );
};

export default ProgramOutputComponent;
