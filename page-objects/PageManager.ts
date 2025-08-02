import { Page, expect } from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { RegisterForm } from "./registerForm";
import { ProductPage } from "./productPage";
import { LoginForm } from "./loginForm";
import { ContactForm } from "./contactForm";
import { ShoppingCart } from "./shoppingCart";

export class PageManager{
    readonly page: Page
    readonly navigationPage: NavigationPage
    readonly registerPage: RegisterForm
    readonly productPage: ProductPage
    readonly loginPage: LoginForm
    readonly contactPage: ContactForm
    readonly shoppingCartPage: ShoppingCart

    constructor(page: Page){
        this.page = page
        this.navigationPage= new NavigationPage(this.page)
        this.registerPage = new RegisterForm(this.page)
        this.productPage = new ProductPage(this.page)
        this.loginPage = new LoginForm(this.page)
        this.contactPage = new ContactForm(this.page)
        this.shoppingCartPage = new ShoppingCart(this.page)
    }
   
}