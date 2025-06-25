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
  await pm.acceptConsent()
})

test('products details', async({page})=>{
  const pm = new PageManager(page)
  await pm.navigateTo.SignUpLoginPage()
  await pm.submitCredentials.submitLoginFormWithEmailAndPassword(email, password)

  await pm.navigateTo.ProductsPage()
  await pm.viewProductButton.click()
  await page.waitForTimeout(2000)
  
  await expect(pm.productName).toBeVisible()
  await expect(pm.productCategory).toBeVisible()
  await expect(pm.productPrice).toBeVisible()
  await expect(pm.productAvailability).toBeVisible()
  await expect(pm.productCondition).toBeVisible()
  await expect(pm.productBrand).toBeVisible()
  })

test('search products', async({page})=>{
    test.setTimeout(120000);
    const pm = new PageManager(page)
    await pm.navigateTo.ProductsPage()

    await pm.searchOverEveryProduct()

    await pm.submitSearchButton.click()
    
})

test('add products to shopping cart', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo.ProductsPage()

    await pm.addProductToCartandViewTheCart('1')
    await pm.navigateTo.ProductsPage()

    await pm.addProductToCartandViewTheCart('2')

    await expect(pm.tableNameProduct('1')).toBeVisible()
    await expect(pm.tableCategoryProduct('1')).toBeVisible()
    await expect(pm.tablePriceProduct('1')).toBeVisible()
    await expect(pm.tableQuantityProduct('1')).toBeVisible()
    await expect(pm.tableTotalPriceProduct('1')).toBeVisible()
})

test('modify quantity in cart', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo.ProductsPage()

    await pm.viewProductButton.click()
    await page.waitForTimeout(2000)

    await pm.quantityInput.fill('')
    await pm.quantityInput.fill('4')
    await pm.buttonForAddingToCartInTheProductPage.click()
    await pm.viewCartButton.click()
    await expect(pm.tableQuantityProduct('1')).toBeVisible()
    await expect(pm.tableTotalPriceProduct('1')).toBeVisible()

})

test('place order and register at checkout', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo.ProductsPage()
    await pm.addProductToCartandViewTheCart('1')
    await pm.proceedToCheckoutButton.click()
    await pm.popUpRegisterLoginButton.click()
    
    await pm.submitCredentials.submitRegisterFormWithUsernameAndEmail(username, email)

    await page.waitForTimeout(2000)
    await pm.submitCredentials.submitRegisterFormWithCredentials(1, password , 4, 4, 60, 'John', 'Snow', 'This is my address' , 'United States', 'Bucuresti', 'Giurgiu', '070404' ,'0765263620')

    await pm.navigateTo.CartPage()
    await pm.proceedToCheckoutButton.click()

    await expect(pm.addressOrder).toBeVisible()
    await expect(pm.cityStateAndZipcodeOrder).toBeVisible()
    await expect(pm.phoneNumberOrder).toBeVisible()

    await pm.commentOrderInput.fill('This is a comment')
    await pm.placeOrderButton.click()

    await pm.submitCreditCardDetails(randomFullName, randomCardCreditNumber, randomCVC, randomMonth, randomYear)

    await expect(pm.messageSuccesfulOrder).toBeVisible()
    await pm.buttonToContinue.click()
})

test('login before chekout', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo.SignUpLoginPage()
    await pm.submitCredentials.submitLoginFormWithEmailAndPassword(email, password)

    await pm.navigateTo.ProductsPage()
    await pm.addProductToCartandViewTheCart('3')
    await pm.proceedToCheckoutButton.click()

    await expect(pm.addressOrder).toBeVisible()
    await expect(pm.cityStateAndZipcodeOrder).toBeVisible()
    await expect(pm.phoneNumberOrder).toBeVisible()

    await pm.commentOrderInput.fill('This is a comment')
    await pm.placeOrderButton.click()

    await pm.submitCreditCardDetails(randomFullName, randomCardCreditNumber, randomCVC, randomMonth, randomYear)

    await expect(pm.messageSuccesfulOrder).toBeVisible()
    await pm.buttonToContinue.click()

})

test('remove products from cart', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo.ProductsPage()
    await pm.addProductToCartandViewTheCart('1')

    await pm.deleteProductFromCart('1').click()
    await expect(pm.deleteMessageIfCardIsEmpty).toBeVisible()
})

test('verify category of products', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo.ProductsPage()
    await pm.productCategoryForWomen.click()
    await pm.subcatogryOfProduct.click()
    await expect(pm.productNameAll.first()).toContainText('Dress');
    
})

test('verify products brands', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo.ProductsPage()
    await pm.brandName.click()
    await expect(pm.brandNameFromProductsPage).toHaveText('Brand - Polo Products')
})

test('add a review to a product', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo.ProductsPage()
    await pm.viewProductButton.click()
    await page.waitForTimeout(2000)

    await pm.submitReviewToProduct(randomFullName, randomEmail, randomReview)

    await expect(pm.succesfullReviewMessage).toBeVisible()
})

test('add products from recommanded items to cart', async({page})=>{
    const pm = new PageManager(page)
    test.setTimeout(120000)
    await pm.addItemsFromCarrouselMenuToCard()
    await pm.navigateTo.ProductsPage()
})


