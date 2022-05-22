

describe('Central de Atendimento ao Cliente TAT', function() {
beforeEach (function () {
    cy.visit('http://127.0.0.1:5500/src/index.html')
})

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Thaynara')
        cy.get('#lastName').type('Dutra')
        cy.get('#email').type('thaynaracdutra@outlook.com')
        cy.get('#open-text-area').type('There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.', { delay: 0 })
       // cy.get('.button[type="submit"]').click() 
        cy.contains('.button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',()=> {
        cy.get('#firstName').type('Thaynara')
        cy.get('#lastName').type('Dutra')
        cy.get('#email').type('thaynaracdutra.utlook.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('.button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('se valor do campo telefone não for numérico o mesmo deve continuar em branco', ()=> {
        cy.get('#phone').type('ABCD')
        cy.get('#phone').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=> {
        cy.get('#firstName').type('Thaynara')
        cy.get('#lastName').type('Dutra')
        cy.get('#email').type('thaynaracdutra@outlook.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.get('.button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
    
    it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=> {
        cy.get('#firstName').type('Thaynara').should('have.value', 'Thaynara')
        cy.get('#lastName').type('Dutra').should('have.value', 'Dutra')
        cy.get('#email').type('thaynaracdutra@outlook.com').should('have.value', 'thaynaracdutra@outlook.com')
        cy.get('#phone').type('12345678').should('have.value', '12345678')

        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#phone').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=> {
        cy.get('.button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', ()=> {
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('seleciona um produto (YouTube) por seu texto', ()=> {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor', ()=> {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })
    
    it('seleciona um produto (Blog) por seu indice', ()=> {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', ()=> {
        cy.get(':nth-child(4) > input').check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', ()=> {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos os checkboxes, depois desmarca o ultimo', ()=> {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
     })

     it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio', ()=> {
        cy.get('#firstName').type('Thaynara')
        cy.get('#lastName').type('Dutra')
        cy.get('#email').type('thaynaracdutra@outlook.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.get('.button[type="submit"]').click()

        cy.get('.error').should('be.visible')
     })

     it('seleciona um arquivo da pasta fixtures', ()=> {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
     })

     it('seleciona um arquivo simulando drag-and-drop', ()=> {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
})
    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=> {
        cy.fixture('example.json').as('sampleFile')
        
        cy.get('input[type="file"]').selectFile('@sampleFile')
    
            
            .should(function($input) {
                expect($input[0].files[0].name).to.eq('example.json')
 
    })
})

    it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a').should('have.attr', 'target', '_blank')
    });
    
    it('acessa a página da politica de privacidade removendo o target e então clicando no link', () => {
        cy.get('a').invoke('removeAttr', 'target').click()
    });

    it.only('testa a página da política de privacidade de forma independente', () => {
        cy.get('a').click()
        
    });
})

