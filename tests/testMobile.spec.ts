import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/PageManager';


test('search products', async({page})=>{
    await page.goto('https://automationexercise.com/')
    const pm = new PageManager(page)
    await pm.acceptConsent()
    test.setTimeout(120000);
    await pm.navigateTo.ProductsPage()

    await pm.searchOverEveryProduct()

    await pm.submitSearchButton.click()
    
})