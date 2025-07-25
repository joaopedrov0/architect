class StorageManager {
    // Manage multiple projects in localStorage
    static getProjects() {
        const projects = localStorage.getItem('projects');
        return projects ? JSON.parse(projects) : [];
    }
    static updateProjects(projects){
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    static addProject(project){
        const projects = StorageManager.getProjects();
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    static saveProject(project){
        const projects = StorageManager.getProjects();
        for(let index in projects){
            if (project.id === projects[index].id){
                projects[index] = project;
                console.log("Project saved")
                console.dir(`index: ${index}, project: ${project}`)
                break;
            }
        }
        this.updateProjects(projects);
    }

    static setCurrentProject(id){
        localStorage.setItem('currentProject', id);
    }

    static getCurrentProjectId(){
        return localStorage.getItem('currentProject');
    }

    static getCurrentProject(){
        const projects = this.getProjects();
        const currentProject = this.getCurrentProjectId()
        for(let item of projects){
            if (currentProject === item.id){
                return item;
            }
        }
    }
}