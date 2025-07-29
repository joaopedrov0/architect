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
    'architectural-requirement': function SubmitArchitecturalRequirement(){
        let form = document.querySelector('#edit-architectural-requirement-form')
        let id = form.querySelector('#ar-id').value
        let architecturalRequirement = form.querySelector('#ar-description').value
        let measureMethod = form.querySelector('#ar-measure').value
        let acceptanceCriteria = form.querySelector('#ar-acceptable').value
        let importance = form.querySelector('#ar-importance-degree').value
        let difficulty = form.querySelector('#ar-difficulty-degree').value
        let qualityAttributes = form.querySelectorAll('input[name="ar_quality_attributes"]:checked')
        let businessAttributes = form.querySelectorAll('input[name="ar_business_attributes"]:checked')
        let architecturalScenarios = form.querySelectorAll('input[name="ar_architectural_scenarios"]:checked')

        let qualityAttributesIds = Array.from(qualityAttributes).map(el => el.value)
        let businessAttributesIds = Array.from(businessAttributes).map(el => el.value)
        let architecturalScenariosIds = Array.from(architecturalScenarios).map(el => el.value)

        if (id) {
            project.ArchitecturalRequirementManager.update(id, architecturalRequirement, measureMethod, acceptanceCriteria, importance, difficulty, qualityAttributesIds, businessAttributesIds, architecturalScenariosIds)
        } else {
            project.ArchitecturalRequirementManager.add(architecturalRequirement, measureMethod, acceptanceCriteria, importance, difficulty, qualityAttributesIds, businessAttributesIds, architecturalScenariosIds)
        }
    },
    'stakeholder': function SubmitStakeholder(){
        let form = document.querySelector('#edit-stakeholder-form')
        let id = form.querySelector('#stakeholder-id').value
        let name = form.querySelector('#stakeholder-name').value
        let interest = form.querySelector('#stakeholder-interest').value

        if (id) {
            project.StakeholderManager.update(id, name, interest)
        } else {
            project.StakeholderManager.add(name, interest)
        }
    },
    'architectural-scenario': function SubmitArchitecturalScenario(){
        let form = document.querySelector('#edit-architectural-scenario-form')
        let id = form.querySelector('#architectural-scenario-id').value
        let description = form.querySelector('#architectural-scenario-description').value
        let importance = form.querySelector('#architectural-scenario-importance').value
        let qualityAttributes = form.querySelectorAll('input[name="architectural_scenario_quality_attributes"]:checked')
        let businessAttributes = form.querySelectorAll('input[name="architectural_scenario_business_attributes"]:checked')

        console.dir(`qualityAttributes: ${qualityAttributes}`)
        console.dir(`businessAttributes: ${businessAttributes}`)

        let qualityAttributesIds = Array.from(qualityAttributes).map(el => el.value)
        let businessAttributesIds = Array.from(businessAttributes).map(el => el.value)

        console.log(`qualityAttributesIds: ${qualityAttributesIds}`)
        console.log(`businessAttributesIds: ${businessAttributesIds}`)

        if (id) {
            project.ArchitecturalScenarioManager.update(id, description, importance, qualityAttributesIds, businessAttributesIds)
        } else {
            project.ArchitecturalScenarioManager.add(description, importance, qualityAttributesIds, businessAttributesIds)
        }
    },
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

    'intensity-degree': EditIntensityDegreeModal,
    'quality-attribute': EditQualityAttributeModal,
    'business-attribute': EditBusinessAttributeModal,
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
function EditArchitecturalRequirementModal(id){
    currentArtifactType = 'architectural-requirement'

    // Loading current values
    id = id || ''
    let currentArtifact = project.ArchitecturalRequirementManager.get(id) || {
        architecturalRequirement: '',
        measureMethod: '',
        acceptanceCriteria: '',
        importance: '',
        difficulty: '',
        qualityAttributes: [],
        businessAttributes: [],
        architecturalScenarios: []
    }

    let qualityAttributes = []
    for (let qAtt in project.QualityAttributes){
        qualityAttributes.push({id: qAtt, value: qAtt, text: project.QualityAttributes[qAtt]})
    }
    let businessAttributes = []
    for (let bAtt in project.BusinessAttributes){
        businessAttributes.push({id: bAtt, value: bAtt, text: project.BusinessAttributes[bAtt]})
    }

    let architecturalScenarios = []
    for (let as in project.ArchitecturalScenarioManager.collection){
        const { id, description } = project.ArchitecturalScenarioManager.collection[as]
        architecturalScenarios.push({id, value: id, text: description})
    }

    let intensityDegrees = getIntensityDegrees()
    let content = PageBuilder.Component.ArtifactEditFormContainer('edit-architectural-requirement-form',
        PageBuilder.Form.TextInput('ar-id', 'ID do Requisito Arquitetural', 'ar_id', 'Criando um novo...', id, {"readonly": true}) +
        PageBuilder.Form.TextInput('ar-description', 'Descrição do Requisito Arquitetural', 'ar_description', 'O sistema deve...', currentArtifact.architecturalRequirement, {"required": true}) +
        PageBuilder.Form.TextInput('ar-measure', 'Forma de Medição', 'ar_measure', 'medindo...', currentArtifact.measureMethod, {"required": true}) +
        PageBuilder.Form.TextInput('ar-acceptable', 'Critério de aceitação', 'ar_acceptable', 'métrica deve estar acima de...', currentArtifact.acceptanceCriteria, {"required": true}) +
        PageBuilder.Form.Select('ar-importance-degree', 'Importância', 'ar_importance_degree', intensityDegrees, 'alto, médio...', {"required": true}, currentArtifact.importance) +
        PageBuilder.Form.Select('ar-difficulty-degree', 'Dificuldade de obtenção', 'ar_difficulty_degree', intensityDegrees, 'alto, médio...', {"required": true}, currentArtifact.difficulty) +
        PageBuilder.Form.CheckBox('ar-quality-attributes', 'Atributos de Qualidade', 'ar_quality_attributes', qualityAttributes, currentArtifact.qualityAttributes) +
        PageBuilder.Form.CheckBox('ar-business-attributes', 'Atributos de Negócio', 'ar_business_attributes', businessAttributes, currentArtifact.businessAttributes) +
        PageBuilder.Form.CheckBox('ar-architectural-scenarios', 'Cenários Arquiteturais', 'ar_architectural_scenarios', architecturalScenarios, currentArtifact.architecturalScenarios)
    )

    return {name: "Requisito Arquitetural", content}
}
function EditStakeholderModal(id){
    currentArtifactType = 'stakeholder'

    // Loading current values
    id = id || ''
    let currentArtifact = project.StakeholderManager.get(id) || {
        name: '',
        interest: ''
    }

    let content = PageBuilder.Component.ArtifactEditFormContainer('edit-stakeholder-form',
        PageBuilder.Form.TextInput('stakeholder-id', 'ID do Stakeholder', 'stakeholder_id', 'Criando um novo...', id, {"readonly": true}) +
        PageBuilder.Form.TextInput('stakeholder-name', 'Nome do Stakeholder', 'stakeholder_name', 'Nome do Stakeholder', currentArtifact.name, {"required": true}) +
        PageBuilder.Form.TextInput('stakeholder-interest', 'Interesse do Stakeholder', 'stakeholder_interest', 'Interesse do Stakeholder', currentArtifact.interest, {"required": true})
    )
    return {name: "Stakeholder", content}
}
function EditArchitecturalScenarioModal(id){
    currentArtifactType = 'architectural-scenario'

    // Loading current values
    id = id || ''
    let currentArtifact = project.ArchitecturalScenarioManager.get(id) || {
        description: '',
        importance: '',
        qualityAttributes: [],
        businessAttributes: []
    }

    let qualityAttributes = []
    for (let qAtt in project.QualityAttributes){
        qualityAttributes.push({id: qAtt, value: qAtt, text: project.QualityAttributes[qAtt]})
    }
    let businessAttributes = []
    for (let bAtt in project.BusinessAttributes){
        businessAttributes.push({id: bAtt, value: bAtt, text: project.BusinessAttributes[bAtt]})
    }


    let content = PageBuilder.Component.ArtifactEditFormContainer('edit-architectural-scenario-form',
        PageBuilder.Form.TextInput('architectural-scenario-id', 'ID do Cenário Arquitetural', 'architectural_scenario_id', 'Criando um novo...', id, {"readonly": true}) +
        PageBuilder.Form.TextInput('architectural-scenario-description', 'Descrição do Cenário Arquitetural', 'architectural_scenario_description', 'Descrição do cenário arquitetural', currentArtifact.description, {"required": true}) +
        PageBuilder.Form.Select('architectural-scenario-importance', 'Importância do Cenário', 'architectural_scenario_importance', project.IntensityDegrees, 'Importância do cenário', {"required": true}, currentArtifact.importance) +
        PageBuilder.Form.CheckBox('architectural-scenario-quality-attributes', 'Atributos de Qualidade', 'architectural_scenario_quality_attributes', qualityAttributes, currentArtifact.qualityAttributes) +
        PageBuilder.Form.CheckBox('architectural-scenario-business-attributes', 'Atributos de Negócio', 'architectural_scenario_business_attributes', businessAttributes, currentArtifact.businessAttributes)
    )
    return {name: "Cenário Arquitetural", content}
}
function EditArchitecturalDecisionModal(id){}
function EditPointOfViewModal(id){}
function EditArchitecturalViewModal(id){}
function EditIntensityDegreeModal(id){}
function EditQualityAttributeModal(id){}
function EditBusinessAttributeModal(id){}

function RenderArtifacts(){
    let processedFunctionalRequirements = processFunctionalRequirements()
    let processedStakeholders = processStakeholders()
    
    artifactArea.innerHTML = ''

    //! Requisitos funcionais
    artifactArea.innerHTML += PageBuilder.Component.ArtifactGroup('functional-requirements', 'Requisitos Funcionais', [
        PageBuilder.Component.FunctionalRequirement('RF1', 'o sistema deve funcionar', 'medindo', 'tem que ta aceitavel', project.IntensityDegrees[3].name, project.IntensityDegrees[2].name),
        ...processedFunctionalRequirements
    ], 'functional-requirement')

    //! Stakeholders
    artifactArea.innerHTML += PageBuilder.Component.ArtifactGroup('stakeholders', 'Stakeholders', [
        PageBuilder.Component.Stakeholder('S1', 'Cliente', 'Interesse do cliente'),
        PageBuilder.Component.Stakeholder('S2', 'Desenvolvedor', 'Interesse do desenvolvedor'),
        PageBuilder.Component.Stakeholder('S3', 'Gerente de Projeto', 'Interesse do gerente de projeto'),
        ...processedStakeholders
    ], 'stakeholder')

    //! Cenários Arquiteturais
    let processedArchitecturalScenarios = processArchitecturalScenarios()
    artifactArea.innerHTML += PageBuilder.Component.ArtifactGroup('architectural-scenarios', 'Cenários Arquiteturais', [
        PageBuilder.Component.ArchitecturalScenario('AS1', 'Cenário 1', project.IntensityDegrees[3].name, ['Performance', 'Segurança'], ['Custo', 'Manutenibilidade']),
        ...processedArchitecturalScenarios
    ], 'architectural-scenario')

    //! Requisitos Arquiteturais
    let processedArchitecturalRequirements = ArchitecturalRequirementProcessor()
    artifactArea.innerHTML += PageBuilder.Component.ArtifactGroup('architectural-requirements', 'Requisitos Arquiteturais', [
        PageBuilder.Component.ArchitecturalRequirement('AR1', 'o sistema deve funcionar', 'medindo', 'tem que ta aceitavel', project.IntensityDegrees[3].name, project.IntensityDegrees[2].name, ['Performance', 'Segurança'], ['Custo', 'Manutenibilidade'], ['AS1']),
        ...processedArchitecturalRequirements
    ], 'architectural-requirement')

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

//! Artifacts Processors
function processFunctionalRequirements(){
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
    return processedFunctionalRequirements
}
function processStakeholders(){
    let stakeholders = project.StakeholderManager.getAll()
    let processedStakeholders = []
    for (artifact of stakeholders){
        processedStakeholders.push(PageBuilder.Component.Stakeholder(
            artifact.id,
            artifact.name,
            artifact.interest
        ))
    }
    return processedStakeholders
}
function processArchitecturalScenarios(){
    let architecturalScenarios = project.ArchitecturalScenarioManager.getAll()
    let processedArchitecturalScenarios = []
    for (artifact of architecturalScenarios){
        processedArchitecturalScenarios.push(PageBuilder.Component.ArchitecturalScenario(
            artifact.id,
            artifact.description,
            artifact.importance,
            project.translateQualityAttributes(artifact.qualityAttributes),
            project.translateBusinessAtributes(artifact.businessAttributes)
        ))
    }
    return processedArchitecturalScenarios
}
function ArchitecturalRequirementProcessor(){
    let architecturalRequirements = project.ArchitecturalRequirementManager.getAll()
    let processedArchitecturalRequirements = []

    //! Atualizar depois
    let architecturalDecisions = []

    for (artifact of architecturalRequirements){
        processedArchitecturalRequirements.push(PageBuilder.Component.ArchitecturalRequirement(
            artifact.id,
            artifact.architecturalRequirement,
            artifact.measureMethod,
            artifact.acceptanceCriteria,
            artifact.importance,
            artifact.difficulty,
            project.translateQualityAttributes(artifact.qualityAttributes),
            project.translateBusinessAtributes(artifact.businessAttributes),
            artifact.architecturalScenarios,
            architecturalDecisions // Placeholder for architectural decisions
        ))
    }
    return processedArchitecturalRequirements
}
function ArchitecturalDecisionProcessor(){
    
}
function PointOfViewProcessor(){
    
}
function ArchitecturalViewProcessor(){
}



initializeEditModal()
RenderArtifacts()
RenderEditModal()
RenderSettings()
initializeProjectSettings()

// ! The editor will include an hidden field with the artifact ID, in the submittion, if the ID is present, it will update the artifact, otherwise it will create a new one