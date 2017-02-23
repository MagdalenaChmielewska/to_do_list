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
    addTask({ description: 'create todo list', priority: 'high', completed: false})
    addTask({ description: 'add filtering by priority', priority: 'medium', completed: false})
    addTask({ description: 'use rest api backend', priority: 'low', completed: false})

    return {
        complete_task: function (task_id) {
            task = tasks.get(parseInt(task_id));
            task.completed = true;
            return task;
        },
        uncomplete_task : function(task_id) {
            task = tasks.get(parseInt(task_id));
            task.completed = false;
            return task;
        },
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
    todoList.add_task({'description': description, 'priority': 'low', completed: false})
    show();
    return false;
}

function remove() {
    var id = this.getAttribute('id');
    todoList.remove_task(id);
    show();
    return false;
}

var activeFilter = "all";

function changeStatus(task_id) {
    var task = todoList.get_task(task_id);

    if (task.completed == true) {
        todoList.uncomplete_task(task_id)
    } else {
        todoList.complete_task(task_id)
    }
    show(); 
}

function isTaskCompleted(task_id) {
    var task = todoList.get_task(task_id);
    return task.completed;  
}

function checkedProperty(task_id) {
    if (isTaskCompleted(task_id)) {
        return "checked=\"true\"";
    } else {
        return "";
    }
}

var showTaskList = function() {
    var html = '';
    for (var todo of todoList.all_tasks()) {
        var onclick ="onClick=\"changeStatus(" + todo.id + ")\"";
        var checked = checkedProperty(todo.id);
        html += '<div class="input-group style"><span class="input-group"><input type="checkbox" id="' + todo.id + '" ' + onclick + ' ' + checked + '><label for="checkbox">' + todo.description + 
        '</label></span><span class="input-group-btn"><button aria-label="Close" class="close remove" id="' + todo.id + '"><span aria-hidden="true">&times;</span></button></span></div>';
    }

    document.getElementById('todos').innerHTML = html;
    var buttons = document.getElementsByClassName('remove');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}

var filterTasksBy = function(filter) {
    if(activeFilter == "all") {
        allButton();
    } else if(activeFilter == "active") {
        activeButton();        
    } else {
        completedButton();
    }
}
var calculateCounter = function() {
    counter();
}
function show() {
    showTaskList();
    filterTasksBy(activeFilter);
    calculateCounter();
}

document.getElementById('add').addEventListener('click', add);
show();

// SELECT
function selectAll() {
    var inputs = $("input[type=checkbox]");
    for (var i = 0; i < inputs.length; i++ ) {
        inputs[i].checked=true;
        todoList.complete_task(inputs[i].id); 
    }
    show();
}

function deselectAll() {
    var inputs = $("input[type=checkbox]");
    for (var i = 0; i < inputs.length; i++ ) {
        inputs[i].checked=false;
        todoList.uncomplete_task(inputs[i].id);
    }
    show();
}

// COUNTER
function counter() {
    var $counter = $('#counter');
    var $inputs = $("input[type=checkbox]");
    var $inputsCh = $inputs.filter(':checked');
    var tempArray = [$inputsCh.length, $inputs.length];
    var informationText = tempArray[1]-tempArray[0];
    $counter.html(informationText);
}

// CLEAR COMPLITED
function clearButton() {
    var inputs = $("input[type=checkbox]");
    for (var i = 0; i < inputs.length; i++ ) {
        if (inputs[i].checked == true) {
            todoList.remove_task(inputs[i].id)
        }
    show();     
    }        
}

// FILTER
function allButton() {
    activeFilter = "all";
    var inputs = $("input[type=checkbox]");
    $('#all').addClass("active");
    $('#Completed').removeClass("active");
    $('#active').removeClass("active");
    return inputs.parents().show();
}

function activeButton() {
    activeFilter = "active";
    var $inputs = $("div input[type=checkbox]");
    var $inputsCh = $inputs.filter(":checked");
    var $inputsNotCh = $inputs.filter(":not(:checked)");
    var $parentInputs = $inputsCh.parent().parent();
    $('#active').addClass("active");
    $('#all').removeClass("active");
    $('#Completed').removeClass("active");
    return ($parentInputs.hide(), $inputsNotCh.parents().show());
    show();
}

function completedButton() {
    activeFilter = "completed";
    var $inputs = $("div input[type=checkbox]");
    var $inputsCh = $inputs.filter(":checked");
    var $inputsNotCh = $inputs.filter(":not(:checked)");
    var $parentInputs = $inputsNotCh.parent().parent();
    $('#Completed').addClass("active");
    $('#all').removeClass("active");
    $('#active').removeClass("active");
    return ($parentInputs.hide(), $inputsCh.parents().show());  
    show();
}