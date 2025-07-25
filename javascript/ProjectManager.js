// import { PageBuilder } from './PageBuilder.js';
// import { Project } from './Project.js';
// import { Render } from './Render.js';
// import { StorageManager } from './StorageManager.js';

// Get a id to current project by storage
const project = StorageManager.getCurrentProject()

const projectName = document.querySelector('h1')
projectName.innerText = project.name

const settingsArea = document.querySelector('#')