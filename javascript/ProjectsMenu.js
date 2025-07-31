// import { PageBuilder } from "./PageBuilder";
// import { Project } from "./Project";
// import { Render } from "./Render";
// import { StorageManager } from "./StorageManager";

document.addEventListener('click', function(event) {
    const linkClicado = event.target.closest('a');

    if (!linkClicado) {
        return;
    }

    if (linkClicado.host !== window.location.host || linkClicado.pathname === window.location.pathname) {
      return;
    }

    if (!linkClicado.classList.contains('project-card')){
        return;
    }
    
    event.preventDefault();

    const destinoFinal = linkClicado.href;

    console.log(`Atributo 'href': ${linkClicado.getAttribute('href')}`);
    console.log(`Propriedade 'href' resolvida: ${destinoFinal}`);

    // Faça sua operação aqui (ex: salvar no localStorage)
    StorageManager.setCurrentProject(linkClicado.id)

    // Redirecione com a certeza de que o caminho está correto.
    window.location.href = destinoFinal;
});

class FormField {
    constructor(id){
        this.id = id
        this.reference
        this.value
    }
    sync(){
        this.reference = document.querySelector(`#${this.id}`)
        this.value = this.reference.value
    }
    clear(){
        this.reference.value = ''
        this.value = ''
    }
}

const projectNameField = new FormField('project-name')
const projectAuthorField = new FormField('project-author')

function toggleModal(id){
    let modal = document.querySelector(`#${id}`)
    bootstrap.Modal.getOrCreateInstance(modal).toggle()
}

function CreateProject (name, author){
    const project = new Project(name, author, GetUUID())
    StorageManager.addProject(project)
    RenderListOfProjects()
}

function GetUUID (){
    if (window.crypto){
        return window.crypto.randomUUID()
    }
    else {
        return Math.random().toString(36)
    }
}


function SubmitCreateProject(){
    projectAuthorField.sync()
    projectNameField.sync()
    toggleModal('create-project-modal')
    if (projectAuthorField.value && projectAuthorField){
        CreateProject(projectNameField.value, projectAuthorField.value)
    } else {
        alert("Preencha todos os campos.")
    }
}

function RenderCreateProjectModal(){
    const modalArea = document.querySelector('#modal-area')

    let footer = PageBuilder.Basics.ModalDismissButton()
    // footer += PageBuilder.Button.ArchitectBtn('Criar', 'p-3', 'button', {"type":"button"})
    footer += PageBuilder.Button.LightArchitectBtn('Criar', '', 'button', {"type": "button","onclick": "SubmitCreateProject()"})


    modalArea.innerHTML = PageBuilder.Basics.ModalElement(
        'create-project-modal',
        'Criar Projeto',
        PageBuilder.Component.ProjectAddFormContainer(
            'create-project-form',
            PageBuilder.Form.TextInput('project-name', 'Nome do Projeto', 'project_name', 'Digite o nome do seu projeto...') +
            PageBuilder.Form.TextInput('project-author', 'Autor(es)', 'project_author', 'Insira os autores do projeto aqui.'),
            ),
        footer

    )
}

function RenderImportProjectModal(){
    const modalArea = document.querySelector('#modal-area')

    modalArea.innerHTML += PageBuilder.Component.LoadProjectFileModal()
}

function RenderListOfProjects(){
    const projects = StorageManager.getProjects()
    
    const projectsAreaHTML = document.querySelector('#projects-container.dynamic')

    const createProjectCard = PageBuilder.Basics.BasicElement('div', ['col-md-3', 'col-sm-6', 'col-12'], {"data-bs-toggle": "modal", "data-bs-target": "#create-project-modal"}, 
        PageBuilder.Basics.BasicElement('div', ['new-project-btn', 'project-card', 'p-4'], {},
            PageBuilder.Basics.BasicElement('span', ['project-name'], {},
                `${PageBuilder.Basics.Icon('bi-plus','medium-icon')}Criar Projeto`
            )
        )
    )

    const importProjectCard = PageBuilder.Basics.BasicElement('div', ['col-md-3', 'col-sm-6', 'col-12'], {'data-bs-toggle': 'modal', 'data-bs-target': '#load-project-file-modal'},
        PageBuilder.Basics.BasicElement('div', ['new-project-btn', 'project-card', 'p-4'], {},
            PageBuilder.Basics.BasicElement('span', ['project-name'], {},
                `${PageBuilder.Basics.Icon('bi-file-earmark-arrow-down','medium-icon')}Importar Projeto`
            )
        )
    )

    let auxHTML = ''

    auxHTML += PageBuilder.Basics.BasicElement('h1', ['text-xxl-center'], {}, 'Projetos')

    let projectsHTML = ""
    for (let project of projects){
        projectsHTML += PageBuilder.Basics.BasicElement('div', ['col-md-3', 'col-sm-6', 'col-12'], {},
            PageBuilder.Basics.BasicElement('a', ['project-card', 'p-4'], {'id':project.id, 'href': '/project.html'},
                PageBuilder.Basics.BasicElement('span', ['project-name'], {}, project.name)
            )
    )}
    projectsHTML += createProjectCard
    projectsHTML += importProjectCard

    auxHTML += PageBuilder.Basics.BasicElement('div', ['row', 'project-area', 'mt-4', 'mb-4', 'g-2'], {}, projectsHTML)
    
    projectsAreaHTML.innerHTML = auxHTML
    
    // <div class="col-md-3 col-sm-6 col-12">
    //     <a href="/project.html" class="project-card p-4">
    //         <span class="project-name">The Architect</span>
    //     </a>
    // </div>

    // <div class="col-md-3 col-sm-6 col-12">
    //     <div class="new-project-btn project-card p-4">
    //         <span class="project-name"><i class="bi bi-plus medium-icon"></i>Criar projeto</span>
    //     </div>
    // </div>

    // <div class="col-md-3 col-sm-6 col-12">
    //     <div class="new-project-btn project-card p-4">
    //         <span class="project-name"><i class="bi bi-file-earmark-arrow-down"></i>Importar projeto</span>
    //     </div>
    // </div>
}

async function loadProjectFile(){
    let projectFile = document.querySelector('#project-file')
    if (projectFile.files.length === 0) {
        alert("Por favor, selecione um arquivo de projeto para importar.")
        return;
    }
    let file = projectFile.files[0]

    if (file.type !== 'application/json') {
        alert("Por favor, selecione um arquivo JSON válido.")
        return;
    }
    let reader = new FileReader()
    console.dir(reader)
    reader.onload = function(event) {
        try {
            console.log(event.target.result)
            let projectData = JSON.parse(event.target.result)
            console.dir("Dados do projeto importado:", projectData)
            if (projectData && projectData.name && projectData.author) {
                let project = Project.rebuild(projectData)
                console.dir("Projeto reconstruído:", project)
                StorageManager.addProject(project)
                RenderListOfProjects()
                toggleModal('load-project-file-modal')
                alert("Projeto importado com sucesso!")
            } else {
                alert("O arquivo selecionado não contém dados de projeto válidos.")
            }
        } catch (error) {
            console.error("Erro ao ler o arquivo:", error)
            alert("Erro ao ler o arquivo. Por favor, verifique o formato do JSON.")
        }
    }

    reader.readAsText(file)
}



RenderListOfProjects()
RenderCreateProjectModal()
RenderImportProjectModal()