import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/PageManager';


const email = 'rrr111@test.com'
const username = 'rrr111'
const password = 'Rahmani13!'

test.beforeEach(async({page})=>{
  await page.goto('https://automationexercise.com/')
  const pm = new PageManager(page)
  await pm.navigationPage.acceptConsent()
  await pm.navigationPage.goToSignUpLoginPage()
})

test('register form', async({page})=>{
  const pm = new PageManager(page)
  await pm.registerPage.submitRegisterFormWithUsernameAndEmail(username, email)

  await page.waitForTimeout(2000)

  await pm.registerPage.submitRegisterFormWithCredentials(1, password , 4, 4, 60, 'John', 'Snow', 'This is my address' , 'United States', 'Bucuresti', 'Giurgiu', '070404' ,'0765263620')

})


test('login form', async({page})=>{
  const pm = new PageManager(page)
  await pm.loginPage.submitLoginFormWithEmailAndPassword(email, password)
  })

test('wrong login', async({page})=>{
  const pm = new PageManager(page)
  await pm.loginPage.submitLoginFormWithEmailAndPassword('r11@test.com', 'Rmani13!')
   
  await expect(pm.loginPage.invalidLoginMessage).toContainText('Your email or password is incorrect!')
})

test('logout', async({page})=>{
  const pm = new PageManager(page)
  await pm.loginPage.submitLoginFormWithEmailAndPassword(email, password)
  await expect(pm.productPage.loggedInIndicator).toContainText(username)
  await pm.navigationPage.goToLogout()
  await pm.navigationPage.goToHomePage()

})

test('signup with existing email', async({page})=>{
  const pm = new PageManager(page)
  await pm.registerPage.submitRegisterFormWithUsernameAndEmail(username, email)
  await expect(pm.registerPage.messageUserAlreadyExists).toBeVisible()

})

test('delete user', async({page})=>{
  const pm = new PageManager(page)
  await pm.loginPage.submitLoginFormWithEmailAndPassword(email, password)
  await pm.navigationPage.goToDeleteAccout()
  await pm.loginPage.continueButton.click()
})