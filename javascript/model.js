class Guide {
    // Materiais didaticos
}

class Project {
    constructor(name, author){
        this.name = name
        this.author = author
    }

    // Project Settings Manager
    BusinessAttributes = []
    QualityAttributes = []

    // Managers
    FunctionalRequirementManager = {
        
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

     
}

class Render {
    // Classe com a responsabilidade de renderizar os cards corretamente manipulando os managers de Project.
}