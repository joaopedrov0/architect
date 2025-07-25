class Render {
    constructor(projectInstance) {
        this.project = projectInstance;
    }

    /**
     * Estrutura de dados final em 'this.functionalRequirementData':
     * [
     * { id, functionalRequirement, acceptanceCriteria, importance, difficulty },
     * ...
     * ]
     */
    FunctionalRequirementPage() {
        this.functionalRequirementData = this.project.FunctionalRequirementManager.getAll();
    }

    /**
     * Estrutura de dados final em 'this.architecturalRequirementData':
     * [
     * {
     * id, architecturalRequirement, measureMethod, ...,
     * relatedQualityAttributes: [ { id, name }, ... ],
     * relatedBusinessAttributes: [ { id, name }, ... ],
     * relatedArchitecturalScenarios: [ { id, description, ... }, ... ],
     * relatedArchitecturalDecisions: [ { id, decision, ..., status: 'favored' | 'harmed' }, ... ]
     * },
     * ...
     * ]
     */
    ArchitecturalRequirementPage() {
        const allArchReqs = this.project.ArchitecturalRequirementManager.getAll();

        this.architecturalRequirementData = allArchReqs.map(req => {
            const decisions = this.project.ArchitecturalDecisionManager.getAll();
            const relatedDecisions = decisions
                .map(decision => {
                    if (decision.favoredArchitecturalRequirements?.includes(req.id)) {
                        return { ...decision, status: 'favored' };
                    }
                    if (decision.harmedArchitecturalRequirements?.includes(req.id)) {
                        return { ...decision, status: 'harmed' };
                    }
                    return null;
                })
                .filter(item => item);

            return {
                ...req,
                relatedQualityAttributes: this.project.ArchitecturalRequirementManager.getQualityAttributesAssociated(req.id),
                relatedBusinessAttributes: this.project.ArchitecturalRequirementManager.getBusinessAttributesAssociated(req.id),
                relatedArchitecturalScenarios: this.project.ArchitecturalRequirementManager.getArchitecturalScenariosAssociated(req.id),
                relatedArchitecturalDecisions: relatedDecisions,
            };
        });
    }

    /**
     * Estrutura de dados final em 'this.stakeholderData':
     * [
     * {
     * id, name, interest,
     * relatedScenarios: [ { id, description, ... }, ... ]
     * },
     * ...
     * ]
     */
    StakeholderPage() {
         const allStakeholders = this.project.StakeholderManager.getAll();
         const allScenarios = this.project.ArchitecturalScenarioManager.getAll();

         this.stakeholderData = allStakeholders.map(sh => {
            const relatedScenarios = allScenarios.filter(sc => sc.stakeholderId === sh.id); // Assumes 'stakeholderId' exists in scenario
            return {
                ...sh,
                relatedScenarios: relatedScenarios
            }
         });
    }

    /**
     * Estrutura de dados final em 'this.architecturalScenarioData':
     * [
     * {
     * id, description, importance, ...,
     * relatedQualityAttributes: [ { id, name }, ... ],
     * relatedBusinessAttributes: [ { id, name }, ... ],
     * relatedArchitecturalRequirements: [ { id, architecturalRequirement, ... }, ... ]
     * },
     * ...
     * ]
     */
    ArchitecturalScenarioPage() {
        const allScenarios = this.project.ArchitecturalScenarioManager.getAll();

        this.architecturalScenarioData = allScenarios.map(scenario => {
            return {
                ...scenario,
                relatedQualityAttributes: this.project.ArchitecturalScenarioManager.getQualityAttributesAssociated(scenario.id),
                relatedBusinessAttributes: this.project.ArchitecturalScenarioManager.getBusinessAttributesAssociated(scenario.id),
                relatedArchitecturalRequirements: this.project.ArchitecturalScenarioManager.getArchitecturalRequirementsAssociated(scenario.id),
            }
        });
    }

    /**
     * Estrutura de dados final em 'this.architecturalDecisionData':
     * [
     * {
     * id, decision, alternative, ...,
     * architecturalRequirements: { favored: [ { id, ... } ], harmed: [ { id, ... } ] },
     * qualityAttributes: { favored: [ { id, name } ], harmed: [ { id, name } ] },
     * businessAttributes: { favored: [ { id, name } ], harmed: [ { id, name } ] }
     * },
     * ...
     * ]
     */
    ArchitecturalDecisionPage() {
        const allDecisions = this.project.ArchitecturalDecisionManager.getAll();

        this.architecturalDecisionData = allDecisions.map(decision => {
            return {
                ...decision,
                architecturalRequirements: this.project.ArchitecturalDecisionManager.getArchitecturalRequirementsAssociated(decision.id),
                qualityAttributes: this.project.ArchitecturalDecisionManager.getQualityAttributesAssociated(decision.id),
                businessAttributes: this.project.ArchitecturalDecisionManager.getBusinessAttributesAssociated(decision.id),
            }
        });
    }

    /**
     * Estrutura de dados final em 'this.pointOfViewData':
     * [
     * {
     * id, pointOfView, ...,
     * relatedQualityAttributes: [ { id, name }, ... ],
     * relatedArchitecturalViews: [ { id, architecturalView, ... }, ... ]
     * },
     * ...
     * ]
     */
    PointOfViewPage(){
        const allPointsOfView = this.project.PointOfViewManager.getAll();

        this.pointOfViewData = allPointsOfView.map(pov => {
            const relatedQualityAttributes = (pov.relatedQualityAttributes || []).map(id => this.project.QualityAttributes[id]).filter(item => item);
            const relatedViews = this.project.ArchitecturalViewManager.getAll().filter(view => view.relatedPointsOfView?.includes(pov.id));

            return {
                ...pov,
                relatedQualityAttributes,
                relatedArchitecturalViews: relatedViews,
            }
        });
    }

    /**
     * Estrutura de dados final em 'this.architecturalViewData':
     * [
     * {
     * id, architecturalView, ...,
     * relatedPointsOfView: [ { id, pointOfView, ... }, ... ]
     * },
     * ...
     * ]
     */
    ArchitecturalViewPage(){
        const allViews = this.project.ArchitecturalViewManager.getAll();

        this.architecturalViewData = allViews.map(view => {
            // Assumes view object has 'relatedPointsOfView' which is an array of IDs
            const relatedPointsOfView = this.project.PointOfViewManager.getListById(view.relatedPointsOfView || []);
            return {
                ...view,
                relatedPointsOfView,
            }
        });
    }
}