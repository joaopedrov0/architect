class Project {
    constructor(name, author, id) {
        this.name = name;
        this.author = author;
        this.created_at = this._getNow();
        this.updated_at = this._getNow();
        this.id = id

        // Project Settings Manager (key:value structure)
        this.BusinessAttributes = {
            '1': 'business attribute 1',
            '2': 'business attribute 2',
            '3': 'business attribute 3'
        }; // id: { id, name }
        this.QualityAttributes = {
            '1': 'quality attribute 1',
            '2': 'quality attribute 2',
            '3': 'quality attribute 3'
        };  // id: { id, name }
        // 1. Graus de intensidade incluídos como configuração, com valores pré-definidos.
        this.IntensityDegrees = {
            '1': { id: '1', name: 'Baixo' },
            '2': { id: '2', name: 'Médio' },
            '3': { id: '3', name: 'Alto' }
        };
    }

    static rebuild(projectObject) {
        const project = new Project(projectObject.name, projectObject.author, projectObject.id);

        project.created_at = projectObject.created_at;
        project.updated_at = projectObject.updated_at;
        
        project.BusinessAttributes = projectObject.BusinessAttributes;
        project.QualityAttributes = projectObject.QualityAttributes;
        project.IntensityDegrees = projectObject.IntensityDegrees;

        project.FunctionalRequirementManager.collection = projectObject.FunctionalRequirementManager.collection || {};
        project.ArchitecturalRequirementManager.collection = projectObject.ArchitecturalRequirementManager.collection || {};
        project.StakeholderManager.collection = projectObject.StakeholderManager.collection || {};
        project.ArchitecturalScenarioManager.collection = projectObject.ArchitecturalScenarioManager.collection || {};
        project.ArchitecturalDecisionManager.collection = projectObject.ArchitecturalDecisionManager.collection || {};
        project.PointOfViewManager.collection = projectObject.PointOfViewManager.collection || {};
        project.ArchitecturalViewManager.collection = projectObject.ArchitecturalViewManager.collection || {};
        return project;
    }

    _getNow() {
        const temp = new Date();
        const pad = (n) => n.toString().padStart(2, '0');
        return `${temp.getFullYear()}/${pad(temp.getMonth() + 1)}/${pad(temp.getDate())} - ${pad(temp.getHours())}:${pad(temp.getMinutes())}:${pad(temp.getSeconds())}`;
    }

    _getID() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    _updateTimestamp() {
        this.updated_at = this._getNow();
    }

    translateQualityAttributes(idList){
        return idList.map(id => this.QualityAttributes[id]).filter(item => item);
    }
    translateBusinessAtributes(idList){
        return idList.map(id => this.BusinessAttributes[id]).filter(item => item);
    }

    // Managers
    FunctionalRequirementManager = {
        collection: {},
        // 2. Método de adição alterado para não aceitar um objeto genérico.
        add: (functionalRequirement, measureMethod, acceptanceCriteria, importance, difficulty) => {
            const id = this._getID();
            this.FunctionalRequirementManager.collection[id] = {
                id,
                functionalRequirement,
                measureMethod,
                acceptanceCriteria,
                importance,
                difficulty
            };
            this._updateTimestamp();
            return this.FunctionalRequirementManager.collection[id];
        },
        delete: (id) => {
            delete this.FunctionalRequirementManager.collection[id];
            this._updateTimestamp();
        },
        update: (id, functionalRequirement, measureMethod, acceptanceCriteria, importance, difficulty) => {
            if (this.FunctionalRequirementManager.collection[id]) {
                this.FunctionalRequirementManager.collection[id] = { id, functionalRequirement, measureMethod, acceptanceCriteria, importance, difficulty };
                this._updateTimestamp();
                return this.FunctionalRequirementManager.collection[id];
            }
        },
        get: (id) => this.FunctionalRequirementManager.collection[id],
        getAll: () => Object.values(this.FunctionalRequirementManager.collection),
        getListById: (idList) => idList.map(id => this.FunctionalRequirementManager.get(id)).filter(item => item),
    };

    ArchitecturalRequirementManager = {
        collection: {},
        // 2. Método de adição alterado para não aceitar um objeto genérico.
        add: (architecturalRequirement, measureMethod, acceptanceCriteria, importance, difficulty, qualityAttributesIds, businessAttributesIds, architecturalScenariosIds) => {
            const id = this._getID();
            this.ArchitecturalRequirementManager.collection[id] = {
                id,
                architecturalRequirement,
                measureMethod,
                acceptanceCriteria,
                importance,
                difficulty,
                qualityAttributes: qualityAttributesIds || [],
                businessAttributes: businessAttributesIds || [],
                architecturalScenarios: architecturalScenariosIds || []
            };
            this._updateTimestamp();
            return this.ArchitecturalRequirementManager.collection[id];
        },
        delete: (id) => {
            delete this.ArchitecturalRequirementManager.collection[id];
            this._updateTimestamp();
        },
        update: (id, architecturalRequirement, measureMethod, acceptanceCriteria, importance, difficulty, qualityAttributes, businessAttributes, architecturalScenarios) => {
            if (this.ArchitecturalRequirementManager.collection[id]) {
                this.ArchitecturalRequirementManager.collection[id] = { ...this.ArchitecturalRequirementManager.collection[id], architecturalRequirement, measureMethod, acceptanceCriteria, importance, difficulty, qualityAttributes, businessAttributes, architecturalScenarios };
                this._updateTimestamp();
                return this.ArchitecturalRequirementManager.collection[id];
            }
        },
        get: (id) => this.ArchitecturalRequirementManager.collection[id],
        getAll: () => Object.values(this.ArchitecturalRequirementManager.collection),
        getListById: (idList) => idList.map(id => this.ArchitecturalRequirementManager.get(id)).filter(item => item),

        getQualityAttributesAssociated: (id) => {
            const req = this.ArchitecturalRequirementManager.get(id);
            if (!req || !req.qualityAttributes) return [];
            return req.qualityAttributes.map(attrId => this.QualityAttributes[attrId]).filter(item => item);
        },
        getBusinessAttributesAssociated: (id) => {
            const req = this.ArchitecturalRequirementManager.get(id);
            if (!req || !req.businessAttributes) return [];
            return req.businessAttributes.map(attrId => this.BusinessAttributes[attrId]).filter(item => item);
        },
        getArchitecturalScenariosAssociated: (id) => {
            const req = this.ArchitecturalRequirementManager.get(id);
            if (!req || !req.architecturalScenarios) return [];
            return this.ArchitecturalScenarioManager.getListById(req.architecturalScenarios);
        },
        getArchitecturalDecisionsAssociated: (id) => {
             return {
                favored: this.ArchitecturalDecisionManager.getAll().filter(decision => decision.favoredArchitecturalRequirements?.includes(id)) || [],
                harmed: this.ArchitecturalDecisionManager.getAll().filter(decision => decision.harmedArchitecturalRequirements?.includes(id)) || []
             }
        },
    };

    StakeholderManager = {
        collection: {},
        // 2. Método de adição alterado para não aceitar um objeto genérico.
        add: (name, interest) => {
            const id = this._getID();
            this.StakeholderManager.collection[id] = { id, name, interest };
            this._updateTimestamp();
            return this.StakeholderManager.collection[id];
        },
        delete: (id) => {
            delete this.StakeholderManager.collection[id];
            this._updateTimestamp();
        },
        update: (id, name, interest) => {
            if (this.StakeholderManager.collection[id]) {
                this.StakeholderManager.collection[id] = { ...this.StakeholderManager.collection[id], name, interest };
                this._updateTimestamp();
                return this.StakeholderManager.collection[id];
            }
        },
        get: (id) => this.StakeholderManager.collection[id],
        getAll: () => Object.values(this.StakeholderManager.collection),
        getListById: (idList) => idList.map(id => this.StakeholderManager.get(id)).filter(item => item),
    };

    ArchitecturalScenarioManager = {
        collection: {},
        // 2. Método de adição alterado para não aceitar um objeto genérico.
        add: (description, importance, qualityAttributes, businessAttributes) => {
            const id = this._getID();
            this.ArchitecturalScenarioManager.collection[id] = {
                id,
                description,
                importance,
                qualityAttributes: qualityAttributes || [],
                businessAttributes: businessAttributes || []
            };
            this._updateTimestamp();
            return this.ArchitecturalScenarioManager.collection[id];
        },
        delete: (id) => {
            delete this.ArchitecturalScenarioManager.collection[id];
            this._updateTimestamp();
        },
        update: (id, description, importance, qualityAttributes, businessAttributes) => {
            if (this.ArchitecturalScenarioManager.collection[id]) {
                this.ArchitecturalScenarioManager.collection[id] = { ...this.ArchitecturalScenarioManager.collection[id], description, importance, qualityAttributes, businessAttributes };
                this._updateTimestamp();
                return this.ArchitecturalScenarioManager.collection[id];
            }
        },
        get: (id) => this.ArchitecturalScenarioManager.collection[id],
        getAll: () => Object.values(this.ArchitecturalScenarioManager.collection),
        getListById: (idList) => idList.map(id => this.ArchitecturalScenarioManager.get(id)).filter(item => item),

        getQualityAttributesAssociated: (id) => {
            const scenario = this.ArchitecturalScenarioManager.get(id);
            if (!scenario || !scenario.qualityAttributes) return [];
            return scenario.qualityAttributes.map(attrId => this.QualityAttributes[attrId]).filter(item => item);
        },
        getBusinessAttributesAssociated: (id) => {
            const scenario = this.ArchitecturalScenarioManager.get(id);
            if (!scenario || !scenario.businessAttributes) return [];
            return scenario.businessAttributes.map(attrId => this.BusinessAttributes[attrId]).filter(item => item);
        },
        getArchitecturalRequirementsAssociated: (id) => {
             return this.ArchitecturalRequirementManager.getAll().filter(req => req.architecturalScenarios?.includes(id));
        },
    };

    ArchitecturalDecisionManager = {
        collection: {},
        // 2. Método de adição alterado para não aceitar um objeto genérico.
        add: (decision, favoredArchReqIds, harmedArchReqIds, favoredQualityAttrIds, harmedQualityAttrIds, favoredBusinessAttrIds, harmedBusinessAttrIds, alternative) => {
            const id = this._getID();
            this.ArchitecturalDecisionManager.collection[id] = {
                id,
                decision,
                favoredArchitecturalRequirements: favoredArchReqIds || [],
                harmedArchitecturalRequirements: harmedArchReqIds || [],
                favoredQualityAttributes: favoredQualityAttrIds || [],
                harmedQualityAttributes: harmedQualityAttrIds || [],
                favoredBusinessAttributes: favoredBusinessAttrIds || [],
                harmedBusinessAttributes: harmedBusinessAttrIds || [],
                alternative
            };
            this._updateTimestamp();
            return this.ArchitecturalDecisionManager.collection[id];
        },
        delete: (id) => {
            delete this.ArchitecturalDecisionManager.collection[id];
            this._updateTimestamp();
        },
        update: (id, decision, favoredArchitecturalRequirements, harmedArchitecturalRequirements, favoredQualityAttributes, harmedQualityAttributes, favoredBusinessAttributes, harmedBusinessAttributes, alternative) => {
            if (this.ArchitecturalDecisionManager.collection[id]) {
                this.ArchitecturalDecisionManager.collection[id] = { ...this.ArchitecturalDecisionManager.collection[id], decision, favoredArchitecturalRequirements, harmedArchitecturalRequirements, favoredQualityAttributes, harmedQualityAttributes, favoredBusinessAttributes, harmedBusinessAttributes, alternative };
                this._updateTimestamp();
                return this.ArchitecturalDecisionManager.collection[id];
            }
        },
        get: (id) => this.ArchitecturalDecisionManager.collection[id],
        getAll: () => Object.values(this.ArchitecturalDecisionManager.collection),
        getListById: (idList) => idList.map(id => this.ArchitecturalDecisionManager.get(id)).filter(item => item),

        getArchitecturalRequirementsAssociated: (id) => {
            const decision = this.ArchitecturalDecisionManager.get(id);
            if (!decision) return { favored: [], harmed: [] };
            return {
                favored: this.ArchitecturalRequirementManager.getListById(decision.favoredArchitecturalRequirements || []),
                harmed: this.ArchitecturalRequirementManager.getListById(decision.harmedArchitecturalRequirements || [])
            };
        },
        getQualityAttributesAssociated: (id) => {
            const decision = this.ArchitecturalDecisionManager.get(id);
             if (!decision) return { favored: [], harmed: [] };
            return {
                favored: (decision.favoredQualityAttributes || []).map(attrId => this.QualityAttributes[attrId]).filter(item => item),
                harmed: (decision.harmedQualityAttributes || []).map(attrId => this.QualityAttributes[attrId]).filter(item => item)
            };
        },
        getBusinessAttributesAssociated: (id) => {
             const decision = this.ArchitecturalDecisionManager.get(id);
             if (!decision) return { favored: [], harmed: [] };
            return {
                favored: (decision.favoredBusinessAttributes || []).map(attrId => this.BusinessAttributes[attrId]).filter(item => item),
                harmed: (decision.harmedBusinessAttributes || []).map(attrId => this.BusinessAttributes[attrId]).filter(item => item)
            };
        },
    };

    PointOfViewManager = {
        collection: {},
        add: (pointOfView, relatedQualityAttributesIds) => {
            const id = this._getID();
            this.PointOfViewManager.collection[id] = {
                id,
                pointOfView,
                relatedQualityAttributes: relatedQualityAttributesIds || []
            };
            this._updateTimestamp();
            return this.PointOfViewManager.collection[id];
        },
        delete: (id) => {
            delete this.PointOfViewManager.collection[id];
            this._updateTimestamp();
        },
        update: (id, pointOfView, relatedQualityAttributesIds) => {
            if (this.PointOfViewManager.collection[id]) {
                this.PointOfViewManager.collection[id] = { ...this.PointOfViewManager.collection[id], pointOfView, relatedQualityAttributes: relatedQualityAttributesIds };
                this._updateTimestamp();
                return this.PointOfViewManager.collection[id];
            }
        },
        get: (id) => this.PointOfViewManager.collection[id],
        getAll: () => Object.values(this.PointOfViewManager.collection),
        getListById: (idList) => idList.map(id => this.PointOfViewManager.get(id)).filter(item => item),
    };

    ArchitecturalViewManager = {
        collection: {},
        add: (architecturalView, relatedPointsOfViewIds) => {
            const id = this._getID();
            this.ArchitecturalViewManager.collection[id] = {
                id,
                architecturalView,
                relatedPointsOfView: relatedPointsOfViewIds || []
            };
            this._updateTimestamp();
            return this.ArchitecturalViewManager.collection[id];
        },
        delete: (id) => {
            delete this.ArchitecturalViewManager.collection[id];
            this._updateTimestamp();
        },
        get: (id) => this.ArchitecturalViewManager.collection[id],
        getAll: () => Object.values(this.ArchitecturalViewManager.collection),
        getListById: (idList) => idList.map(id => this.ArchitecturalViewManager.get(id)).filter(item => item),
    };
}

