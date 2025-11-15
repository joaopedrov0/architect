// Submit handlers for each artifact type. Exposed as global `submittionHandlers` to keep compatibility.
window.submittionHandlers = {
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

        let qualityAttributesIds = Array.from(qualityAttributes).map(el => el.value)
        let businessAttributesIds = Array.from(businessAttributes).map(el => el.value)

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

        let favoredArchReqIds = Array.from(favoredArchReq).map(el => el.value)
        let harmedArchReqIds = Array.from(harmedArchReq).map(el => el.value)
        let favoredQualityAttrIds = Array.from(favoredQualityAttr).map(el => el.value)
        let harmedQualityAttrIds = Array.from(harmedQualityAttr).map(el => el.value)
        let favoredBusinessAttrIds = Array.from(favoredBusinessAttr).map(el => el.value)
        let harmedBusinessAttrIds = Array.from(harmedBusinessAttr).map(el => el.value)

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
}
