# Todo list project

## Description

This project is demonstration of usage of technologies like: HTML5, CSS3, SASS, RWD, Javascript, jQuery, REST API and REACT.  

Todo list is available in three versions. In each options are the same.
1. Without backend integration (REST API)  
    On init 3 tasks are added automatically. You can add, edit and remove tasks. But after the page refresh todo list goes back to the original version.
2. With backend integration (REST API)   
    This version has integration with existing REST API [Heroku](https://todo-backend-sinatra.herokuapp.com/todos). You can add, edit and remove tasks. All your tasks will be saved on server.  
3. React version [In-progress]  
    This version is just like "with backend integration" but written in React. 

In order to edit a task you have to double-click or touch the screen and swipe your finger a little (on mobile devices).

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
  
## How to run React version  
Go to directory with TODO list written in React
```
cd react_version
```

If you are running this app for the first time please run:
```bash
npm init
```
If you want to run React version please use following command:  
```bash
npm start
```

## Screens  
 
![Img](https://github.com/MagdalenaChmielewska/todo_list/blob/master/showcase/todo_list_screen.png)
![Img](https://github.com/MagdalenaChmielewska/todo_list/blob/master/showcase/todo_list_mobile.png)