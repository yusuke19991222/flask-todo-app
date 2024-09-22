from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# フロントエンドのHTMLを表示するためのルート
@app.route('/')
def index():
    return render_template('index.html')

# 他のAPIエンドポイントはそのままでOK
todos = []

@app.route('/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@app.route('/todos', methods=['POST'])
def add_todo():
    todo = request.json.get('todo')
    if todo:
        todos.append(todo)
        return jsonify({'message': 'Todo added successfully'}), 201
    return jsonify({'error': 'Todo content is required'}), 400

@app.route('/todos/<int:index>', methods=['DELETE'])
def delete_todo(index):
    try:
        todos.pop(index)
        return jsonify({'message': 'Todo deleted successfully'}), 200
    except IndexError:
        return jsonify({'error': 'Invalid index'}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
