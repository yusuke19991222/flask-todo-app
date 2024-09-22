// ToDoリストをサーバーから取得して表示する
window.addEventListener('load', function() {
    fetch('http://127.0.0.1:5000/todos')
        .then(response => response.json())
        .then(data => {
            data.forEach(function(todoText) {
                addTodoItem(todoText);
            });
        });
});

// "追加" ボタンを押したときの動作
document.getElementById('add-btn').addEventListener('click', addTodo);

// Enterキーでタスクを追加する動作
document.getElementById('todo-input').addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {  // Enterキーが押されたとき
        addTodo();
    }
});

// タスクをリストに追加する関数
function addTodo() {
    const input = document.getElementById('todo-input');
    const todoText = input.value.trim();

    if (todoText !== "") {
        // サーバーに新しいタスクを送信する
        fetch('http://127.0.0.1:5000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo: todoText }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                addTodoItem(todoText);
                input.value = ""; // 入力フィールドをリセット
            }
        });
    }
}

// タスクをリストに追加する関数
function addTodoItem(todoText) {
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = todoText;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.addEventListener('click', function() {
        const index = Array.from(li.parentNode.children).indexOf(li);

        // サーバーに削除リクエストを送信
        fetch(`http://127.0.0.1:5000/todos/${index}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                li.remove();
            }
        });
    });

    li.appendChild(span);  // テキスト部分を追加
    li.appendChild(deleteBtn);  // 削除ボタンを追加
    document.getElementById('todo-list').appendChild(li);
}
