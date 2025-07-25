// import { PageBuilder } from "./PageBuilder";
// import { Project } from "./Project";
// import { Render } from "./Render";
// import { StorageManager } from "./StorageManager";

function CreateProject (name, author){
    const project = new Project(name, author, GetUUID())
    StorageManager.addProject(project)
}

function GetUUID (){
    if (window.crypto){
        return window.crypto.randomUUID()
    }
    else {
        return Math.random().toString(36)
    }
}

function RenderCreateProjectModal(){
    const modalArea = document.querySelector('#modal-area')

    let footer = PageBuilder.Basics.ModalDismissButton()
    footer += PageBuilder.Button.ArchitectBtn('Criar')


    modalArea.innerHTML = PageBuilder.Basics.ModalElement(
        'create-project-modal',
        'Criar Projeto',
        PageBuilder.Component.ProjectAddFormContainer(
            'create-project-form',
            PageBuilder.Form.TextInput('project-name', 'Nome do Projeto', 'project_name', 'Digite o nome do seu projeto...'),
            ),
        footer


)
}

function RenderImportProjectModal(){}

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

    const importProjectCard = PageBuilder.Basics.BasicElement('div', ['col-md-3', 'col-sm-6', 'col-12'], {},
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
            PageBuilder.Basics.BasicElement('a', ['project-card', 'p-4'], {'href': `/project.html?id=${project.id}`},
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



RenderListOfProjects()
RenderCreateProjectModal()
RenderImportProjectModal()