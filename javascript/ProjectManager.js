// import { PageBuilder } from './PageBuilder.js';
// import { Project } from './Project.js';
// import { Render } from './Render.js';
// import { StorageManager } from './StorageManager.js';

// Get a id to current project by storage
const project = StorageManager.getCurrentProject()

const projectName = document.querySelector('h1')
projectName.innerText = project.name

// const settingsArea = document.querySelector('#')

const projectNameField = document.querySelector('#nameField')
const projectAuthorField = document.querySelector('#authorField')

function updateName(){
    let newName = document.querySelector('#project-name').value
    projectName.innerText = newName
    project.name = newName
    StorageManager.saveProject(project)
}
function updateAuthor(){
    let newAuthor = document.querySelector('#project-author').value
    project.author = newAuthor
    StorageManager.saveProject(project)
}

function initializeProjectSettings(){
    
    let nameValue = ''
    let authorValue = ''
    
    if (project.name){
        nameValue = project.name
    }
    if (project.author){
        authorValue = project.author
    }
    
    let nameFieldHTML = ''
    nameFieldHTML += PageBuilder.Form.TextInput('project-name', 'Nome do Projeto', 'project_name', 'Projeto sem nome', nameValue, {"onchange": "updateName()"})
    projectNameField.innerHTML = nameFieldHTML
    
    let authorFieldHTML = ''
    authorFieldHTML += PageBuilder.Form.TextInput('project-author', 'Autoria', 'project-author', 'Não identificado', authorValue, {"onchange": "updateAuthor()"})
    projectAuthorField.innerHTML = authorFieldHTML

}

initializeProjectSettings()