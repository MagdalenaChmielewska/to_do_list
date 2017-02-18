function TodoList() {
    // documentation of Map https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    var tasks = new Map();
    var current_id = 0;

    var addTask = function (task) {
        task.id = current_id
        tasks.set(current_id, task);
        current_id += 1;
        return task;
    }

    // JSON object
    addTask({ description: 'create todo list', priority: 'high'})
    addTask({ description: 'add filtering by priority', priority: 'medium'})
    addTask({ description: 'use rest api backend', priority: 'low'})

    return {
        get_task: function (task_id) {
            return tasks.get(task_id);
        },
        add_task: function (task) {
            return addTask(task);
        },
        remove_task: function (task_id) {
            return tasks.delete(parseInt(task_id));
        },
        all_tasks: function () {
            return tasks.values();
        },
        print_all: function () {
            // for (var i = 0 ; i < tasks.length ; i++)
            // {
            //     console.log(tasks[i])
            // }

            for (var v of tasks) {
                console.log(v);
            }
        }
    }
}
var todoList = new TodoList();

function add() {
    var description = document.getElementById('task').value;
    todoList.add_task({'description': description, 'priority': 'low' })
    show();
    return false;
}

function remove() {
    var id = this.getAttribute('id');
    todoList.remove_task(id);
    show();
    return false;
}

function show() {
    var html = '<ul>';
    for (var todo of todoList.all_tasks()) {
        html += '<li><div class="input-group"><span class="input-group"><input type="checkbox" id="checkbox"><label for="checkbox">' + todo.description + 
        '</label></span><span class="input-group-btn"><button aria-label="Close" class="close remove" id="' + todo.id + '"><span aria-hidden="true">&times;</span></button></span></div></li><hr>';
    }
    html += '</ul>';
    document.getElementById('todos').innerHTML = html;
    var buttons = document.getElementsByClassName('remove');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}

document.getElementById('add').addEventListener('click', add);
show();