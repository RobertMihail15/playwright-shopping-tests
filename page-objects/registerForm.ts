import { Page } from "@playwright/test";

export class RegisterForm{
    readonly page: Page
    constructor(page: Page){
        this.page = page
    }

    get emailRegisterInput(){
        return this.page.locator('.signup-form').getByRole('textbox', {name: 'Email Address'})
    }

    get passwordInput(){
        return this.page.locator('.login-form').getByRole('textbox', {name: 'Password'})
    }

    get usernameInput(){
        return this.page.locator('.signup-form').getByRole('textbox', {name: 'Name'})
    }

    get loginButton(){
        return this.page.getByRole('button', {name: 'Login'})
    }

    get signUpButton(){
        return this.page.getByRole('button', {name: 'Signup'})
    }

    get passwordRegisterFormInput(){
        return this.page.locator('#password')
    }

    get daysInput(){
        return this.page.locator('#days')
    }

    get monthsInput(){
        return this.page.locator('#months')
    }

    get yearsInput(){
        return this.page.locator('#years')
    }

    get firstNameInput(){
        return this.page.getByLabel('First Name')
    }

    get lastNameInput(){
        return this.page.getByLabel('Last Name')
    }

    get addressInput(){
        return this.page.getByLabel('Address').first()
    }

    get countryInput(){
        return this.page.locator('#country')
    }

    get stateInput(){
        return this.page.getByLabel('State')
    }

    get cityInput(){
        return this.page.locator('#city')
    }

    get zipCodeInput(){
        return this.page.locator('#zipcode')
    }

    get mobilePhoneNumberInput(){
        return this.page.locator('#mobile_number')
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

    genderRadioButtton(gender :number){
        return this.page.locator(`#id_gender${gender}`)
    }

/**  
 * @param gender 1 for Mr and 2 for Mrs
 * @param password user password
 * @param days number from 1 to 31
 * @param months number from 1 to 12
 * @param years year index
 * @param firstName user's first name
 * @param lastName user's last name
 * @param address address
 * @param country country
 * @param state state
 * @param city city
 * @param zipcode zip
 * @param mobilePhone mobile phone number
 */

    async submitRegisterFormWithCredentials(gender: number, password: string, days:number, months: number, years: number, firstName: string, lastName: string, address: string, country: string, state: string, city:string, zipcode: string, mobilePhone: string){
        
        await this.genderRadioButtton(gender).check({force: true})
        await this.passwordRegisterFormInput.fill(password)
        await this.daysInput.click()
        await this.daysInput.selectOption({ index: days })
        await this.monthsInput.click()
        await this.monthsInput.selectOption({ index: months })
        await this.yearsInput.click()
        await this.yearsInput.selectOption({ index: years })

        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.addressInput.fill(address)
        await this.countryInput.selectOption({ value: country })
        await this.stateInput.fill(state)
        await this.cityInput.fill(city)
        await this.zipCodeInput.fill(zipcode)
        await this.mobilePhoneNumberInput.fill(mobilePhone)

        await this.createAccountButton.click()
        await this.page.waitForTimeout(2000)
        await this.continueButton.click()
    }

    async submitRegisterFormWithUsernameAndEmail(username: string, email: string){
        await this.usernameInput.fill(username)
        await this.emailRegisterInput.fill(email)
        await this.signUpButton.click()
    }
}