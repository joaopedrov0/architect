// Artifact processing functions used to render artifact lists. Exposed globally to keep compatibility.
window.processFunctionalRequirements = function(){
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

window.processStakeholders = function(){
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

window.processArchitecturalScenarios = function(){
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

window.processArchitecturalRequirements = function(){
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
            architecturalDecisions
        ))
    }
    return processedArchitecturalRequirements
}

window.processArchitecturalDecisions = function(){
    let architecturalDecision = project.ArchitecturalDecisionManager.getAll()
    let processedArchitecturalDecisions = []

    for (artifact of architecturalDecision){
        let archReqsRaw = project.ArchitecturalDecisionManager.getArchitecturalRequirementsAssociated(artifact.id)
        let qualityAttrs = project.ArchitecturalDecisionManager.getQualityAttributesAssociated(artifact.id)
        let businessAttrs = project.ArchitecturalDecisionManager.getBusinessAttributesAssociated(artifact.id)

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

window.processPointOfViews = function(){
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

window.processArchitecturalViews = function(){
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

    return processedArchitecturalViews
}
