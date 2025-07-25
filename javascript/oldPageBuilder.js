export class PageBuilder {

    static Basics = {
        BasicElement: (tag, classList, attributes, children) => {
            let temp_att = ''
            if (attributes){
                for(let att in attributes){
                    temp_att += ` ${att}="${attributes[att]}"`
                }
            }
            return `<${tag} ${temp_att} class="${classList.join(' ')}">${children}</${tag}>`
        },
        ModalElement: (id, title, bodyChildren, footerChildren) => {
            footerChildren = footerChildren || `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
            `
            let html = `
            <div class="modal" tabindex="-1" id="${id}">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${bodyChildren}
                    </div>
                    <div class="modal-footer">
                        ${footerChildren}
                    </div>
                    </div>
                </div>
            </div>
            `
        },
        ToastElement: (id, children) => {},
    }

    static Artifact = {
        TextData: (label, data) => {}
    }

    static Form = {
        TextInput: (id, label, formName, placeholder) => {},
        CheckBox: (id, label, formName, options) => {},
        Select: (id, label, formName, options, placeholder) => {},
        ArtifactAddFormContainer: () => {},
        ArtifactEditFormContainer: () => {},
    }

    static Component = {}

}

// console.log(
//     PageBuilder.Basics.BasicElement(
//         'div', 
//         [
//             'col-md-5', 
//             'col-12', 'md-3'
//         ], 
//         {
//             "style": "color:red;",
//         },
//     PageBuilder.Basics.BasicElement(
//         'span', 
//         [
//             'text-lg-center'
//         ], 
//         {
//             "style": "color:blue;",
//         }, 
//         "Hello World"
//     ))
// )
