import { Locator, Page } from '@playwright/test';

export class PrimaryHeaderComponent {
    public content: Locator;

    public burgerMenuButton: Locator;

    public shoppingCartLink: Locator;

    constructor(readonly page: Page) {
        this.content = this.page.locator('.header_container');
        this.burgerMenuButton = this.content.locator('#react-burger-menu-btn');
        this.shoppingCartLink = this.content.locator('#shopping_cart_container');
    }

    public async openMenu() {
        await this.burgerMenuButton.click();
    }

    public async openShoppingCart() {
        await this.shoppingCartLink.click();
    }
}
