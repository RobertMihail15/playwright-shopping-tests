import { Page } from "@playwright/test";

export class NavigationPage{
    readonly page: Page
    constructor(page: Page){
        this.page=page
    }

    async CartPage(){
        await this.selectGroupPageItem(' Cart')
    }
    
    async SignUpLoginPage(){
        await this.selectGroupPageItem(' Signup / Login')
    }
    
    async ProductsPage(){
        await this.selectGroupPageItem(' Products')
    }
    
    async ContactUsPage(){
        await this.selectGroupPageItem(' Contact us')
    }

    async HomePage(){
        await this.selectGroupPageItem(' Home')
    }

    async Logout(){
        await this.selectGroupPageItem(' Logout')
    }

    async DeleteAccout(){
        await this.selectGroupPageItem(' Delete')
    }

    private async selectGroupPageItem(groupPageTitle: string){
        const groupMenuPage = this.page.getByText(groupPageTitle).first()
        await groupMenuPage.click()
    }
}