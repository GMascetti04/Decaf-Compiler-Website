from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json
import os
import uuid
import shutil
import glob

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Hello World!", 200


@app.route('/compile', methods=['POST'])
def compile():
    try:
        data = request.get_json()
        source_code = data.get("sourceCode")
        
        if not source_code:
            return jsonify({"error" : "no source code"}),400
        
        folder_name : str = str(uuid.uuid4())
        
        os.makedirs(folder_name, exist_ok=True)
        
        os.makedirs(os.path.join(folder_name,'build'), exist_ok=True)
        
        with open(os.path.join(folder_name, 'inFile.decaf'), 'w') as inFile:
            inFile.write(source_code)
        
        
        command = ['python3', './lib/decaf-compiler/compiler/decaf_compiler.py', '--infile', os.path.join(folder_name, 'inFile.decaf'),'--outdir', os.path.join(folder_name) , '--save-builds']
        result = subprocess.run(command, capture_output=True, text=True, input='')
                    
        ASTdata = None
        TACdata = None
        STdata = None
        
        if result.returncode == 0:
            
            with open(os.path.join(folder_name, 'build','ast.json'), 'r') as file:
                ASTdata = json.load(file)
                
            with open(os.path.join(folder_name, 'build', 'A3.tac'), 'r') as file:
                TACdata = file.read()
                
            with open(os.path.join(folder_name, 'build', 'st.json')) as file:
                STdata = json.load(file)
                    
        
        shutil.rmtree(folder_name)
        
        return jsonify({'stdout' : result.stdout, 'returncode' : result.returncode, 'stderr' : result.stderr, 'ast' : ASTdata, 'ir' : TACdata, 'st' : STdata}), 200
    
    except Exception as e:
        
        app.logger.error(str(e))
        return jsonify({'error' : str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))