import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/PageManager';
import { faker } from '@faker-js/faker';

test.beforeEach(async({page})=>{
  await page.goto('https://automationexercise.com/')
  const pm = new PageManager(page)
  await pm.acceptConsent()
  await pm.navigateTo.ContactUsPage()
  
})

test('contact us form', async({page})=>{
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
    await pm.nameInput.fill(randomFullName)
    await pm.emailInput.fill(randomEmail)
    await pm.subjectInput.fill('This is a subject')
    await pm.messageInput.fill('This is a message')
    await pm.submitButton.click()
    await pm.handleConfirmationDialog('Press OK to proceed!')

    
})