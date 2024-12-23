from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json
import os

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
        
        process = subprocess.Popen(
            ['python', './lib/decaf-compiler/compiler/decaf_compiler.py'],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True)
        
        
        
        output, error = process.communicate(input=source_code)
        
        app.logger.error(output)
        
        return jsonify({'output' : output, 'returncode' : process.returncode, 'res' : error}), 200
    
    except Exception as e:
        return jsonify({'error' : str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))