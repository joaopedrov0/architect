class PageBuilder {

    static Basics = {
        /**
         * Cria um elemento HTML genérico.
         * @param {string} tag - A tag HTML (ex: 'div', 'span').
         * @param {string[]} classList - Uma lista de classes CSS.
         * @param {Object} attributes - Um objeto com atributos (ex: { style: "color:red;" }).
         * @param {string} children - O conteúdo HTML interno.
         * @returns {string} O elemento HTML como string.
         */
        BasicElement: (tag, classList, attributes, children) => {
            let temp_att = '';
            if (attributes) {
                for (let att in attributes) {
                    temp_att += ` ${att}="${attributes[att]}"`;
                }
            }
            return `<${tag} ${temp_att} class="${classList.join(' ')}">${children}</${tag}>`;
        },

        /**
         * Cria um componente Modal do Bootstrap.
         * @param {string} id - O ID do modal.
         * @param {string} title - O título do modal.
         * @param {string} bodyChildren - O conteúdo HTML do corpo do modal.
         * @param {string} [footerChildren] - O conteúdo HTML do rodapé. Se nulo, usa botões padrão.
         * @returns {string} O HTML do modal.
         */
        ModalElement: (id, title, bodyChildren, footerChildren) => {
            footerChildren = footerChildren || `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary">Salvar</button>
            `;
            return `
            <div class="modal fade" tabindex="-1" id="${id}" aria-labelledby="${id}Label" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="${id}Label">${title}</h5>
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
            </div>`;
        },

        ModalButton: (id, text, classList) => {
//             <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
//   Launch demo modal
//         </button>
        },
        ModalDismissButton: (classListString='') => {
            return `<button type="button" class="btn btn-secondary ${classListString}" data-bs-dismiss="modal">Fechar</button>`
        },

        Icon: (idClass, sizeClass) => {
            return `<i class="bi ${idClass} ${sizeClass}"></i>`
        },

        /**
         * Cria um componente Toast (notificação) do Bootstrap.
         * @param {string} id - O ID do toast.
         * @param {string} title - O título do toast.
         * @param {string} children - O conteúdo do corpo do toast.
         * @param {string} [timestamp] - Texto para o tempo (ex: 'agora mesmo').
         * @returns {string} O HTML do toast.
         */
        ToastElement: (id, title, children, timestamp = 'agora mesmo') => {
            return `
            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" id="${id}">
              <div class="toast-header">
                <strong class="me-auto">${title}</strong>
                <small>${timestamp}</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
              <div class="toast-body">
                ${children}
              </div>
            </div>`;
        },
    }

    static Layout = {
        /**
         * Cria uma linha do grid do Bootstrap.
         * @param {string} children - Conteúdo HTML das colunas.
         * @param {string[]} [extraClasses] - Classes adicionais para a linha.
         * @returns {string} O HTML da linha.
         */
        Row: (children, extraClasses = []) => {
            return `<div class="row ${extraClasses.join(' ')}">${children}</div>`;
        },
        /**
         * Cria uma coluna do grid do Bootstrap.
         * @param {string[]} sizeClasses - Classes de tamanho da coluna (ex: ['col-md-6', 'col-12']).
         * @param {string} children - Conteúdo HTML da coluna.
         * @returns {string} O HTML da coluna.
         */
        Col: (sizeClasses, children) => {
            return `<div class="${sizeClasses.join(' ')}">${children}</div>`;
        }
    }

    static Artifact = {
        /**
         * Cria um par de label e dado para exibição.
         * @param {string} label - O texto do label (em negrito).
         * @param {string} data - O dado a ser exibido.
         * @returns {string} O HTML do campo de texto.
         */
        TextData: (label, data) => {
            return `
            <div class="mb-2">
                <strong class="text-muted">${label}:</strong>
                <p class="mb-0">${data || 'Não informado'}</p>
            </div>`;
        }
    }

    static Card = {
        /**
         * Cria um card básico do Bootstrap.
         * @param {string} title - O título do card.
         * @param {string} children - O conteúdo do corpo do card.
         * @param {string} [footer] - Opcional, conteúdo do rodapé do card.
         * @returns {string} O HTML do card.
         */
        Basic: (title, children, footer = '') => {
            const footerHtml = footer ? `<div class="card-footer">${footer}</div>` : '';
            return `
            <div class="card mb-4">
                <div class="card-header">
                    <h5 class="card-title mb-0">${title}</h5>
                </div>
                <div class="card-body">
                    ${children}
                </div>
                ${footerHtml}
            </div>`;
        }
    }
    
    static Button = {
         /**
         * Cria um botão do Bootstrap.
         * @param {string} text - O texto do botão.
         * @param {string} style - Estilo do botão (ex: 'primary', 'secondary', 'danger').
         * @param {Object} [attributes] - Atributos adicionais (ex: {'data-bs-toggle': 'modal'}).
         * @returns {string} O HTML do botão.
         */
        Basic: (text, style, attributes = {}) => {
            let attrs = '';
            for (const key in attributes) {
                attrs += ` ${key}="${attributes[key]}"`;
            }
            return `<button type="button" class="btn btn-${style}"${attrs}>${text}</button>`;
        },
        ArchitectBtn: (text, classListString='', tag='div', attributes) => {
            let temp_att = '';
            if (attributes) {
                for (let att in attributes) {
                    temp_att += ` ${att}="${attributes[att]}"`;
                }
            }
            return `<${tag} class="btn architect-btn ${classListString}" ${temp_att}><span>${text}</span></${tag}>`
        },
        LightArchitectBtn: (text, classListString='', tag='div', attributes) => {
            let temp_att = '';
            if (attributes) {
                for (let att in attributes) {
                    temp_att += ` ${att}="${attributes[att]}"`;
                }
            }
            return `<${tag} class="btn light-architect-btn ${classListString}" ${temp_att}><span>${text}</span></${tag}>`
        },
    }

    static Form = {
        /**
         * Cria um campo de input de texto para formulários.
         * @param {string} id - O ID do input.
         * @param {string} label - O label do campo.
         * @param {string} formName - O atributo 'name' para o formulário.
         * @param {string} [placeholder] - O placeholder do campo.
         * @returns {string} O HTML do campo de input.
         */
        TextInput: (id, label, formName, placeholder = '') => {
            return `
            <div class="mb-3">
                <label for="${id}" class="form-label">${label}</label>
                <input type="text" class="form-control" id="${id}" name="${formName}" placeholder="${placeholder}">
            </div>`;
        },

        /**
         * Cria um grupo de checkboxes.
         * @param {string} label - Label para o grupo de checkboxes.
         * @param {string} formName - O 'name' comum para os checkboxes.
         * @param {Object[]} options - Array de opções, ex: [{ id: 'opt1', value: 'val1', text: 'Opção 1' }].
         * @returns {string} O HTML do grupo de checkboxes.
         */
        CheckBox: (label, formName, options) => {
            const optionsHtml = options.map(opt => `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${opt.value}" id="${opt.id}" name="${formName}">
                    <label class="form-check-label" for="${opt.id}">
                        ${opt.text}
                    </label>
                </div>`).join('');
            return `<div class="mb-3"><label class="form-label">${label}</label>${optionsHtml}</div>`;
        },

        /**
         * Cria um campo de seleção (select).
         * @param {string} id - O ID do select.
         * @param {string} label - O label do campo.
         * @param {string} formName - O atributo 'name' para o select.
         * @param {Object[]} options - Array de opções, ex: [{ value: 'val1', text: 'Opção 1' }].
         * @param {string} [placeholder] - Texto para a primeira opção desabilitada.
         * @returns {string} O HTML do campo select.
         */
        Select: (id, label, formName, options, placeholder = 'Selecione...') => {
            const optionsHtml = options.map(opt => `<option value="${opt.value}">${opt.text}</option>`).join('');
            return `
            <div class="mb-3">
                <label for="${id}" class="form-label">${label}</label>
                <select class="form-select" id="${id}" name="${formName}">
                    <option selected disabled value="">${placeholder}</option>
                    ${optionsHtml}
                </select>
            </div>`;
        },

        /**
         * Cria um container para formulário de adição.
         * @param {string} formId - O ID do formulário.
         * @param {string} title - O título do formulário.
         * @param {string} formChildren - O conteúdo HTML com os campos do formulário.
         * @returns {string} O HTML do container do formulário.
         */
        ArtifactAddFormContainer: (formId, title, formChildren) => {
            return `
            <div>
                <h4>${title}</h4>
                <form id="${formId}">${formChildren}</form>
            </div>`;
        },
        
        /**
         * Cria um container para formulário de edição.
         * @param {string} formId - O ID do formulário.
         * @param {string} title - O título do formulário.
         * @param {string} formChildren - O conteúdo HTML com os campos do formulário.
         * @returns {string} O HTML do container do formulário.
         */
        ArtifactEditFormContainer: (formId, title, formChildren) => {
            return `
            <div>
                <h4>${title}</h4>
                <form id="${formId}">${formChildren}</form>
            </div>`;
        },
    }

    static Table = {
        /**
         * Cria uma tabela básica do Bootstrap.
         * @param {string[]} headers - Array com os textos do cabeçalho.
         * @param {string[][]} rows - Array de arrays, onde cada array interno é uma linha de dados (células).
         * @returns {string} O HTML da tabela.
         */
        Basic: (headers, rows) => {
            const headerHtml = `<thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>`;
            const bodyHtml = `<tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>`;

            return `<div class="table-responsive"><table class="table table-striped table-hover">${headerHtml}${bodyHtml}</table></div>`;
        }
    }

    static Component = {
        FunctionalRequirement: () => {},
        ArchitecturalRequirement: () => {},
        Stakeholder: () => {},
        ArchitecturalScenario: () => {},
        ArchitecturalDecision: () => {},
        PointOfView: () => {},
        ArchitecturalView: () => {},

        ArtifactGroup: (id, title, artifactList, counter) => {

            const counterElement = PageBuilder.Basics.BasicElement('span', ['artifact-counter'], {}, `Criados: ${counter}`)

            let artifactListHTML = ''

            for (let artifact of artifactList){
                artifactListHTML += PageBuilder.Basics.BasicElement('li', ['list-group-item'], {}, artifact)
            }

            let html = `
            <div class="col-12 d-grid">
              <button class="btn settings-btn" type="button" data-bs-toggle="collapse"
                data-bs-target="#${id}" aria-expanded="false" aria-controls="${id}">
                <h3 class="text-lg-center">${title}</h3>
                <i class="bi bi-chevron-down"></i>
                ${counterElement}
              </button>
              <div class="collapse" id="${id}">
                <ul class="list-group list-group-flush artifact-list">
                  ${artifactListHTML}
                  <button class="btn architect-btn p-4" type="button"><span>Editar</span></button>
                </ul>
              </div>
            </div>
            `

            return html
        },

        ProjectAddFormContainer: (formId, formChildren) => {
            return `
            <div>
                <form id="${formId}">${formChildren}</form>
            </div>`;
        }
    }
}


// Exemplo de uso combinado dos novos componentes:
// const myForm = PageBuilder.Form.ArtifactAddFormContainer(
//     'add-req-form',
//     'Adicionar Requisito',
//     PageBuilder.Form.TextInput('req-name', 'Nome do Requisito', 'req_name', 'Ex: O sistema deve...') +
//     PageBuilder.Form.Select('req-prio', 'Prioridade', 'req_prio', [
//         {value: 'high', text: 'Alta'},
//         {value: 'medium', text: 'Média'},
//         {value: 'low', text: 'Baixa'}
//     ])
// );

// const myCard = PageBuilder.Card.Basic(
//     'Gerenciamento de Requisitos',
//     Page-builder.Table.Basic(
//         ['ID', 'Requisito', 'Ações'],
//         [
//             ['RF01', 'O sistema deve fazer X.', PageBuilder.Button.Basic('Editar', 'secondary')],
//             ['RF02', 'O sistema deve fazer Y.', PageBuilder.Button.Basic('Editar', 'secondary')]
//         ]
//     ),
//     PageBuilder.Button.Basic('Adicionar Novo', 'primary', {'data-bs-toggle': 'modal', 'data-bs-target': '#addReqModal'})
// );


// const myLayout = PageBuilder.Layout.Row(
//     PageBuilder.Layout.Col(['col-12'], myCard)
// );

// console.log(myLayout)