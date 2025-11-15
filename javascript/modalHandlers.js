// Modal handler functions: Edit...Modal builders. Exposed as globals used by modalHandlers mapping.
window.EditFunctionalRequirementModal = function(id){
    currentArtifactType = 'functional-requirement'

    id = id || ''
    let currentArtifact = project.FunctionalRequirementManager.get(id) || {
        functionalRequirement: '',
        measureMethod: '',
        acceptanceCriteria: '',
        importance: '',
        difficulty: ''
    }

    let intensityDegrees = getIntensityDegrees()
    let content = PageBuilder.Component.ArtifactEditFormContainer('edit-funcreq-form', 
        PageBuilder.Component.InfoBox(window.artifactGuides[currentArtifactType]) +
        PageBuilder.Form.TextInput('rf-id', 'ID do Requisito Funcional', 'rf_id', 'Criando um novo...', id, {"readonly": true}) +
        PageBuilder.Form.TextInput('rf-description', 'Descrição do Requisito Funcional', 'rf_description', 'O sistema deve...', currentArtifact.functionalRequirement, {"required": true}) +
        PageBuilder.Form.TextInput('rf-measure', 'Forma de Medição', 'rf_measure', 'medindo...', currentArtifact.measureMethod, {"required": true}) +
        PageBuilder.Form.TextInput('rf-acceptable', 'Critério de aceitação', 'rf_acceptable', 'métrica deve estar acima de...', currentArtifact.acceptanceCriteria, {"required": true}) +
        PageBuilder.Form.Select('rf-importance-degree', 'Importância', 'rf_importance_degree', intensityDegrees, 'alto, médio...', {"required": true}, currentArtifact.importance) +
        PageBuilder.Form.Select('rf-difficulty-degree', 'Dificuldade de obtenção', 'rf_difficulty_degree', intensityDegrees, 'alto, médio...', {"required": true}, currentArtifact.difficulty) 
    )

    return {name: "Requisito Funcional", content}
}

window.EditArchitecturalRequirementModal = function(id){
    currentArtifactType = 'architectural-requirement'

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
        PageBuilder.Component.InfoBox(window.artifactGuides[currentArtifactType]) +
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

window.EditStakeholderModal = function(id){
    currentArtifactType = 'stakeholder'

    id = id || ''
    let currentArtifact = project.StakeholderManager.get(id) || {
        name: '',
        interest: ''
    }

    let content = PageBuilder.Component.ArtifactEditFormContainer('edit-stakeholder-form',
        PageBuilder.Component.InfoBox(window.artifactGuides[currentArtifactType]) +
        PageBuilder.Form.TextInput('stakeholder-id', 'ID do Stakeholder', 'stakeholder_id', 'Criando um novo...', id, {"readonly": true}) +
        PageBuilder.Form.TextInput('stakeholder-name', 'Nome do Stakeholder', 'stakeholder_name', 'Nome do Stakeholder', currentArtifact.name, {"required": true}) +
        PageBuilder.Form.TextInput('stakeholder-interest', 'Interesse do Stakeholder', 'stakeholder_interest', 'Interesse do Stakeholder', currentArtifact.interest, {"required": true})
    )
    return {name: "Stakeholder", content}
}

window.EditArchitecturalScenarioModal = function(id){
    currentArtifactType = 'architectural-scenario'

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
        PageBuilder.Component.InfoBox(window.artifactGuides[currentArtifactType]) +
        PageBuilder.Form.TextInput('architectural-scenario-id', 'ID do Cenário Arquitetural', 'architectural_scenario_id', 'Criando um novo...', id, {"readonly": true}) +
        PageBuilder.Form.TextInput('architectural-scenario-description', 'Descrição do Cenário Arquitetural', 'architectural_scenario_description', 'Descrição do cenário arquitetural', currentArtifact.description, {"required": true}) +
        PageBuilder.Form.Select('architectural-scenario-importance', 'Importância do Cenário', 'architectural_scenario_importance', project.IntensityDegrees, 'Importância do cenário', {"required": true}, currentArtifact.importance) +
        PageBuilder.Form.CheckBox('architectural-scenario-quality-attributes', 'Atributos de Qualidade', 'architectural_scenario_quality_attributes', qualityAttributes, currentArtifact.qualityAttributes) +
        PageBuilder.Form.CheckBox('architectural-scenario-business-attributes', 'Atributos de Negócio', 'architectural_scenario_business_attributes', businessAttributes, currentArtifact.businessAttributes)
    )
    return {name: "Cenário Arquitetural", content}
}

window.EditArchitecturalDecisionModal = function(id){
    currentArtifactType = 'architectural-decision'

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
        PageBuilder.Component.InfoBox(window.artifactGuides[currentArtifactType]) +
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

window.EditPointOfViewModal = function(id){
    currentArtifactType = 'point-of-view'

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
        PageBuilder.Component.InfoBox(window.artifactGuides[currentArtifactType]) +
        PageBuilder.Form.TextInput('point-of-view-id', 'ID do Ponto de Vista', 'point_of_view_id', 'Criando um novo...', id, {"readonly": true}) +
        PageBuilder.Form.TextInput('point-of-view-description', 'Descrição do Ponto de Vista', 'point_of_view_description', 'Descrição do ponto de vista', currentArtifact.pointOfView, {"required": true}) +
        PageBuilder.Form.CheckBox('point-of-view-quality-attributes', 'Atributos de Qualidade', 'point_of_view_quality_attributes', qualityAttributes, currentArtifact.relatedQualityAttributes)
    )

    return {name: "Ponto de Vista", content}
}

window.EditArchitecturalViewModal = function(id){
    currentArtifactType = 'architectural-view'

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
        PageBuilder.Component.InfoBox(window.artifactGuides[currentArtifactType]) +
        PageBuilder.Form.TextInput('architectural-view-id', 'ID da Visão Arquitetural', 'architectural_view_id', 'Criando uma nova...', id, {"readonly": true}) +
        PageBuilder.Form.TextInput('architectural-view-name', 'Nome da Visão Arquitetural', 'architectural_view_name', 'Nome da visão arquitetural', currentArtifact.architecturalView, {"required": true}) +
        PageBuilder.Form.TextInput('architectural-view-link', 'Link da Visão Arquitetural', 'architectural_view_link', 'Link para a visão arquitetural', currentArtifact.link, {"required": true}) +
        PageBuilder.Form.CheckBox('architectural-view-points-of-view', 'Pontos de Vista Relacionados', 'architectural_view_points_of_view', pointsOfView, currentArtifact.relatedPointsOfView)
    )
    return {name: "Visão Arquitetural", content}
}

window.EditIntensityDegreeModal = function(id){}

// modalHandlers mapping used by toggleEditor() — keep mapping global so projectManager can call it
window.modalHandlers = {
    'functional-requirement': window.EditFunctionalRequirementModal,
    'architectural-requirement': window.EditArchitecturalRequirementModal,
    'stakeholder': window.EditStakeholderModal,
    'architectural-scenario': window.EditArchitecturalScenarioModal,
    'architectural-decision': window.EditArchitecturalDecisionModal,
    'point-of-view': window.EditPointOfViewModal,
    'architectural-view': window.EditArchitecturalViewModal,
    'intensity-degree': window.EditIntensityDegreeModal,
}
// goes to ProjectManager