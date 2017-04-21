# Todo list project

## Description

This project is demonstration of usage of technologies like: HTML5, CSS3, SASS, Javascript, jQuery and REST API.  

Todo list is available in two versions. In both options are the same.
1. Without backend integration (REST API)  
    On init 3 tasks are added automatically. You can add, edit and remove tasks. But after the page refresh todo list goes back to the original version.
2. With backend integration (REST API)   
    This version has integration with existing REST API [Heroku](https://todo-backend-sinatra.herokuapp.com/todos). You can add, edit and remove tasks. All your tasks will be saved on server.

In order to edit a task you have to double-click. 

## How convert sass to css

In order to convert scss files into css files you need to have sass installed.  
Please install it by following steps from [sass documentation](http://sass-lang.com/install).  

After that use this command:
1. For version with backend:
```bash
sass --watch with_backend\sass\todo.scss:with_backend\css\todo.css
```
2. For version without backend:
```bash
sass --watch without_backend\sass\todo.scss:without_backend\css\todo.css
```

## Screens
 
![Img](https://github.com/MagdalenaChmielewska/todo_list/blob/master/showcase/todo_list.png)
