import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/PageManager';
import { faker } from '@faker-js/faker';

const email = 'rrr111@test.com'
const password = 'Rahmani13!'
const username = 'rrr111'

const randomFullName = faker.person.fullName()
const randomCardCreditNumber = faker.finance.creditCardNumber()
const randomMonth = faker.date.month()
const randomYear =faker.date.birthdate().getFullYear().toString()
const randomCVC = faker.finance.creditCardCVV()
const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
const randomReview = faker.lorem.words(5)

test.beforeEach(async({page})=>{
  await page.goto('https://automationexercise.com/')
  const pm = new PageManager(page)
  await pm.navigationPage.acceptConsent()
})

test('products details', async({page})=>{
  const pm = new PageManager(page)
  await pm.navigationPage.goToSignUpLoginPage()
  await pm.loginPage.submitLoginFormWithEmailAndPassword(email, password)

  await pm.navigationPage.goToProductsPage()
  await pm.productPage.viewProductButton.click()
  await page.waitForTimeout(2000)
  
  await expect(pm.productPage.productName).toBeVisible()
  await expect(pm.productPage.productCategory).toBeVisible()
  await expect(pm.productPage.productPrice).toBeVisible()
  await expect(pm.productPage.productAvailability).toBeVisible()
  await expect(pm.productPage.productCondition).toBeVisible()
  await expect(pm.productPage.productBrand).toBeVisible()
  })

test('search products', async({page})=>{
    test.setTimeout(120000);
    const pm = new PageManager(page)
    await pm.navigationPage.goToProductsPage()

    await pm.productPage.searchOverEveryProduct()

    await pm.productPage.submitSearchButton.click()
    
})

test('add products to shopping cart', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigationPage.goToProductsPage()

    await pm.productPage.addProductToCartandViewTheCart('1')
    await pm.navigationPage.goToProductsPage()

    await pm.productPage.addProductToCartandViewTheCart('2')

    await expect(pm.shoppingCartPage.tableNameProduct('1')).toBeVisible()
    await expect(pm.shoppingCartPage.tableCategoryProduct('1')).toBeVisible()
    await expect(pm.shoppingCartPage.tablePriceProduct('1')).toBeVisible()
    await expect(pm.shoppingCartPage.tableQuantityProduct('1')).toBeVisible()
    await expect(pm.shoppingCartPage.tableTotalPriceProduct('1')).toBeVisible()
})

test('modify quantity in cart', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigationPage.goToProductsPage()

    await pm.productPage.viewProductButton.click()
    await page.waitForTimeout(2000)

    await pm.productPage.quantityInput.fill('')
    await pm.productPage.quantityInput.fill('4')
    await pm.productPage.buttonForAddingToCartInTheProductPage.click()
    await pm.productPage.viewCartButton.click()
    await expect(pm.shoppingCartPage.tableQuantityProduct('1')).toBeVisible()
    await expect(pm.shoppingCartPage.tableTotalPriceProduct('1')).toBeVisible()

})

test('place order and register at checkout', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigationPage.goToProductsPage()
    await pm.productPage.addProductToCartandViewTheCart('2')
    await pm.productPage.proceedToCheckoutButton.click()
    await pm.productPage.popUpRegisterLoginButton.click()
    
    await pm.registerPage.submitRegisterFormWithUsernameAndEmail(username, email)

    await page.waitForTimeout(2000)
    await pm.registerPage.submitRegisterFormWithCredentials(1, password , 4, 4, 60, 'John', 'Snow', 'This is my address' , 'United States', 'Bucuresti', 'Giurgiu', '070404' ,'0765263620')

    await pm.navigationPage.goToCartPage()
    await pm.productPage.proceedToCheckoutButton.click()

    await expect(pm.productPage.cityStateAndZipcodeOrder).toBeVisible()
    await expect(pm.productPage.phoneNumberOrder).toBeVisible()

    await pm.productPage.commentOrderInput.fill('This is a comment')
    await pm.productPage.placeOrderButton.click()

    await pm.productPage.submitCreditCardDetails(randomFullName, randomCardCreditNumber, randomCVC, randomMonth, randomYear)

    await expect(pm.productPage.messageSuccesfulOrder).toBeVisible()
    await pm.productPage.buttonToContinue.click()
})

test('login before chekout', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigationPage.goToSignUpLoginPage()
    await pm.loginPage.submitLoginFormWithEmailAndPassword(email, password)

    await pm.navigationPage.goToProductsPage()
    await pm.productPage.addProductToCartandViewTheCart('3')
    await pm.productPage.proceedToCheckoutButton.click()

    await expect(pm.productPage.addressOrder).toBeVisible()
    await expect(pm.productPage.cityStateAndZipcodeOrder).toBeVisible()
    await expect(pm.productPage.phoneNumberOrder).toBeVisible()

    await pm.productPage.commentOrderInput.fill('This is a comment')
    await pm.productPage.placeOrderButton.click()

    await pm.productPage.submitCreditCardDetails(randomFullName, randomCardCreditNumber, randomCVC, randomMonth, randomYear)

    await expect(pm.productPage.messageSuccesfulOrder).toBeVisible()
    await pm.productPage.buttonToContinue.click()

})

test('remove products from cart', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigationPage.goToProductsPage()
    await pm.productPage.addProductToCartandViewTheCart('1')

    await pm.shoppingCartPage.deleteProductFromCart('1').click()
    await expect(pm.productPage.deleteMessageIfCardIsEmpty).toBeVisible()
})

test('verify category of products', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigationPage.goToProductsPage()
    await pm.productPage.productCategoryForWomen.click()
    await pm.productPage.subcatogryOfProduct.click()
    await expect(pm.productPage.productNameAll.first()).toContainText('Dress');
    
})

test('verify products brands', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigationPage.goToProductsPage()
    await pm.productPage.brandName.click()
    await expect(pm.productPage.brandNameFromProductsPage).toHaveText('Brand - Polo Products')
})

test('add a review to a product', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigationPage.goToProductsPage()
    await pm.productPage.viewProductButton.click()
    await page.waitForTimeout(2000)

    await pm.contactPage.submitReviewToProduct(randomFullName, randomEmail, randomReview)

    await expect(pm.productPage.succesfullReviewMessage).toBeVisible()
})

test('add products from recommanded items to cart', async({page})=>{
    const pm = new PageManager(page)
    test.setTimeout(120000)
    await pm.productPage.addItemsFromCarrouselMenuToCard()
    await pm.navigationPage.goToProductsPage()
})


