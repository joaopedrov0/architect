
// Deprecated
// class Guide {
//     // Materiais didaticos
// }

// Deprecated
// class FunctionalRequirement {}
// class ArchitecturalRequirement {}
// class Stakeholder {}
// class ArchitecturalScenario {}
// class ArchitecturalDecision {}


class Project {
    constructor(name, author){
        this.name = name
        this.author = author
        this.created_at = getNow()
        this.updated_at = getNow()
    }

    getNow(){
        let temp = new Date()
        return `${temp.getFullYear()}/${temp.getMonth()}/${temp.getDate()} - ${temp.getHours()}:${temp.getMinutes()}:${temp.getSeconds()}`
    }

    getID(){
        // Returns a unique ID
    }

    // Project Settings Manager (key:value structure)
    BusinessAttributes = {} // id: name
    QualityAttributes = {} // id: name
    IntensityDegrees = {} // id: name

    // Managers
    FunctionalRequirementManager = {

        // DataStructure
        // id
        // FunctionalRequirement
        // Acceptance criteria
        // Importance
        // Difficulty in obtaining
        
        collection: {},
        add: (id) => {},
        delete: (id) => {},
        update: (id) => {},
        get: (id) => {},
        getAll: () => {},
        getListById: (idList) => {},

        // Relationship
        // None
    }
    ArchitecturalRequirementManager = {
        
        // DataStructure
        // id
        // ArchitecturalRequirement
        // Measure method
        // Acceptance criteria
        // Importance
        // Difficulty in obtaining
        // QualityAttributes related list
        // BusinessAttributes related list
        // ArchitecturalScenarios related list

        collection: {},
        add: (id) => {},
        delete: (id) => {},
        update: (id) => {},
        get: (id) => {},
        getAll: () => {},
        getListById: (idList) => {},
        
        // Relationship
        // * getQualityAttributesAssociated: (id) => {},
        // * getBusinessAttributesAssociated: (id) => {},
        // * getArchitecturalScenariosAssociated: (id) => {},
        // * getArchitecturalDecisionsAssociated: (id) => {},

    }
    StakeholderManager = {
        
        // DataStructure
        // id
        // Name
        // Interest


        collection: {},
        add: (id) => {},
        delete: (id) => {},
        update: (id) => {},
        get: (id) => {},
        getAll: () => {},
        getListById: (idList) => {},

        // Relationship
        // None
    }
    ArchitecturalScenarioManager = {

        // DataStructure
        // id
        // Scenario description
        // Importance
        // Related QualityAttributes list
        // Related BusinessAttributes list

        collection: {},
        add: (id) => {},
        delete: (id) => {},
        update: (id) => {},
        get: (id) => {},
        getAll: () => {},
        getListById: (idList) => {},

        // Relationship
        // * getQualityAttributesAssociated: (id) => {},
        // * getBusinessAttributesAssociated: (id) => {},
        // * getArchitecturalRequirementsAssociated: (id) => {},

    }
    ArchitecturalDecisionManager = {
        
        // DataStructure
        // id
        // Decision
        // List of favored ArchitecturalRequirement
        // List of harmed ArchitecturalRequirement
        // List of favored QualityAttributes
        // List of harmed QualityAttributes
        // List of favored BusinessAttributes
        // List of harmed BusinessAttributes
        // Alternative

        collection: {},
        add: (id) => {},
        delete: (id) => {},
        update: (id) => {},
        get: (id) => {},
        getAll: () => {},
        getListById: (idList) => {},
        
        // Relationship
        // * getArchitecturalRequirementsAssociated: (id) => {},
        // * getQualityAttributesAssociated: (id) => {},
        // * getBusinessAttributesAssociated: (id) => {},
    }
    PointOfViewManager = {

        // DataStructure
        // id
        // PointOfView
        // List of quality attributes related

        collection: {},
        add: (id) => {},
        delete: (id) => {},
        update: (id) => {},
        get: (id) => {},
        getAll: () => {},
        getListById: (idList) => {},

    }
    ArchitecturalViewManager = {

        // DataStructure
        // id
        // ArchitecturalView
        // List of points of view related

        collection: {},
        add: (id) => {},
        delete: (id) => {},
        update: (id) => {},
        get: (id) => {},
        getAll: () => {},
        getListById: (idList) => {},

    }


     
}

class Render {
    // Classe com a responsabilidade de renderizar os cards corretamente manipulando os managers de Project.


    // Each data query must return a list of objects with all data needed to render it INSIDE the object
    // Example: 
    // [ArchitecturalDecisionID: {id: id..., ArchitecturalRequirements: {Favored: [{}...], Harmed: [{}...]}]


    FunctionalRequirementPage(){
        // build a page taking this data:
        // - All data from all FunctionalRequirements
    }
    ArchitecturalRequirementPage(){
        // build a page taking this data:
        // - All data from all ArchitecturalRequirements
        // - All data from all QualityAttributes related to each requirement
        // - All data from all BusinessAttributes related to each requirement
        // - ALl data from all ArchitecturalScenarios related to each requirement
        // - ALl data from all ArchitecturalDecisions related to each requirement (it must still explicit if the requirement was favored or harmed by the decision)
    }
    StakeholderPage(){
        // build a page taking this data:
        // - All data from all StakeHolders
        // - All data from all ArchitecturalScenario related to each stakeholder
    }
    ArchitecturalScenarioPage(){
        // build a page taking this data:
        // - All data from all ArchitecturalScenarios
        // - All data from all QualityAttributes related to each scenario
        // - All data from all BusinessAttributes related to each scenario
        // - ALl data from all ArchitecturalRequirements related to each scenario
    }
    ArchitecturalDecisionPage(){
        // build a page taking this data:
        // - All data from all ArchitecturalRequirements positively and negatively affected by each decision (must still separed favored and harmed requirements)
        // - All data from all QualityAttributes favored and harmed by each decision
        // - All data from all BusinessAttributes favored and harmed by each decision

    }
    PointOfViewPage(){
        // build a page taking this data:
        // - All data from all Points of View
        // - All data from all QualityAttributes related to each point of view
        // - All data from all ArchitecturalViews related do each point of view
    }
    ArchitecturalViewPage(){
        // build a page taking this data:
        // - All data from all architectural views
        // - All data from all points of view related to each architectural view
    
    }

}