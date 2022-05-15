// Importando biblioteca do cypress, precisamos usar o cyref.

/// <reference types="cypress" />

const perfil = require('../fixtures/perfil.json') 
// Para importar dados externos usamos esse código.
// Agora no arquivo 'login.spec.js' importar esse arquivo 'perfil.json' para poder funcionar os dados por meio do arquivo com a massa. 

context('Funcionalidade login', () => {

// context é um bloco de função.
// it são os cenários de testes, e ficam agrupados na funcionalidade login.

  beforeEach(() => { // beforeEach: significa 'antes de cada' teste
    cy.visit('minha-conta') // Com o uso do beforeEach, não precisa passar dentro de cada it o cy.visit. Dessa forma escrevemos menos código.
  })

  afterEach(() => {
    cy.screenshot() // afterEach: significa 'depois de cada' teste
  })

  it('Deve fazer login com sucesso', () => {
    
    cy.get('#username').type('aluno_ebac@teste.com') //.type é um método
    cy.get('#password').type('teste@teste.com')
    cy.get('.woocommerce-form > .button').click() //.click é um método
    
    cy.get('.page-title').should('contain', 'Minha conta')
    // cy.get('.page-title').contains('MINHA CONTA', { matchCase: false })
    // Esse exemplo usando o método contains não seria uma asserção.

    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac (não é aluno_ebac? Sair)')

  })

  it.only('Deve fazer login com sucesso - Usando arquivo de dados', () => {
    cy.get('#username').type(perfil.usuario)
    cy.get('#password').type(perfil.senha)
    cy.get('.woocommerce-form > .button').click() 
    
    cy.get('.page-title').should('contain', 'Minha conta')
    
  })

  it('Deve fazer login com sucesso - Usando fixture', () => {
    cy.fixture('perfil.json').then(dados => {
      cy.get('#username').type(dados.usuario)
      cy.get('#password').type(dados.senha) // {log: false} Garante que não seja apresentado dados sensíveis (senha) na execução do teste. 
      cy.get('.woocommerce-form > .button').click() 
      
      cy.get('.page-title').should('contain', 'Minha conta')

    })
  })

  it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
    
    cy.get('#username').type('userinvalido@teste.com')
    cy.get('#password').type('teste@teste.com')
    cy.get('.woocommerce-form > .button').click()

    cy.get('.woocommerce-error > li').should('contain', 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
    
  })
  it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
    
    cy.get('#username').type('aluno_ebac@teste.com')
    cy.get('#password').type('senhainvalida@teste.com')
    cy.get('.woocommerce-form > .button').click()

    cy.get('.woocommerce-error > li').should('contain','Erro: A senha fornecida para o e-mail aluno_ebac@teste.com está incorreta. Perdeu a senha?')
    
  })

})
