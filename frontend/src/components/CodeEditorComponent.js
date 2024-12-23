import React from "react";
import MonacoEditor from "@monaco-editor/react";

const keywords = ['class', 'public', 'int', 'static', 'void']

const CodeEditorComponent = ({sourceCode, setSourceCode}) => {

    const handleEditorWillMount = (monaco) => {
        monaco.languages.register({ id: "decaf" });
    
        monaco.languages.setMonarchTokensProvider("decaf", {
            keywords: keywords,
            operators: ["+", "-", "*", "/", "%", "&&", "||", "!", "=", "==", "!="],
    
            tokenizer: {
                root: [
                    
                    [new RegExp(`\\b(${keywords.join("|")})\\b`), "keyword"],
                    
                    [/[\+\-\*\/%&|=!<>]+/, "operator"],
                   
                    [/\b\d+\b/, "number"],
                   
                    [/".*?"/, "string"],
                    
                    [/\b[a-zA-Z_][a-zA-Z0-9_]*\b/, "identifier"],
                ],
            },
        });
    
        monaco.languages.setLanguageConfiguration("decaf", {
            comments: {
                lineComment: "//",
                blockComment: ["/*", "*/"],
            },
            brackets: [
                ["{", "}"],
                ["[", "]"],
                ["(", ")"],
            ],
            autoClosingPairs: [
                { open: "{", close: "}" },
                { open: "[", close: "]" },
                { open: "(", close: ")" },
                { open: '"', close: '"' },
            ],
        });
    };

    return (

        <MonacoEditor
            height="500px"
            width="100%"
            value={sourceCode}
            language="decaf"
            beforeMount={handleEditorWillMount}
            onChange={(value) => setSourceCode(value || "")}
            theme="vs-dark"
        />
    );
};

export default CodeEditorComponent;
