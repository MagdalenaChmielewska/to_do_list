var backend_uri = "https://todo-backend-sinatra.herokuapp.com/todos";

function TodoList() {

    return {
        complete_task: function (task_uid, onFinish) {
            var url = backend_uri + "/" + task_uid;
            $.ajax({
                url: url,
                type: 'PATCH',
                data: JSON.stringify({"completed": true})
            })
            .done(function() {
                onFinish();
            })
            return true;
        },
        uncomplete_task: function(task_uid, onFinish) {
            var url = backend_uri + "/" + task_uid;
            $.ajax({
                url: url,
                type: 'PATCH',
                data: JSON.stringify({"completed": false})
            })
            .done(function() {
                onFinish();
            })
            return true;
        },
        edit_task: function(task_uid, changed_title, onFinish) {
            var url = backend_uri + "/" + task_uid;
            $.ajax({
                url: url,
                type: 'PATCH',
                data: JSON.stringify({"title": changed_title})
            })
            .done(function() {
                onFinish();
            })
            return true;
        },
        add_task: function (task, onFinish) {
            var parsed_task = JSON.stringify(task)
            $.post(backend_uri, parsed_task)
             .done(function() {
                 onFinish();
             })
            return true;
        },
        remove_task: function (task_uid, onFinish) {
            var url = backend_uri + "/" + task_uid;
            $.ajax({
                url: url,
                type: 'DELETE'
            })
            .done(function() {
                onFinish();
            })
            return true;
        },
        all_tasks: function () {
            var response = $.ajax({
                url: backend_uri,
                async: false,
                type: 'GET'
            })
            var parsed_response = JSON.parse(response.responseText)
            var sorted_response = parsed_response.sort(function(a, b) { 
                return a.order < b.order; 
            })
            return sorted_response;
        }
    }
}

var todoList = new TodoList();

function add() {
    var title = document.getElementById('task').value;
    todoList.add_task({'title': title}, showTaskList);
    return false;
}

$("#checkEnterPressed").submit(function(e) {
    e.preventDefault();
});

function changeLabel() {
    var id = this.getAttribute('id');

    $('label[id="' + id + '"]').hide();
    $('.edit-input[id="' + id + '"]').show().focus();
    return false;
}

function labelChanged() {
    var id = this.getAttribute('id'),
        changed_title = $('.edit-input[id="' + id + '"]').val();

    todoList.edit_task(id, changed_title, showTaskList);
    return false;
}

function changeStatus(event) {
    var todo = event.data.todo;
    
    if (todo.completed == true) {
        todoList.uncomplete_task(todo.uid, showTaskList)
    } else {
        todoList.complete_task(todo.uid, showTaskList)
    }
}

function isTaskCompleted(todo) {
    return todo.completed == true;  
}

function remove() {
    var id = this.getAttribute('id');

    todoList.remove_task(id, showTaskList);
    return false;
}

var taskList = function() {
    document.getElementById('todos').innerHTML = '';

    for (var todo of todoList.all_tasks()) {
    console.log(todo.uid + " " + todo.completed);

        var div =  $("<div>").attr({
            'class': "input-group style"
        });

        var span =  $("<span>").attr({
            'class': "input-group"
        }).appendTo(div);

        var input = $("<input>").attr({
            'type': "checkbox",
            'id': todo.uid
        })
        .prop('checked', todo.completed)
        .click({todo: todo}, changeStatus)
        .appendTo(span);

        var label = $("<label>").attr({
            'for': "checkbox",
            'id': todo.uid,
            'class': "edit"
        })
        .text(todo.title)
        .appendTo(span);
       
       var editInput = $("<input>").attr({
            'class': "edit-input",
            'id': todo.uid
        }).appendTo(span);

        var spanButton =  $("<span>").attr({
            'class': "input-group-btn"
        }).appendTo(div);

        var button = $("<button>").attr({
            'aria-label': "Close",
            'class': "close remove",
            'id': todo.uid
        }).appendTo(spanButton);

        var spanHidden = $("<span>").attr({
            'aria-hidden': "true"
        }).text('X').appendTo(button);

        div.appendTo(todos);
    }

    var buttons = document.getElementsByClassName('remove'),
        edit = document.getElementsByClassName('edit'),
        edit_inputs = document.getElementsByClassName('edit-input');

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
  
    for (var i = 0; i < edit.length; i++) {
        edit[i].addEventListener('dblclick', changeLabel);
    };

    for (var i = 0; i < edit_inputs.length; i++) {
        edit_inputs[i].addEventListener('focusout', labelChanged);
    };
}   

// CALCULATE COUNTER
function calculateCounter() {
    var $counter = $('#counter'),
        $inputs = $("input[type=checkbox]"),
        $inputsCh = $inputs.filter(':checked'),
        tempArray = [$inputsCh.length, $inputs.length],
        informationText = tempArray[1]-tempArray[0];
    $counter.html(informationText);
}

// FILTERS
var activeFilter = "all";

function allButton() {
    activeFilter = "all";
    var inputs = $("input[type=checkbox]");
    $('#allFilter').addClass("active");
    $('#completedFilter').removeClass("active");
    $('#activeFilter').removeClass("active");
    return inputs.parents().show();
}

function activeButton() {
    activeFilter = "active";
    var $inputs = $("div input[type=checkbox]"),
        $inputsCh = $inputs.filter(":checked"),
        $inputsNotCh = $inputs.filter(":not(:checked)"),
        $parentInputs = $inputsCh.parent().parent();
    $('#activeFilter').addClass("active");
    $('#allFilter').removeClass("active");
    $('#completedFilter').removeClass("active");
    return ($parentInputs.hide(), $inputsNotCh.parents().show());
    showTaskList();
}

function completedButton() {
    activeFilter = "completed";
    var $inputs = $("div input[type=checkbox]"),
        $inputsCh = $inputs.filter(":checked"),
        $inputsNotCh = $inputs.filter(":not(:checked)"),
        $parentInputs = $inputsNotCh.parent().parent();
    $('#completedFilter').addClass("active");
    $('#allFilter').removeClass("active");
    $('#activeFilter').removeClass("active");
    return ($parentInputs.hide(), $inputsCh.parents().show());  
    showTaskList();
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

function showTaskList() {
    taskList();
    filterTasksBy(activeFilter);
    calculateCounter();
}

document.getElementById('add').addEventListener('click', add);
showTaskList();

// SELECT BUTTONS
function selectAll() {
    var inputs = $("input[type=checkbox]");

    for (var i = 0; i < inputs.length; i++ ) {
        inputs[i].checked=true;
        todoList.complete_task(inputs[i].id, showTaskList); 
    }
}

function deselectAll() {
    var inputs = $("input[type=checkbox]");

    for (var i = 0; i < inputs.length; i++ ) {
        inputs[i].checked=false;
        todoList.uncomplete_task(inputs[i].id, showTaskList);
    }
}

// CLEAR COMPLITED
function clearButton() {
    var inputs = $("input[type=checkbox]");

    for (var i = 0; i < inputs.length; i++ ) {
        if (inputs[i].checked == true) {
            todoList.remove_task(inputs[i].id, showTaskList)
        }
    }        
}