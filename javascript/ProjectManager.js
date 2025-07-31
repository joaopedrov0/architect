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
    'architectural-decision': function SubmitArchitecturalDecision(){
        let form = document.querySelector('#edit-architectural-decision-form')
        let id = form.querySelector('#architectural-decision-id').value
        let decision = form.querySelector('#architectural-decision-decision').value
        let favoredArchReq = form.querySelectorAll('input[name="architectural_decision_favored_arch_req"]:checked')
        let harmedArchReq = form.querySelectorAll('input[name="architectural_decision_harmed_arch_req"]:checked')
        let favoredQualityAttr = form.querySelectorAll('input[name="architectural_decision_favored_quality_attr"]:checked')
        let harmedQualityAttr = form.querySelectorAll('input[name="architectural_decision_harmed_quality_attr"]:checked')
        let favoredBusinessAttr = form.querySelectorAll('input[name="architectural_decision_favored_business_attr"]:checked')
        let harmedBusinessAttr = form.querySelectorAll('input[name="architectural_decision_harmed_business_attr"]:checked')
        let alternative = form.querySelector('#architectural-decision-alternative').value

        console.dir(favoredArchReq)

        let favoredArchReqIds = Array.from(favoredArchReq).map(el => el.value)
        let harmedArchReqIds = Array.from(harmedArchReq).map(el => el.value)
        let favoredQualityAttrIds = Array.from(favoredQualityAttr).map(el => el.value)
        let harmedQualityAttrIds = Array.from(harmedQualityAttr).map(el => el.value)
        let favoredBusinessAttrIds = Array.from(favoredBusinessAttr).map(el => el.value)
        let harmedBusinessAttrIds = Array.from(harmedBusinessAttr).map(el => el.value)

        console.dir(favoredArchReqIds)

        if (id) {
            project.ArchitecturalDecisionManager.update(id, decision, favoredArchReqIds, harmedArchReqIds, favoredQualityAttrIds, harmedQualityAttrIds, favoredBusinessAttrIds, harmedBusinessAttrIds, alternative)
        } else {
            project.ArchitecturalDecisionManager.add(decision, favoredArchReqIds, harmedArchReqIds, favoredQualityAttrIds, harmedQualityAttrIds, favoredBusinessAttrIds, harmedBusinessAttrIds, alternative)
        }
    },
    'point-of-view': function SubmitPointOfView(){
        let form = document.querySelector('#edit-point-of-view-form')
        let id = form.querySelector('#point-of-view-id').value
        let pointOfView = form.querySelector('#point-of-view-description').value
        let qualityAttributes = form.querySelectorAll('input[name="point_of_view_quality_attributes"]:checked')

        let qualityAttributesIds = Array.from(qualityAttributes).map(el => el.value)

        if (id) {
            project.PointOfViewManager.update(id, pointOfView, qualityAttributesIds)
        } else {
            project.PointOfViewManager.add(pointOfView, qualityAttributesIds)
        }
    },
    'architectural-view': function SubmitArchitecturalView(){
        let form = document.querySelector('#edit-architectural-view-form')
        let id = form.querySelector('#architectural-view-id').value
        let architecturalView = form.querySelector('#architectural-view-name').value
        let link = form.querySelector('#architectural-view-link').value
        let relatedPointsOfView = form.querySelectorAll('input[name="architectural_view_points_of_view"]:checked')

        let relatedPointsOfViewIds = Array.from(relatedPointsOfView).map(el => el.value)

        if (id) {
            project.ArchitecturalViewManager.update(id, architecturalView, link, relatedPointsOfViewIds)
        } else {
            project.ArchitecturalViewManager.add(architecturalView, link, relatedPointsOfViewIds)
        }
    },

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
function EditArchitecturalDecisionModal(id){
    currentArtifactType = 'architectural-decision'

    // Loading current values
    id = id || ''
    let currentArtifact = project.ArchitecturalDecisionManager.get(id) || {
        decision: '',
        favoredArchitecturalRequirements: [],
        harmedArchitecturalRequirements: [],
        favoredQualityAttributes: [],
        harmedQualityAttributes: [],
        favoredBusinessAttributes: [],
        harmedBusinessAttributes: [],
        alternative: ''
    }

    let architecturalRequirements = []
    for (let ar in project.ArchitecturalRequirementManager.collection){
        const { id, architecturalRequirement } = project.ArchitecturalRequirementManager.collection[ar]
        architecturalRequirements.push({id, value: id, text: architecturalRequirement})
    }

    let qualityAttributes = []
    for(let qAtt in project.QualityAttributes){
        qualityAttributes.push({id: qAtt, value: qAtt, text: project.QualityAttributes[qAtt]})
    }

    let businessAttributes = []
    for(let bAtt in project.BusinessAttributes){
        businessAttributes.push({id: bAtt, value: bAtt, text: project.BusinessAttributes[bAtt]})
    }

    let content = PageBuilder.Component.ArtifactEditFormContainer('edit-architectural-decision-form',
        PageBuilder.Form.TextInput('architectural-decision-id', 'ID da Decisão Arquitetural', 'architectural_decision_id', 'Criando uma nova...', id, {"readonly": true}) +
        PageBuilder.Form.TextInput('architectural-decision-decision', 'Decisão', 'architectural_decision_decision', 'Descrição da decisão', currentArtifact.decision, {"required": true}) +
        PageBuilder.Form.CheckBox('architectural-decision-favored-arch-req', 'Requisitos Arquiteturais Favorecidos', 'architectural_decision_favored_arch_req', architecturalRequirements, currentArtifact.favoredArchitecturalRequirements) +
        PageBuilder.Form.CheckBox('architectural-decision-harmed-arch-req', 'Requisitos Arquiteturais Prejudicados', 'architectural_decision_harmed_arch_req', architecturalRequirements, currentArtifact.harmedArchitecturalRequirements) +
        PageBuilder.Form.CheckBox('architectural-decision-favored-quality-attr', 'Atributos de Qualidade Favorecidos', 'architectural_decision_favored_quality_attr', qualityAttributes, currentArtifact.favoredQualityAttributes) +
        PageBuilder.Form.CheckBox('architectural-decision-harmed-quality-attr', 'Atributos de Qualidade Prejudicados', 'architectural_decision_harmed_quality_attr', qualityAttributes, currentArtifact.harmedQualityAttributes) +
        PageBuilder.Form.CheckBox('architectural-decision-favored-business-attr', 'Atributos de Negócio Favorecidos', 'architectural_decision_favored_business_attr', businessAttributes, currentArtifact.favoredBusinessAttributes) +
        PageBuilder.Form.CheckBox('architectural-decision-harmed-business-attr', 'Atributos de Negócio Prejudicados', 'architectural_decision_harmed_business_attr', businessAttributes, currentArtifact.harmedBusinessAttributes) +
        PageBuilder.Form.TextInput('architectural-decision-alternative', 'Alternativa', 'architectural_decision_alternative', 'Descrição da alternativa', currentArtifact.alternative, {"required": true})
    )
    return {name: "Decisão Arquitetural", content}
}
function EditPointOfViewModal(id){
    currentArtifactType = 'point-of-view'

    // Loading current values
    id = id || ''
    let currentArtifact = project.PointOfViewManager.get(id) || {
        pointOfView: '',
        relatedQualityAttributes: []
    }

    let qualityAttributes = []
    for (let qAtt in project.QualityAttributes){
        qualityAttributes.push({id: qAtt, value: qAtt, text: project.QualityAttributes[qAtt]})
    }

    let content = PageBuilder.Component.ArtifactEditFormContainer('edit-point-of-view-form',
        PageBuilder.Form.TextInput('point-of-view-id', 'ID do Ponto de Vista', 'point_of_view_id', 'Criando um novo...', id, {"readonly": true}) +
        PageBuilder.Form.TextInput('point-of-view-description', 'Descrição do Ponto de Vista', 'point_of_view_description', 'Descrição do ponto de vista', currentArtifact.pointOfView, {"required": true}) +
        PageBuilder.Form.CheckBox('point-of-view-quality-attributes', 'Atributos de Qualidade', 'point_of_view_quality_attributes', qualityAttributes, currentArtifact.relatedQualityAttributes)
    )

    return {name: "Ponto de Vista", content}
}
function EditArchitecturalViewModal(id){
    currentArtifactType = 'architectural-view'

    // Loading current values
    id = id || ''
    let currentArtifact = project.ArchitecturalViewManager.get(id) || {
        architecturalView: '',
        link: '',
        relatedPointsOfView: []
    }

    let pointsOfView = []
    for (let pov in project.PointOfViewManager.collection){
        const { id, pointOfView } = project.PointOfViewManager.collection[pov]
        pointsOfView.push({id, value: id, text: pointOfView})
    }

    let content = PageBuilder.Component.ArtifactEditFormContainer('edit-architectural-view-form',
        PageBuilder.Form.TextInput('architectural-view-id', 'ID da Visão Arquitetural', 'architectural_view_id', 'Criando uma nova...', id, {"readonly": true}) +
        PageBuilder.Form.TextInput('architectural-view-name', 'Nome da Visão Arquitetural', 'architectural_view_name', 'Nome da visão arquitetural', currentArtifact.architecturalView, {"required": true}) +
        PageBuilder.Form.TextInput('architectural-view-link', 'Link da Visão Arquitetural', 'architectural_view_link', 'Link para a visão arquitetural', currentArtifact.link, {"required": true}) +
        PageBuilder.Form.CheckBox('architectural-view-points-of-view', 'Pontos de Vista Relacionados', 'architectural_view_points_of_view', pointsOfView, currentArtifact.relatedPointsOfView)
    )
    return {name: "Visão Arquitetural", content}
}
function EditIntensityDegreeModal(id){}
function EditQualityAttributeModal(id){}
function EditBusinessAttributeModal(id){}

function RenderArtifacts(){
    let processedFunctionalRequirements = processFunctionalRequirements()
    let processedStakeholders = processStakeholders()
    
    artifactArea.innerHTML = ''

    //! Requisitos funcionais
    artifactArea.innerHTML += PageBuilder.Component.ArtifactGroup('functional-requirements', 'Requisitos Funcionais', [
        // PageBuilder.Component.FunctionalRequirement('RF1', 'o sistema deve funcionar', 'medindo', 'tem que ta aceitavel', project.IntensityDegrees[3].name, project.IntensityDegrees[2].name),
        ...processedFunctionalRequirements
    ], 'functional-requirement')

    //! Stakeholders
    artifactArea.innerHTML += PageBuilder.Component.ArtifactGroup('stakeholders', 'Stakeholders', [
        // PageBuilder.Component.Stakeholder('S1', 'Cliente', 'Interesse do cliente'),
        // PageBuilder.Component.Stakeholder('S2', 'Desenvolvedor', 'Interesse do desenvolvedor'),
        // PageBuilder.Component.Stakeholder('S3', 'Gerente de Projeto', 'Interesse do gerente de projeto'),
        ...processedStakeholders
    ], 'stakeholder')

    //! Cenários Arquiteturais
    let processedArchitecturalScenarios = processArchitecturalScenarios()
    artifactArea.innerHTML += PageBuilder.Component.ArtifactGroup('architectural-scenarios', 'Cenários Arquiteturais', [
        // PageBuilder.Component.ArchitecturalScenario('AS1', 'Cenário 1', project.IntensityDegrees[3].name, ['Performance', 'Segurança'], ['Custo', 'Manutenibilidade']),
        ...processedArchitecturalScenarios
    ], 'architectural-scenario')

    //! Requisitos Arquiteturais
    let processedArchitecturalRequirements = processArchitecturalRequirements()
    artifactArea.innerHTML += PageBuilder.Component.ArtifactGroup('architectural-requirements', 'Requisitos Arquiteturais', [
        // PageBuilder.Component.ArchitecturalRequirement('AR1', 'o sistema deve funcionar', 'medindo', 'tem que ta aceitavel', project.IntensityDegrees[3].name, project.IntensityDegrees[2].name, ['Performance', 'Segurança'], ['Custo', 'Manutenibilidade'], ['AS1'], {favored: [], harmed: []}),
        ...processedArchitecturalRequirements
    ], 'architectural-requirement')

    //! Decisões Arquiteturais
    let processedArchitecturalDecisions = processArchitecturalDecisions()
    artifactArea.innerHTML += PageBuilder.Component.ArtifactGroup('architectural-decisions', 'Decisões Arquiteturais', [
        // PageBuilder.Component.ArchitecturalDecision('AD1', 'Decisão 1', {favored: ['AR1'], harmed: ['AR2']}, {favored: ['Performance', 'Segurança'], harmed: ['Custo', 'Manutenibilidade']}, {favored: ['Custo'], harmed: ['Manutenibilidade']}, 'Alternativa 1'),
        ...processedArchitecturalDecisions
        ], 'architectural-decision')

    //! Pontos de Vista
    let processedPointsOfView = processPointOfViews()
    artifactArea.innerHTML += PageBuilder.Component.ArtifactGroup('points-of-view', 'Pontos de Vista', [
        // PageBuilder.Component.PointOfView('POV1', 'Ponto de Vista 1', ['Performance', 'Segurança']),
        ...processedPointsOfView
    ], 'point-of-view')

    //! Visões Arquiteturais
    let processedArchitecturalViews = processArchitecturalViews()
    artifactArea.innerHTML += PageBuilder.Component.ArtifactGroup('architectural-views', 'Visões Arquiteturais', [
        // PageBuilder.Component.ArchitecturalView('AV1', 'Visão Arquitetural 1', 'Descrição da visão', ['POV1', 'POV2']),
        ...processedArchitecturalViews
    ], 'architectural-view')

}

function initializeModals(){
    modalArea.innerHTML = PageBuilder.Basics.ModalElement('edit-modal', 'Editar Artefato', '', `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-primary" onclick="SubmitEditArtifact()">Salvar</button>
        `)+
        PageBuilder.Component.DeleteModal(project.id)
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

function deleteProject(){
    StorageManager.deleteProject(project.id)
    window.location.href = 'index.html'
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
            artifact.importance ? project.IntensityDegrees[artifact.importance].name : 'Não informado',
            artifact.difficulty ? project.IntensityDegrees[artifact.difficulty].name : 'Não informado'
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
            artifact.importance ? project.IntensityDegrees[artifact.importance].name : 'Não informado',
            project.translateQualityAttributes(artifact.qualityAttributes),
            project.translateBusinessAtributes(artifact.businessAttributes)
        ))
    }
    return processedArchitecturalScenarios
}
function processArchitecturalRequirements(){
    let architecturalRequirements = project.ArchitecturalRequirementManager.getAll()
    let processedArchitecturalRequirements = []

    

    for (artifact of architecturalRequirements){
        let architecturalScenarios = project.ArchitecturalRequirementManager.getArchitecturalScenariosAssociated(artifact.id)
        architecturalScenarios = architecturalScenarios.map(scenario => {
            return {
                id: scenario.id,
                description: scenario.description,
                importance: scenario.importance ? project.IntensityDegrees[scenario.importance].name : 'Não informado'
            }
        })

        let architecturalDecisions = project.ArchitecturalRequirementManager.getArchitecturalDecisionsAssociated(artifact.id)
        
        console.log("Favored")
        console.dir(architecturalDecisions.favored)

        processedArchitecturalRequirements.push(PageBuilder.Component.ArchitecturalRequirement(
            artifact.id,
            artifact.architecturalRequirement,
            artifact.measureMethod,
            artifact.acceptanceCriteria,
            artifact.importance ? project.IntensityDegrees[artifact.importance].name : 'Não informado',
            artifact.difficulty ? project.IntensityDegrees[artifact.difficulty].name : 'Não informado',
            project.translateQualityAttributes(artifact.qualityAttributes),
            project.translateBusinessAtributes(artifact.businessAttributes),
            architecturalScenarios,
            architecturalDecisions // Placeholder for architectural decisions
        ))
    }
    return processedArchitecturalRequirements
}
function processArchitecturalDecisions(){
    let architecturalDecision = project.ArchitecturalDecisionManager.getAll()
    let processedArchitecturalDecisions = []

    

    for (artifact of architecturalDecision){
        let archReqsRaw = project.ArchitecturalDecisionManager.getArchitecturalRequirementsAssociated(artifact.id)
        let qualityAttrs = project.ArchitecturalDecisionManager.getQualityAttributesAssociated(artifact.id)
        let businessAttrs = project.ArchitecturalDecisionManager.getBusinessAttributesAssociated(artifact.id)

        // console.dir(archReqsRaw.favored)


        let archReqs = {
            favored: archReqsRaw.favored.map(req => {
                return {
                    id: req.id,
                    description: req.architecturalRequirement,
                    importance: req.importance ? project.IntensityDegrees[req.importance].name : 'Não informado',
                    difficulty: req.difficulty ? project.IntensityDegrees[req.difficulty].name : 'Não informado'
                }
            }),
            harmed: archReqsRaw.harmed.map(req => {
                return {
                    id: req.id,
                    description: req.architecturalRequirement,
                    importance: req.importance ? project.IntensityDegrees[req.importance].name : 'Não informado',
                    difficulty: req.difficulty ? project.IntensityDegrees[req.difficulty].name : 'Não informado'
                }
            }),

        }

        console.dir(archReqs)

        // let qualityAttrs = {
        //     favored: project.translateQualityAttributes(qualityAttrsRaw.favored),
        //     harmed: project.translateQualityAttributes(qualityAttrsRaw.harmed)
        // }
    
        // let businessAttrs = {
        //     favored: project.translateBusinessAtributes(businessAttrsRaw.favored),
        //     harmed: project.translateBusinessAtributes(businessAttrsRaw.harmed)
        // }

        processedArchitecturalDecisions.push(PageBuilder.Component.ArchitecturalDecision(
            artifact.id,
            artifact.decision,
            archReqs,
            qualityAttrs,
            businessAttrs,
            artifact.alternative
        ))
    }
    return processedArchitecturalDecisions
}
function processPointOfViews(){
    let pointOfViews = project.PointOfViewManager.getAll()
    let processedPointOfViews = []
    for (artifact of pointOfViews){
        processedPointOfViews.push(PageBuilder.Component.PointOfView(
            artifact.id,
            artifact.pointOfView,
            project.translateQualityAttributes(artifact.relatedQualityAttributes),
        ))
    }
    return processedPointOfViews
}
function processArchitecturalViews(){
    let architecturalViews = project.ArchitecturalViewManager.getAll()
    let processedArchitecturalViews = []
    for (artifact of architecturalViews){

        let povNames = []
        for (let pov of artifact.relatedPointsOfView){
            povNames.push(project.PointOfViewManager.get(pov).pointOfView)
        }

        processedArchitecturalViews.push(PageBuilder.Component.ArchitecturalView(
            artifact.id,
            artifact.architecturalView,
            artifact.link,
            povNames
        ))
    }

    console.dir(processedArchitecturalViews)

    return processedArchitecturalViews
}



initializeModals()
RenderArtifacts()
RenderEditModal()
RenderSettings()
initializeProjectSettings()

// ! The editor will include an hidden field with the artifact ID, in the submittion, if the ID is present, it will update the artifact, otherwise it will create a new one