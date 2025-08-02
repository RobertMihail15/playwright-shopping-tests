import { Page } from "@playwright/test";

export class NavigationPage{
    readonly page: Page
    constructor(page: Page){
        this.page=page
    }

    async goToCartPage(){
        await this.selectGroupPageItem(' Cart')
    }
    
    async goToSignUpLoginPage(){
        await this.selectGroupPageItem(' Signup / Login')
    }
    
    async goToProductsPage(){
        await this.selectGroupPageItem(' Products')
    }
    
    async goToContactUsPage(){
        await this.selectGroupPageItem(' Contact us')
    }

    async goToHomePage(){
        await this.selectGroupPageItem(' Home')
    }

    async goToLogout(){
        await this.selectGroupPageItem(' Logout')
    }

    async goToDeleteAccout(){
        await this.selectGroupPageItem(' Delete')
    }

    async acceptConsent(){
            await this.page.locator('[class="fc-button-label"]').getByText('Consent').click()
        }

    private async selectGroupPageItem(groupPageTitle: string){
        const groupMenuPage = this.page.getByText(groupPageTitle).first()
        await groupMenuPage.click()
    }
    
}