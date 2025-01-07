import React, { useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import FileTabsComponent from "./components/FileTabsComponent";
import CodeEditorComponent from "./components/CodeEditorComponent";
import ProgramOutputComponent from "./components/ProgramOutputComponent.tsx";
import NetworkErrorModal from "./components/NetworkErrorModal";
import MenuBar from "./components/MenuBarComponent";


const default_program =
  `class FibTest {

  public static int fib(int n) {
    int prev, cur, next, i;

    if (n <= 1)
      return n;

    prev = 0;
    cur = 1;
    
    for(i = 2; i <= n; i++) {
      next = prev + cur;
      prev = cur;
      cur = next;
    }

    return cur;
  }

  public static void main() {
    int res;

    res = FibTest.fib(5);
    Out.print(res);
  }

}`;

const CompilerFrontend = () => {
  const [sourceCode, setSourceCode] = useState(default_program);
  
  const [compileOutput, setCompileOutput] = useState({
    ast: {},
    ir: '',
    st : {},
    cl : ''
  })


  
  const [displayErrorModal, setDisplayErrorModal] = useState(false);

  const [waitingForCompile, setWaitingForCompile] = useState(false);

  const [networkErrMsg, setNetworkErrMsg] = useState("")


  const [files, setFiles] = useState([
    {
      name: "file1.decaf",
      sourceCode: default_program,
    }
  ]
  );

  const [selectedFile, setSelectedFile] = useState('file1.decaf');

  const handleDeleteSelected = () => {
    if(files.length === 1) {
      alert("Must have one file!");
    } else {
      let indexToRemove = files.findIndex((file) => file.name === selectedFile)
      if(indexToRemove == -1) {
        alert("error")
      }
      let newSelected = files[indexToRemove == 0 ? 1 : indexToRemove - 1].name
      let newSourceCode = files[indexToRemove == 0 ? 1 : indexToRemove - 1].sourceCode;
      setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
      setSelectedFile(newSelected);
      setSourceCode(newSourceCode);
      
    }
    
  }

  const handleNewFile = () => {
    
    const newFile = {
      name: `file${files.length + 1}.decaf`, 
      sourceCode: "", 
    };
  
    setFiles((prevFiles) => [...prevFiles, newFile])
  }

  const handleRenameSelected = (newName) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.name === selectedFile ? { ...file, name: newName } : file
      )
    );
    setSelectedFile(newName);
  }

  
  const handleCompile = async () => {
    
    const endpoint = 'https://flask-fire-637551824687.us-central1.run.app/compile'
    const payload = { sourceCode };

    setWaitingForCompile(true);

    try {
      const response = await axios.post(endpoint, payload);
      //setCompilerOutput(response.data.res);
      console.log(response.data.ast)
      console.log(response.data.ir)
      console.log(response.data.st)
      setWaitingForCompile(false);

      setCompileOutput({ast : response.data.ast, ir : response.data.ir, st : response.data.st, cl : response.data.stderr})

    } catch (error) {
      setWaitingForCompile(false);
      setDisplayErrorModal(true);  
      console.log(error.response.data)
      //setNetworkErrMsg(error.message) 
      setNetworkErrMsg(`${error.message}: ${error.response.data.error}`)
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

      <NetworkErrorModal errorMSG={networkErrMsg} open={displayErrorModal} onClose={() => {setDisplayErrorModal(false)}}/>

      <div style={{ padding: "20px", display: 'flex', justifyContent: 'space-between' }}>


        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", width: "50%" }}>
          <FileTabsComponent fileNames={files.map(file => file.name)} 
          selectedFile={selectedFile}
           setSelectedFile={changeSelectedFile}
           onCompile={handleCompile}
           onNewFile={handleNewFile}
           onDeleteSelected={handleDeleteSelected}
           onRenameSelected={handleRenameSelected}
           displayLoading={waitingForCompile} />

          <CodeEditorComponent sourceCode={sourceCode} setSourceCode={setSourceCode}></CodeEditorComponent>

        </Box>

        <Box sx={{ width: '50%', height: "500px", overflowY: 'auto' }}>
          <ProgramOutputComponent   commandLineOutput={compileOutput.cl} IROutput={compileOutput.ir} STOutput={compileOutput.st} ASTOutput={compileOutput.ast}/>
        </Box>
      </div>
      
      
    </div>
  );
};

export default CompilerFrontend;
