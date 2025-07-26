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

const artifactArea = document.querySelector('#artifacts-container.dynamic')

const modalArea = document.querySelector('#modal-area')
let editModal

function exportJson(){
    alert("Funcionalidade em desenvolvimento")
}
function exportTable(){
    alert("Funcionalidade em desenvolvimento")
}

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

function SubmitEditArtifact(){
    alert("Funcionalidade em desenvolvimento")
}

function initializeEditModal(){
    let footer = PageBuilder.Basics.ModalDismissButton()
    // footer += PageBuilder.Button.ArchitectBtn('Criar', 'p-3', 'button', {"type":"button"})
    footer += PageBuilder.Button.LightArchitectBtn('Salvar', '', 'button', {"type": "button","onclick": "SubmitEditArtifact()"})

    modalArea.innerHTML = PageBuilder.Basics.ModalElement(
        'edit-artifact-modal',
        'Editar artefato',
        PageBuilder.Component.ProjectAddFormContainer(
            'edit-artifact-form',
            PageBuilder.Form.TextInput('project-name', 'Nome do Projeto', 'project_name', 'Digite o nome do seu projeto...') +
            PageBuilder.Form.TextInput('project-author', 'Autor(es)', 'project_author', 'Insira os autores do projeto aqui.'),
            ),
        footer
    )
}

function RenderEditModal(content){
    let body = document.querySelector("#edit-modal .modal-body")
    body.innerHTML = content
}

function EditFunctionalRequirementModal(){
    let content = PageBuilder.Component.ArtifactEditFormContainer('edit-funcreq-form', 'salve guys')
    RenderEditModal(content)
    console.log(content)
}

function RenderArtifacts(){
    artifactArea.innerHTML += PageBuilder.Component.ArtifactGroup('functional-requirements', 'Requisitos Funcionais', [
        PageBuilder.Component.FunctionalRequirement('RF1', 'o sistema deve funcionar', 'medindo', 'tem que ta aceitavel', project.IntensityDegrees[3].name, project.IntensityDegrees[2].name)
    ],
)
}

function initializeEditModal(){
    modalArea.innerHTML = PageBuilder.Basics.ModalElement('edit-modal', 'Editar Artefato', '')
}

initializeEditModal()
RenderArtifacts()
RenderEditModal()
initializeProjectSettings()