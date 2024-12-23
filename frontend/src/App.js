import React, { useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import FileTabsComponent from "./components/FileTabsComponent";
import CodeEditorComponent from "./components/CodeEditorComponent";
import ProgramOutputComponent from "./components/ProgramOutputComponent";
import NetworkErrorModal from "./components/NetworkErrorModal";
import MenuBar from "./components/MenuBarComponent";


const default_program =
  `class Test {
  public static void main() {

    int a;
    int b;

    a = 1;
    b = 2;

    Out.print(a+b);

  }
}`;

const CompilerFrontend = () => {
  const [sourceCode, setSourceCode] = useState(default_program);
  

  const [compilerOutput, setCompilerOutput] = useState("");
  const [assemblyOutput, setAssemblyOutput] = useState("");
  const [displayErrorModal, setDisplayErrorModal] = useState(false);


  const [files, setFiles] = useState([
    {
      name: "file1.decaf",
      sourceCode: default_program,
    }
  ]
  );

  const [selectedFile, setSelectedFile] = useState('file1.decaf');

  const handleDeleteSelected = () => {
    alert("Delete file not implemented yet!")
  }

  const handleNewFile = () => {
    
    const newFile = {
      name: `file${files.length + 1}.decaf`, 
      sourceCode: "", 
    };
  
    setFiles((prevFiles) => [...prevFiles, newFile])
  }

  
  const handleCompile = async () => {
    const endpoint = "https://flask-fire-637551824687.us-central1.run.app/compile";
    const payload = { sourceCode };

    try {
      const response = await axios.post(endpoint, payload);
      setAssemblyOutput(response.data.output);
      setCompilerOutput(response.data.res);

    } catch (error) {
      if (error.response) {
        console.error("Error code:", error.response.status);
        console.error("Error message:", error.response.data); 
      } else if (error.request) {
        setDisplayErrorModal(true);
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
        setDisplayErrorModal(true);
      }
      
    }
  };

  const changeSelectedFile = (new_file) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.name === selectedFile ? { ...file, sourceCode: sourceCode } : file
      )
    );
    setSelectedFile(new_file);
    setSourceCode(files.find((file) => file.name === new_file).sourceCode);
  } 

  return (
    <div>

      <MenuBar />

      <NetworkErrorModal open={displayErrorModal} onClose={() => {setDisplayErrorModal(false)}}/>

      <div style={{ padding: "20px", display: 'flex', justifyContent: 'space-between' }}>


        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", width: "50%" }}>
          <FileTabsComponent fileNames={files.map(file => file.name)} 
          selectedFile={selectedFile}
           setSelectedFile={changeSelectedFile}
           onCompile={handleCompile}
           onNewFile={handleNewFile}
           onDeleteSelected={handleDeleteSelected} />

          <CodeEditorComponent sourceCode={sourceCode} setSourceCode={setSourceCode}></CodeEditorComponent>

        </Box>

        <Box sx={{ width: '50%', height: "500px" }}>
          <ProgramOutputComponent  assemblyOutput={assemblyOutput} commandLineOutput={compilerOutput} />
        </Box>
      </div>
      
      
    </div>
  );
};

export default CompilerFrontend;
