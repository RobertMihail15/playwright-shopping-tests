import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/PageManager';
import { faker } from '@faker-js/faker';

test.beforeEach(async({page})=>{
  await page.goto('https://automationexercise.com/')
  const pm = new PageManager(page)
  await pm.navigationPage.acceptConsent()
  await pm.navigationPage.goToContactUsPage()
  
})

test('contact us form', async({page})=>{
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
    await pm.contactPage.nameInput.fill(randomFullName)
    await pm.contactPage.emailInput.fill(randomEmail)
    await pm.contactPage.subjectInput.fill('This is a subject')
    await pm.contactPage.messageInput.fill('This is a message')
    await pm.contactPage.submitButton.click()
    await pm.contactPage.handleConfirmationDialog('Press OK to proceed!')

})