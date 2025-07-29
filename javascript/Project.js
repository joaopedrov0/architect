class Project {
    constructor(name, author, id) {
        this.name = name;
        this.author = author;
        this.created_at = this._getNow();
        this.updated_at = this._getNow();
        this.id = id

        // Project Settings Manager (key:value structure)
        this.BusinessAttributes = {
  "1": "Aumento da Receita",
  "2": "Redução de Custos Operacionais",
  "3": "Aumento da Satisfação do Cliente",
  "4": "Expansão para Novos Mercados",
  "5": "Melhora na Eficiência dos Processos",
  "6": "Conformidade com Regulamentações (Compliance)",
  "7": "Aumento da Retenção de Clientes",
  "8": "Fortalecimento da Marca",
  "9": "Inovação em Produtos ou Serviços",
  "10": "Otimização da Tomada de Decisão"
}; // id: { id, name }
        this.QualityAttributes = {
  "1": "Adequação Funcional (ISO 25010 - Qualidade de Produto)",
  "2": "Completude Funcional (Sub-característica de Adequação Funcional)",
  "3": "Correção Funcional (Sub-característica de Adequação Funcional)",
  "4": "Apropriação Funcional (Sub-característica de Adequação Funcional)",
  "5": "Eficiência de Desempenho (ISO 25010 - Qualidade de Produto)",
  "6": "Comportamento em Relação ao Tempo (Sub-característica de Eficiência de Desempenho)",
  "7": "Utilização de Recursos (Sub-característica de Eficiência de Desempenho)",
  "8": "Capacidade (Sub-característica de Eficiência de Desempenho)",
  "9": "Compatibilidade (ISO 25010 - Qualidade de Produto)",
  "10": "Coexistência (Sub-característica de Compatibilidade)",
  "11": "Interoperabilidade (Sub-característica de Compatibilidade)",
  "12": "Usabilidade (ISO 25010 - Qualidade de Produto)",
  "13": "Reconhecimento de Adequação (Sub-característica de Usabilidade)",
  "14": "Aprendizagem (Sub-característica de Usabilidade)",
  "15": "Operabilidade (Sub-característica de Usabilidade)",
  "16": "Proteção Contra Erros do Usuário (Sub-característica de Usabilidade)",
  "17": "Estética da Interface (Sub-característica de Usabilidade)",
  "18": "Acessibilidade (Sub-característica de Usabilidade)",
  "19": "Confiabilidade (ISO 25010 - Qualidade de Produto)",
  "20": "Maturidade (Sub-característica de Confiabilidade)",
  "21": "Disponibilidade (Sub-característica de Confiabilidade)",
  "22": "Tolerância a Falhas (Sub-característica de Confiabilidade)",
  "23": "Recuperabilidade (Sub-característica de Confiabilidade)",
  "24": "Segurança (ISO 25010 - Qualidade de Produto)",
  "25": "Confidencialidade (Sub-característica de Segurança)",
  "26": "Integridade (Sub-característica de Segurança)",
  "27": "Não Repúdio (Sub-característica de Segurança)",
  "28": "Responsabilidade (Accountability) (Sub-característica de Segurança)",
  "29": "Autenticidade (Sub-característica de Segurança)",
  "30": "Manutenibilidade (ISO 25010 - Qualidade de Produto)",
  "31": "Modularidade (Sub-característica de Manutenibilidade)",
  "32": "Reusabilidade (Sub-característica de Manutenibilidade)",
  "33": "Analisabilidade (Sub-característica de Manutenibilidade)",
  "34": "Modificabilidade (Sub-característica de Manutenibilidade)",
  "35": "Testabilidade (Sub-característica de Manutenibilidade)",
  "36": "Portabilidade (ISO 25010 - Qualidade de Produto)",
  "37": "Adaptabilidade (Sub-característica de Portabilidade)",
  "38": "Instalabilidade (Sub-característica de Portabilidade)",
  "39": "Substituibilidade (Sub-característica de Portabilidade)",
  "40": "Efetividade (ISO 25010 - Qualidade em Uso)",
  "41": "Eficiência (ISO 25010 - Qualidade em Uso)",
  "42": "Satisfação (ISO 25010 - Qualidade em Uso)",
  "43": "Ausência de Risco (ISO 25010 - Qualidade em Uso)",
  "44": "Mitigação de Risco Econômico (Sub-característica de Ausência de Risco)",
  "45": "Mitigação de Risco à Saúde e Segurança (Sub-característica de Ausência de Risco)",
  "46": "Mitigação de Risco Ambiental (Sub-característica de Ausência de Risco)",
  "47": "Cobertura de Contexto (ISO 25010 - Qualidade em Uso)",
  "48": "Completude de Contexto (Sub-característica de Cobertura de Contexto)",
  "49": "Flexibilidade (Sub-característica de Cobertura de Contexto)"
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

