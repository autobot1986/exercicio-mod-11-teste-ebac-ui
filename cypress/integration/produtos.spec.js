/// <reference types="cypress" />

describe("Funcionalidade Página de Produtos", () => {
  beforeEach(() => {
    cy.visit('produtos')
  })

  it('Deve selecionar um produto da lista', () => {
    // ID usa #
    // CLASSE usa .
    cy.get('[class="product-block grid"]')
      //.first() // first pega o primeiro item de uma lista
      //.last() // last pega o primeiro item de uma lista
      //.eq(3) // Para pegar um elemento que não seja o primeiro e nem p último, usamos o eq(número da posição da lista). Exemplo: .eq(3)
      .contains('Ariel Roll Sleeve Sweatshirt') // contains podemos pegar um elemento pelo seu nome
      .click()

    // Outra forma que poderia ter sido utilizada para encontra o elemento:
    //cy.get('div[data-product-id="2559"]').first().click()
  })

  it('Deve adicionar um produto ao carrinho', () => {

    let quantidade = 2

    cy.get('[class="product-block grid"]')
      .contains('Ariel Roll Sleeve Sweatshirt')
      .click()

    cy.get('.button-variable-item-L').click()
    cy.get('.button-variable-item-Green').click()
    cy.get('.input-text')
      .clear() // O campo por default vem com o valor 1. Então deve ser limpo para depois receber o valor.
      .type(quantidade)
    cy.get('.single_add_to_cart_button').click()

    cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
    cy.get('.woocommerce-message').should('contain', quantidade + ' × “Ariel Roll Sleeve Sweatshirt” foram adicionados no seu carrinho.')
  })
})
