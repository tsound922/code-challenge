/// <reference types="cypress" />

context('Cart Actions', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Test: Demo testing case', () => {

    cy.contains('Welcome');

  })

  it('Test: Add items to cart', () => {

    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=badge-count]').should('have.text', '2');

  })
  
  /*
    Test clear cart item button and its function 
  */
  it('Test: Clear cart', () => {
    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();
    cy.get('.cart-dialog-right').click();
    cy.get('.remove-cart').click();
    cy.get('.sc-dlfnbm > p ').should('have.text', 'No items in cart.')
    cy.get('[data-cy=badge-count]').should('have.text', '0')
  })


  /*
    Test: add two new item in cart then process payment
    After click button Cart, the data will store in server/data/historyPurchases.json at index 0

  */
    it('Test: Add two items into cart and process the payment', () => {

      cy.get('[data-cy=add-to-cart-2]').click();
      cy.get('[data-cy=add-to-cart-3]').click();
      cy.get('[data-cy=badge-count]').should('have.text', '2');
      cy.get('.cart-dialog-right').click();
      cy.get('.process-payment').click();
      cy.get('.sc-dlfnbm > p ').should('have.text', 'No items in cart.');
      cy.get('[data-cy=badge-count]').should('have.text', '0')
  
    })

  /*
    Test: check Server side Payment function
    Test post request to server and check the response would be necessary. 
    If I have more time I would like to check Cypress document to know more 
    about backend testing.
  */
    it('Test: Cart items are stored in Server side', () => {
      const data = {
        "id": 2,
        "date": "2022-04-11T13:40:15.729Z",
        "total": "513.60",
        "cartItem": [
          {
            "id": 2,
            "title": "ABBAYE DU MONT DES CATS",
            "price": 29.21,
            "description": "The Abbaye du Mont des Cats cheese is made by monks in a monastery of the same name in the town of Godewaersvelde, in Northern France. Cow's milk from local farms is used and the milk is gently pasteurised for cheese production. The maturation process takes about 4 to 5 weeks",
            "category": "semi-soft, artisan, brined",
            "image": "https://www.cheese.com/media/img/cheese/Mont_des_Cats_kaas.jpg",
            "amount": 5
          },
          {
            "id": 3,
            "title": "ADELOST",
            "price": 367.55,
            "description": "Adelost is a Swedish blue cheese made from cow's milk. The blue-grey veins running throughout are a distinctive feature of the cheese. It has a sharp, salty and tangy flavour. The ripening process is for two to three months. The cheese comes in a drum shape with a rind of pale cream, which is lightly dotted with moulds.",
            "category": "semi-soft, blue-veined",
            "image": "https://www.cheese.com/media/img/cheese/Adelost_QnxYLx6.jpg",
            "amount": 1
          }
        ]
      }
      cy.request('POST', 'http://localhost:3000/api/cheeses', data).then(
        (response) => {
          expect(response.status).to.eq(200)
          expect(response.body.Message).to.eq("Data Successfully Stored!");
        }
      )
    })
})
  

/*
  If I have more time I would like to do both Backend and UI test for Feature #2. 
  The plan is to check the data retrive from 'server/data/historyPurchases.json' will 
  match with the information from Frontend.
  In addition I consider I should care about User behaviours as I know I did not
  provide a confirm component when processing Purchase function
  I would also like to spend more time on layout arrange

*/