import { Page } from "@playwright/test";

export class LoginForm{
    readonly page: Page
    constructor(page: Page){
        this.page = page
    }

    
    get emailLoginInput(){
        return this.page.locator('.login-form').getByRole('textbox', {name: 'Email Address'})
    }

    get passwordInput(){
        return this.page.locator('.login-form').getByRole('textbox', {name: 'Password'})
    }

    get loginButton(){
        return this.page.getByRole('button', {name: 'Login'})
    }

    get signUpButton(){
        return this.page.getByRole('button', {name: 'Signup'})
    }

    get createAccountButton(){
        return this.page.getByRole('button', {name: 'Create Account'})
    }

    get continueButton(){
        return this.page.locator('.btn',{hasText: 'Continue'})
    }

    get messageUserAlreadyExists(){
        return this.page.locator('.signup-form p')
    }

    get invalidLoginMessage(){
        return this.page.locator('.login-form p')
    }

    async submitLoginFormWithEmailAndPassword(email: string, password: string){
        await this.emailLoginInput.fill(email)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

}