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
const submittionHandlers = {
    'functional-requirement': function SubmitFunctionalRequirement(){
        let form = document.querySelector('#edit-funcreq-form')
        let id = form.querySelector('#rf-id').value
        let functionalRequirement = form.querySelector('#rf-description').value
        let measureMethod = form.querySelector('#rf-measure').value
        let acceptanceCriteria = form.querySelector('#rf-acceptable').value
        let importance = form.querySelector('#rf-importance-degree').value
        let difficulty = form.querySelector('#rf-difficulty-degree').value

        if (id) {
            project.FunctionalRequirementManager.update(id, functionalRequirement, measureMethod, acceptanceCriteria, importance, difficulty)
        } else {
            project.FunctionalRequirementManager.add(functionalRequirement, measureMethod, acceptanceCriteria, importance, difficulty)
        }
    },
    'architectural-requirement': function SubmitArchitecturalRequirement(){},
    'stakeholder': function SubmitStakeholder(){},
    'architectural-scenario': function SubmitArchitecturalScenario(){},
    'architectural-decision': function SubmitArchitecturalDecision(){},
    'point-of-view': function SubmitPointOfView(){},
    'architectural-view': function SubmitArchitecturalView(){},

    'intensity-degree': function SubmitIntensityDegree(){},
    'quality-attribute': function SubmitQualityAttribute(){},
    'business-attribute': function SubmitBusinessAttribute(){},
}
const modalHandlers = {
    'functional-requirement': EditFunctionalRequirementModal,
    'architectural-requirement': EditArchitecturalRequirementModal,
    'stakeholder': EditStakeholderModal,
    'architectural-scenario': EditArchitecturalScenarioModal,
    'architectural-decision': EditArchitecturalDecisionModal,
    'point-of-view': EditPointOfViewModal,
    'architectural-view': EditArchitecturalViewModal,

    'intensity-degree': EditIntensityDegree,
    'quality-attribute': EditQualityAttribute,
    'business-attribute': EditBusinessAttribute,
}

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

function notify(message){
    alert(message)
}

function SubmitEditArtifact(){
    const type = currentArtifactType
    submittionHandlers[type]();
    notify(`${type} atualizado com sucesso!`);
    StorageManager.saveProject(project)
    RenderArtifacts()
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

function EditFunctionalRequirementModal(id){
    currentArtifactType = 'functional-requirement'

    // Loading current values
    id = id || ''
    let currentArtifact = project.FunctionalRequirementManager.get(id) || {
        functionalRequirement: '',
        measureMethod: '',
        acceptanceCriteria: '',
        importance: '',
        difficulty: ''
    }

    console.dir(currentArtifact)

    let intensityDegrees = getIntensityDegrees()
    let content = PageBuilder.Component.ArtifactEditFormContainer('edit-funcreq-form', 
        PageBuilder.Form.TextInput('rf-id', 'ID do Requisito Funcional', 'rf_id', 'Criando um novo...', id, {"readonly": true}) +
        PageBuilder.Form.TextInput('rf-description', 'Descrição do Requisito Funcional', 'rf_description', 'O sistema deve...', currentArtifact.functionalRequirement, {"required": true}) +
        PageBuilder.Form.TextInput('rf-measure', 'Forma de Medição', 'rf_measure', 'medindo...', currentArtifact.measureMethod, {"required": true}) +
        PageBuilder.Form.TextInput('rf-acceptable', 'Critério de aceitação', 'rf_acceptable', 'métrica deve estar acima de...', currentArtifact.acceptanceCriteria, {"required": true}) +
        PageBuilder.Form.Select('rf-importance-degree', 'Importância', 'rf_importance_degree', intensityDegrees, 'alto, médio...', {"required": true}, currentArtifact.importance) +
        PageBuilder.Form.Select('rf-difficulty-degree', 'Dificuldade de obtenção', 'rf_difficulty_degree', intensityDegrees, 'alto, médio...', {"required": true}, currentArtifact.difficulty) 
    )
    

    return {name: "Requisito Funcional", content}
}
function EditArchitecturalRequirementModal(id){}
function EditStakeholderModal(id){}
function EditArchitecturalScenarioModal(id){}
function EditArchitecturalDecisionModal(id){}
function EditPointOfViewModal(id){}
function EditArchitecturalViewModal(id){}
function EditIntensityDegree(id){}
function EditQualityAttribute(id){}
function EditBusinessAttribute(id){}

function RenderArtifacts(){
    let functionalRequirements = project.FunctionalRequirementManager.getAll()
    let processedFunctionalRequirements = []
    for (artifact of functionalRequirements){
        processedFunctionalRequirements.push(PageBuilder.Component.FunctionalRequirement(
            artifact.id,
            artifact.functionalRequirement,
            artifact.measureMethod,
            artifact.acceptanceCriteria,
            artifact.importance,
            artifact.difficulty
        ))
    }

    artifactArea.innerHTML = ''

    artifactArea.innerHTML += PageBuilder.Component.ArtifactGroup('functional-requirements', 'Requisitos Funcionais', [
        PageBuilder.Component.FunctionalRequirement('RF1', 'o sistema deve funcionar', 'medindo', 'tem que ta aceitavel', project.IntensityDegrees[3].name, project.IntensityDegrees[2].name),
        ...processedFunctionalRequirements
    ], 'functional-requirement')

}

function initializeEditModal(){
    modalArea.innerHTML = PageBuilder.Basics.ModalElement('edit-modal', 'Editar Artefato', '', `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-primary" onclick="SubmitEditArtifact()">Salvar</button>
        `)
}

function RenderSettings(){
    let intensityDegreeList = document.querySelector('#graus-de-intensidade ul.settings-list')
    let qualityAttributeList = document.querySelector('#atributos-de-qualidade ul.settings-list')
    let businessAttributeList = document.querySelector('#atributos-de-negocio ul.settings-list')

    intensityDegreeList.innerHTML = ''
    qualityAttributeList.innerHTML = ''
    businessAttributeList.innerHTML = ''

    console.dir(`entrou no rendersettings, o project ta assim: ${project.IntensityDegrees}`)

    for(let iDeg in project.IntensityDegrees){
        console.log(iDeg)
        intensityDegreeList.innerHTML += `<li class="list-group-item">${project.IntensityDegrees[iDeg].name}</li>`
    }
    for(let qAtt in project.QualityAttributes){
        console.log(qAtt)
        qualityAttributeList.innerHTML += `<li class="list-group-item">${project.QualityAttributes[qAtt]}</li>`
    }
    for(let qBus in project.BusinessAttributes){
        console.log(qBus)
        businessAttributeList.innerHTML += `<li class="list-group-item">${project.BusinessAttributes[qBus]}</li>`
    }

    
}

initializeEditModal()
RenderArtifacts()
RenderEditModal()
RenderSettings()
initializeProjectSettings()

// ! The editor will include an hidden field with the artifact ID, in the submittion, if the ID is present, it will update the artifact, otherwise it will create a new one