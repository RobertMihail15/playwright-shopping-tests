import { Page, expect } from "@playwright/test";

export class ProductPage{
    readonly page: Page
    constructor(page: Page){
        this.page = page
    }

    get loggedInIndicator(){
            return this.page.locator('.navbar-nav li', { hasText: 'Logged in as' })
        }
    
    
        get buttonToContinue(){
           return this.page.locator('.btn',{hasText: 'Continue'})
        }
    
        get viewProductButton(){
            return this.page.locator('.fa-plus-square').first()
        }
    
        get productName(){
            return this.page.locator('.product-details h2')
        }
    
        get productCategory(){
            return this.page.locator('.product-details p', {hasText: 'Category'})
        }
    
        get productPrice(){
            return this.page.locator('.product-details span span')
        }
    
        get productAvailability(){
            return this.page.locator('.product-details p', {hasText: 'Availability:'})
        }
    
        get productCondition(){
            return this.page.locator('.product-details p', {hasText: 'Condition:'})
        }
    
        get productBrand(){
            return this.page.locator('.product-details p', {hasText: 'Brand:'})
        }
    
        get productNameAll(){
            return this.page.locator('.single-products p')
        }
    
        get searchProductInput(){
            return this.page.getByRole('textbox',{name: 'Search Product'})
        }
    
        get submitSearchButton(){
            return this.page.locator('#submit_search')
        }
    
        get viewCartButton(){
            return this.page.locator('.modal-content').getByText('View Cart')
        }
    
        get quantityInput(){
            return this.page.locator('#quantity')
        }
    
        get buttonForAddingToCartInTheProductPage(){
            return this.page.getByRole('button', {name: 'Add to cart'})
        }
        
        get proceedToCheckoutButton(){
            return this.page.locator('.check_out').getByText('Proceed To Checkout')
        }
    
        get popUpRegisterLoginButton(){
            return this.page.locator('.modal-content').getByText('Register / Login').last()
        }
    
        get creditCardNameInput(){
            return this.page.locator('[data-qa="name-on-card"]')
        }
    
        get creditCardNumberInput(){
            return this.page.locator('.card-number')
        }   
    
        get creditCardCVCInput(){
            return this.page.getByPlaceholder('ex. 311')
        }
    
        get creditCardExpirationMonthInput(){
            return this.page.getByPlaceholder('MM')
        }
    
        get creditCardExpirationYearInput(){
            return this.page.getByPlaceholder('YYYY')
        }
    
        get payAndConfirmOrderButton(){
            return this.page.getByRole('button', {name: 'Pay and Confirm Order'})
        }
    
        get placeOrderButton(){
            return this.page.locator('.check_out').getByText('Place Order')
        }
    
        get commentOrderInput(){
            return this.page.locator('.form-group').getByRole('textbox')
        }
    
        get addressOrder(){
            return this.page.locator('#address_delivery .address_address2').first()
        }
    
        get cityStateAndZipcodeOrder(){
            return this.page.locator('[class="address_city address_state_name address_postcode"]').first()
        }
    
        get phoneNumberOrder(){
            return this.page.locator('#address_delivery .address_phone').first()
        }
    
        get messageSuccesfulOrder(){
            return this.page.locator('[class="col-sm-9 col-sm-offset-1"]').locator('p')
        }
    
        get deleteMessageIfCardIsEmpty(){
            return this.page.locator('#empty_cart p')
        }
    
        get succesfullReviewMessage(){
            return this.page.locator('[class="alert-success alert"]').first()
        }
    
        get carrouselMenu(){
            return this.page.locator('#recommended-item-carousel')
        }
    
        get allItemsFromCarrousel(){
            return this.page.locator('#recommended-item-carousel .single-products')
        }
    
    
        get arrowCarrouselButton(){
            return this.page.locator('[class="fa fa-angle-right"]').last()
        }
    
        get brandName(){
            return this.page.locator('.brands-name a').first()
        }
    
        get brandNameFromProductsPage(){
            return this.page.locator('.features_items h2').first()
        }
    
        get productCategoryForWomen(){
            return this.page.locator('[class="panel-group category-products"]').locator('[class="panel panel-default"]').getByText('WOMEN')
        }
    
        get subcatogryOfProduct(){
            return this.page.locator('.panel-body a').first()
        }
    
        get cartDeleteQuantityButton(){
            return this.page.locator('.cart_quantity_delete')
        }
    
        async submitCreditCardDetails(name:string, creditCardNumber: string, cvc: string, month: string, year: string){
            await this.creditCardNameInput.fill(name)
            await this.creditCardNumberInput.fill(creditCardNumber)
            await this.creditCardCVCInput.fill(cvc)
            await this.creditCardExpirationMonthInput.fill(month)
            await this.creditCardExpirationYearInput.fill(year)
            await this.payAndConfirmOrderButton.click()
        }
    
        addToCartButton(id:string ){
            return this.page.locator('.overlay-content').locator(`a[data-product-id="${id}"]`)
        }
    
        productNameFromProductsPage(id:string){
            return this.page.locator('.single-products').locator(`a[data-product-id="${id}"]`).first()
        }
    
        async searchOverEveryProduct(){
            const productName = await this.productNameAll.allTextContents()
            for(const name of productName){
                await this.searchProductInput.fill(name)
                await this.submitSearchButton.click()
                await this.productNameAll.first().waitFor()
                await expect(this.productNameAll.first()).toHaveText(name);
                await this.searchProductInput.fill('');
            }
        }
    
        async addProductToCartandViewTheCart(id:string){
            await this.productNameFromProductsPage(id).hover()
            await this.addToCartButton(id).click()
            await this.viewCartButton.click()
        }
    
        async addItemsFromCarrouselMenuToCard() {
            const recommandedItems = this.carrouselMenu
            await recommandedItems.scrollIntoViewIfNeeded()
            await expect(recommandedItems).toBeVisible()
        
            const allProducts = await this.allItemsFromCarrousel.all()
        
            for (const product of allProducts) {
                const isVisible = await product.isVisible()
                if (!isVisible) {
                    await this.arrowCarrouselButton.click()
                    await this.page.waitForTimeout(1000)
                }
    
                const currentIndex = allProducts.indexOf(product)
                const productPrice = await product.locator('h2').textContent()
            
                await product.locator('[class="btn btn-default add-to-cart"]').click()
        
                await this.viewCartButton.click()
                await this.cartDeleteQuantityButton.click()
                await this.page.waitForTimeout(1000)
                await expect(this.deleteMessageIfCardIsEmpty).toBeVisible()
            
                if (currentIndex < allProducts.length - 1) {
                    await this.page.goto('https://automationexercise.com/')
                    await recommandedItems.scrollIntoViewIfNeeded()
                }   
            }
    }
}