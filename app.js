//selector
 const todoInput = document.querySelector('.todos-input')
 const todoButton = document.querySelector('.todos-button')
 const todoList = document.querySelector('.todos-list')
 const filterTodo = document.querySelector('.filter-todos')
//event listener
 document.addEventListener('DOMContentLoaded', getLocalTodo)
 todoButton.addEventListener('click', addTodo);
 todoList.addEventListener('click', deleteCheck);
 filterTodo.addEventListener('click', todoFilter)
 

//function

function addTodo(event){
    event.preventDefault();
    //create Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todos');
 
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item')
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    saveTodoInfo(todoInput.value);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class= "fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv)
    todoInput.value = "";
}

function deleteCheck(event){
    const item = event.target;

    if (item.classList.contains('trash-btn')) {
        const todo = item.parentElement;
        deleteLoccalStorage(todo);
        todo.classList.add('fall');
        
        todo.addEventListener('transitioned', function(){
            todo.remove();
        })
    }

    if(item.classList.contains('completed-btn')){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function todoFilter(e){
    const todos = todoList.childNodes;
    
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'; 
                }else{
                    todo.style.display = 'none';
                }
        }
    }) 
}

// saveTodo to Local Storage

 function saveTodoInfo(todo){
     let todos;
     if(localStorage.getItem('todos') === null){
         todos = [];
     }else{
         todos = JSON.parse(localStorage.getItem('todos'));
     }
     todos.push(todo);

     localStorage.setItem('todos', JSON.stringify(todos));
 }

 function getLocalTodo(){
     console.log("hello");
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(element => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todos');
     
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item')
        newTodo.innerText = element;
        todoDiv.appendChild(newTodo);
    
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class= "fas fa-check"></i>';
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);
    
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
    
        todoList.appendChild(todoDiv)
    });
 }

 function deleteLoccalStorage(event){
     let todos;

     if(localStorage.getItem('todos') === null){
        todos = [];
     } else{
         todos = JSON.parse(localStorage.getItem('todos'))

         let todoIndex = event.children[0].innerText;
         todos.splice(todos.indexOf(todoIndex), 1);
     }

     localStorage.setItem('todos', JSON.stringify(todos));
 }