// import { PageBuilder } from './PageBuilder.js';
// import { Project } from './Project.js';
// import { Render } from './Render.js';
// import { StorageManager } from './StorageManager.js';

// Get a id to current project by storage
const project = Project.rebuild(StorageManager.getCurrentProject())

const projectName = document.querySelector('h1')
projectName.innerText = project.name

const projectNameField = document.querySelector('#nameField')
const projectAuthorField = document.querySelector('#authorField')

const artifactArea = document.querySelector('#artifacts-container.dynamic')

const modalArea = document.querySelector('#modal-area')
let editModal

let currentArtifactType = ''

// artifactGuides, submit handlers and modal handlers moved to separate files:
// - javascript/artifactGuides.js
// - javascript/submitHandlers.js
// - javascript/modalHandlers.js
// They expose globals `artifactGuides`, `submittionHandlers` and `modalHandlers` respectively.
function toggleEditor(type, id=''){
    const { name, content } = modalHandlers[type](id);
    currentArtifactType = type
    RenderEditModal(content)
    if(id){
        RenderTitleModal(`Editando ${name}`)
    } else {
        RenderTitleModal(`Criando ${name}`)
    }
}

function switchArtifactTab(tabId, type){
    // Remove classe active de todas as abas
    const allTabs = document.querySelectorAll('.artifact-tab')
    allTabs.forEach(tab => tab.classList.remove('active'))
    
    // Remove classe active de todos os conteúdos
    const allPanes = document.querySelectorAll('.tab-pane')
    allPanes.forEach(pane => pane.classList.remove('show', 'active'))
    
    // Adiciona classe active à aba clicada
    document.getElementById(`${tabId}-tab`).classList.add('active')
    
    // Adiciona classe active ao conteúdo correspondente
    document.getElementById(`${tabId}-content`).classList.add('show', 'active')
}

function renderAttributeTable(attributeType){
    // attributeType: 'quality-attribute' ou 'business-attribute'
    const attributes = attributeType === 'quality-attribute' ? project.QualityAttributes : project.BusinessAttributes
    let body = document.querySelector("#attribute-management-modal .modal-body")
    body.innerHTML = PageBuilder.Component.InfoBox(window.artifactGuides[attributeType]) + PageBuilder.Component.AttributeManagementTable(attributeType, attributes)
}

function openAttributeManagementModal(attributeType){
    const title = attributeType === 'quality-attribute' ? 'Gerenciar Atributos de Qualidade' : 'Gerenciar Atributos de Negócio'
    
    // let body = document.querySelector("#attribute-management-modal .modal-body")
    // body.innerHTML = PageBuilder.Component.AttributeManagementTable(attributeType, attributes)
    renderAttributeTable(attributeType)

    let titleElement = document.querySelector("#attribute-management-modal .modal-title")
    titleElement.innerText = title

    // Atualizar footer com formulário
    let footer = document.querySelector("#attribute-management-modal .modal-footer")
    footer.setAttribute('data-attribute-type', attributeType)
    footer.innerHTML = PageBuilder.Component.AttributeEditorForm(attributeType)
}

function editAttributeFromTable(attributeType, id){
    // Remove o atributo da tabela e coloca no editor
    const attributes = attributeType === 'quality-attribute' ? project.QualityAttributes : project.BusinessAttributes
    const name = attributes[id]
    
    // Limpar tabela
    let body = document.querySelector("#attribute-management-modal .modal-body")
    const currentAttributes = Object.keys(attributes).reduce((acc, key) => {
        if (key !== id) {
            acc[key] = attributes[key]
        }
        return acc
    }, {})
    body.innerHTML = PageBuilder.Component.AttributeManagementTable(attributeType, currentAttributes)
    
    // Preencher editor
    let footer = document.querySelector("#attribute-management-modal .modal-footer")
    const editorFormId = `new-attribute-name-${attributeType}`
    footer.setAttribute('data-attribute-type', attributeType)
    footer.setAttribute('data-editing-id', id)
    
    const label = attributeType === 'quality-attribute' ? 'Atributo de Qualidade' : 'Atributo de Negócio'
    const placeholder = attributeType === 'quality-attribute' ? 'Ex: Performance, Segurança...' : 'Ex: Custo, Tempo de Entrega...'
    
    footer.innerHTML = `
        <div class="d-flex gap-2 align-items-end w-100">
            <div class="flex-grow-1">
                <label for="${editorFormId}" class="form-label mb-2">${label} (ID: ${id})</label>
                <input type="text" class="form-control" id="${editorFormId}" 
                    name="new_attribute_name" placeholder="${placeholder}" value="${name}" required>
            </div>
            <button type="button" class="btn btn-primary" 
                onclick="submitNewAttribute('${attributeType}')">
                Salvar
            </button>
        </div>
    `
}

function submitNewAttribute(attributeType){
    const editorFormId = `new-attribute-name-${attributeType}`
    const input = document.getElementById(editorFormId)
    const name = input.value.trim()
    
    if (!name) {
        alert('Por favor, preencha o nome do atributo')
        return
    }
    
    const footer = document.querySelector("#attribute-management-modal .modal-footer")
    const editingId = footer.getAttribute('data-editing-id')
    
    if (editingId) {
        // Editando um atributo existente
        if (attributeType === 'quality-attribute') {
            project.QualityAttributes[editingId] = name
        } else {
            project.BusinessAttributes[editingId] = name
        }
        footer.removeAttribute('data-editing-id')
        notify('Atributo atualizado com sucesso!', 'success')
    } else {
        // Criando um novo atributo
        const attributes = attributeType === 'quality-attribute' ? project.QualityAttributes : project.BusinessAttributes
        const newId = Object.keys(attributes).length.toString()
        
        if (attributeType === 'quality-attribute') {
            project.QualityAttributes[newId] = name
        } else {
            project.BusinessAttributes[newId] = name
        }
        notify('Atributo criado com sucesso!', 'success')
    }
    
    // Salvar projeto
    StorageManager.saveProject(project)
    
    // Limpar input
    input.value = ''
    
    // Recarregar modal e settings
    renderAttributeTable(attributeType)
    RenderSettings()
}

function deleteAttribute(attributeType, id){
    if (confirm('Tem certeza que deseja deletar este atributo?')) {
        if (attributeType === 'quality-attribute') {
            delete project.QualityAttributes[id]
        } else {
            delete project.BusinessAttributes[id]
        }
        
        StorageManager.saveProject(project)
        notify('Atributo deletado com sucesso!', 'success')
        renderAttributeTable(attributeType)
        RenderSettings()
    }
}

function closeModal(){
    document.querySelector(".modal-content .modal-header .btn-close").click()
}

function exportJson(){
    const json = JSON.stringify(project, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const date_now = new Date().toISOString().replace('T',' ').split('.')[0]; // YYYY-MM-DD HH:mm:ss
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${`${date_now} - ${project.name}` || 'project'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
}
function exportTable(){
    alert("Funcionalidade em desenvolvimento")
}

function showToast(message, type="info"){

    // Cria o elemento do toast
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-bg-${type} border-0`;
    toast.role = 'alert';
    toast.ariaLive = 'assertive';
    toast.ariaAtomic = 'true';
    toast.innerHTML = `
        <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Fechar"></button>
        </div>
    `;

    // Adiciona ao container
    document.getElementById('toast-container').appendChild(toast);

    // Inicializa e exibe
    const bsToast = new bootstrap.Toast(toast, { delay: 4000 });
    bsToast.show();

    // Remove depois de esconder
    toast.addEventListener('hidden.bs.toast', () => toast.remove());

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

function notify(message, type="info"){
    showToast(message, type)
}

function SubmitEditArtifact(){
    const type = currentArtifactType
    submittionHandlers[type]();
    notify(`Artefato atualizado com sucesso!`, 'success');
    StorageManager.saveProject(project)
    RenderArtifacts()
    closeModal()
}

function RenderEditModal(content){
    let body = document.querySelector("#edit-modal .modal-body")
    body.innerHTML = content
}

function RenderTitleModal(title){
    let titleElement = document.querySelector("#edit-modal .modal-title")
    titleElement.innerText = title
}

function getIntensityDegrees(){
    let aux = []
    for(let degree in project.IntensityDegrees){
        aux.push(project.IntensityDegrees[degree])
    }
    return aux
}
function RenderArtifacts(){
    let processedFunctionalRequirements = processFunctionalRequirements()
    let processedStakeholders = processStakeholders()
    let processedArchitecturalScenarios = processArchitecturalScenarios()
    let processedArchitecturalRequirements = processArchitecturalRequirements()
    let processedArchitecturalDecisions = processArchitecturalDecisions()
    let processedPointsOfView = processPointOfViews()
    let processedArchitecturalViews = processArchitecturalViews()
    
    artifactArea.innerHTML = ''

    const tabs = [
        {
            id: 'functional-requirements',
            title: 'Requisitos Funcionais',
            type: 'functional-requirement',
            artifactList: processedFunctionalRequirements,
            count: processedFunctionalRequirements.length
        },
        {
            id: 'stakeholders',
            title: 'Stakeholders',
            type: 'stakeholder',
            artifactList: processedStakeholders,
            count: processedStakeholders.length
        },
        {
            id: 'architectural-scenarios',
            title: 'Cenários Arquiteturais',
            type: 'architectural-scenario',
            artifactList: processedArchitecturalScenarios,
            count: processedArchitecturalScenarios.length
        },
        {
            id: 'architectural-requirements',
            title: 'Requisitos Arquiteturais',
            type: 'architectural-requirement',
            artifactList: processedArchitecturalRequirements,
            count: processedArchitecturalRequirements.length
        },
        {
            id: 'architectural-decisions',
            title: 'Decisões Arquiteturais',
            type: 'architectural-decision',
            artifactList: processedArchitecturalDecisions,
            count: processedArchitecturalDecisions.length
        },
        {
            id: 'points-of-view',
            title: 'Pontos de Vista',
            type: 'point-of-view',
            artifactList: processedPointsOfView,
            count: processedPointsOfView.length
        },
        {
            id: 'architectural-views',
            title: 'Visões Arquiteturais',
            type: 'architectural-view',
            artifactList: processedArchitecturalViews,
            count: processedArchitecturalViews.length
        }
    ]

    artifactArea.innerHTML = PageBuilder.Component.ArtifactTabsContainer(tabs)
}

function initializeModals(){
    modalArea.innerHTML = PageBuilder.Basics.ModalElement('edit-modal', 'Editar Artefato', '', `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-primary" onclick="SubmitEditArtifact()">Salvar</button>
        `)+
        PageBuilder.Basics.ModalElement('attribute-management-modal', 'Gerenciar Atributos', '', '') +
        PageBuilder.Component.DeleteModal(project.id)
    
    // Inicializar o footer do modal de atributos após criar o modal
    setTimeout(() => {
        updateAttributeManagementModalFooter()
    }, 0)
}

function updateAttributeManagementModalFooter(){
    const footer = document.querySelector("#attribute-management-modal .modal-footer")
    if (footer) {
        const currentType = footer.getAttribute('data-attribute-type')
        if (currentType) {
            footer.innerHTML = PageBuilder.Component.AttributeEditorForm(currentType)
        }
    }
}

function RenderSettings(){
    const intensityDegreeList = document.querySelector('#graus-de-intensidade ul.settings-list')
    const qualityAttributeList = document.querySelector('#atributos-de-qualidade ul.settings-list')
    const businessAttributeList = document.querySelector('#atributos-de-negocio ul.settings-list')

    // Safety guards: ensure the lists exist in the DOM before updating
    if (!intensityDegreeList || !qualityAttributeList || !businessAttributeList) {
        console.warn('RenderSettings: one or more settings list elements not found in DOM')
        return
    }

    intensityDegreeList.innerHTML = ''
    qualityAttributeList.innerHTML = ''
    businessAttributeList.innerHTML = ''

    console.dir(`entrou no render settings, o project ta assim: ${project.IntensityDegrees}`)

    for (let iDeg in project.IntensityDegrees) {
        intensityDegreeList.innerHTML += `<li class="list-group-item">${project.IntensityDegrees[iDeg].name}</li>`
    }

    // Renderizar atributos de qualidade com contagem
    for (let qAtt in project.QualityAttributes) {
        qualityAttributeList.innerHTML += `<li class="list-group-item">${project.QualityAttributes[qAtt]}</li>`
    }

    // Renderizar atributos de negócio com contagem
    for (let qBus in project.BusinessAttributes) {
        businessAttributeList.innerHTML += `<li class="list-group-item">${project.BusinessAttributes[qBus]}</li>`
    }

    // Adicionar botões de gerenciamento com contagem atualizada
    const qualityAttributeCount = Object.keys(project.QualityAttributes).length
    const businessAttributeCount = Object.keys(project.BusinessAttributes).length

    qualityAttributeList.innerHTML += `
        <li class="list-group-item p-0 border-0">
            <button class="btn architect-btn p-4 w-100 mt-2" type="button" onclick="openAttributeManagementModal('quality-attribute')" data-bs-toggle="modal" data-bs-target="#attribute-management-modal">
                <span>Gerenciar Atributos de Qualidade (${qualityAttributeCount})</span>
            </button>
        </li>
    `

    businessAttributeList.innerHTML += `
        <li class="list-group-item p-0 border-0">
            <button class="btn architect-btn p-4 w-100 mt-2" type="button" onclick="openAttributeManagementModal('business-attribute')" data-bs-toggle="modal" data-bs-target="#attribute-management-modal">
                <span>Gerenciar Atributos de Negócio (${businessAttributeCount})</span>
            </button>
        </li>
    `
}

function deleteProject(){
    StorageManager.deleteProject(project.id)
    window.location.href = 'index.html'
}
// Artifact processors moved to `javascript/artifactProcessors.js`.
// They expose the functions used by RenderArtifacts (processFunctionalRequirements, etc.).



initializeModals()
RenderArtifacts()
RenderEditModal()
RenderSettings()
initializeProjectSettings()

// ! The editor will include an hidden field with the artifact ID, in the submittion, if the ID is present, it will update the artifact, otherwise it will create a new one