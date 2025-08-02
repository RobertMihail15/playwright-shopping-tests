import { Page } from "@playwright/test";

export class ShoppingCart{
    readonly page: Page
    constructor(page: Page){
        this.page = page
    }

    deleteProductFromCart(id: string){
        return this.page.locator(`#product-${id} .cart_quantity_delete`)
    }
    
    tableNameProduct(id:string){
        return this.page.locator(`#product-${id}`).locator('td h4')
    }
    
    tableCategoryProduct(id:string){
        return this.page.locator(`#product-${id}`).locator('td.cart_description p')
    }
    
    tablePriceProduct(id:string){
        return this.page.locator(`#product-${id}`).locator('td.cart_price')
    }
    
    tableQuantityProduct(id:string){
        return this.page.locator(`#product-${id}`).locator('td.cart_quantity')
    }
    
    tableTotalPriceProduct(id:string){
        return this.page.locator(`#product-${id}`).locator('td.cart_total p')
    }

}