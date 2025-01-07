import React from "react";
import Ansi from 'ansi-to-react';

const CompilerTerminalComponent = ({output}) => {
    return ( 
    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px', borderRadius: '5px', fontFamily: 'monospace', height: '400px', overflowY: 'auto',whiteSpace: 'pre-wrap' }}> 
    <Ansi>{output}</Ansi>
    </div>
    );
}

export default CompilerTerminalComponent;