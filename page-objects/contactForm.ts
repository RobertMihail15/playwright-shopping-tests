import { Page, expect } from "@playwright/test";

export class ContactForm{
    readonly page: Page
    constructor(page: Page){
        this.page = page
    }

    get nameInput(){
        return this.page.getByRole('textbox', {name: 'Name'})
    }
    
    get emailInput(){
        return this.page.locator('[class="form-group col-md-6"]').getByRole('textbox', {name: 'Email'})
    }
    
    get subjectInput(){
        return this.page.getByRole('textbox', {name: 'Subject'})
    }
    
    get messageInput(){
        return this.page.getByRole('textbox', {name: 'Your Message Here'})
    }
    
    get submitButton(){
        return this.page.getByRole('button', {name: 'Submit'})
    }

    async handleConfirmationDialog(expectedMessage: string){
        this.page.on('dialog', dialog=>{
            expect(dialog.message()).toEqual(expectedMessage)
                dialog.accept()
            })
        }

    async submitReviewToProduct(name: string, email: string, review: string){
        await this.nameInput.fill(name)
        await this.emailInput.fill(email)
        await this.messageInput.fill(review)
        await this.submitButton.click()
        }
}
