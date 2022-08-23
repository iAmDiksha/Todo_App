let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let msg = document.getElementById('msg');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let tasks = document.querySelector('.tasks');
let add = document.getElementById('add');
let modalTitle = document.getElementById('staticBackdropLabel');
let modalBody = document.getElementById('modalBody');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    formValidation();
})

let formValidation = ()=>{
    if(textInput.value === ""){
        console.log('failure')
        msg.innerHTML = "Task cannot be blank";
    }
    else{
        console.log('success')
        msg.innerHTML = "";
        acceptData();
        add.setAttribute('data-bs-dismiss', 'modal');
        add.click();

        add.setAttribute('data-bs-dismiss', '');
    }
}

let data = [];

let acceptData = ()=>{
    data.push({
        text : textInput.value,
        date : dateInput.value,
        description : textarea.value
    });

    console.log(data);
    
    localStorage.setItem('data',JSON.stringify(data));
    
    createTasks();
}

let createTasks = ()=>{
    tasks.innerHTML = "";
    data.map((x,y)=>{
        return (  
        tasks.innerHTML +=        
        `<div id=${y}>
        <span class="title">${x.text}</span>
        <span class="date">${x.date}</span>
        <p>${x.description}</p>
        <span class="options">
            <i onclick="viewTask(this)" class="fas fa-eye" data-bs-toggle="modal" data-bs-target="#view"></i>
            <i onclick="editTask(this)" class="fas fa-edit" data-bs-toggle="modal" data-bs-target="#form"></i>
            <i onclick="deleteTask(this); createTasks()" class="fas fa-trash-alt"></i>
        </span>
        </div>
        `);
    });

    resetForm();
}

let deleteTask = (e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem('data',JSON.stringify(data));
}

let editTask = (e)=>{
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    
    deleteTask(e);
}

let viewTask = (e)=>{
    let selectedTask = e.parentElement.parentElement;
    console.log(selectedTask);
    console.log(modalTitle);
    modalTitle.innerHTML = selectedTask.children[0].innerHTML;

    modalBody.innerHTML = `<p>${selectedTask.children[1].innerHTML}</p>
    <h4>${selectedTask.children[2].innerHTML}</h4>
    `;
}

let resetForm = ()=>{
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
}

(()=>{
    data = JSON.parse(localStorage.getItem('data')) || [];
    createTasks();
    console.log(data)
})();