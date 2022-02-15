import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { InventoryItemInCartRowComponent } from '@po/components';

export class ShoppingCartPage extends BasePage {
    protected content: Locator;

    public cartItemsList: Locator;

    public checkoutButton: Locator;

    public continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);
        this.content = this.page.locator('.cart_contents_container');
        this.cartItemsList = this.content.locator('.cart_item');
        this.continueShoppingButton = this.content.locator('[data-test=continue-shopping]');
        this.checkoutButton = this.content.locator('[data-test=checkout]');
    }

    public isOpened(): boolean {
        return this.page.url().includes('cart');
    }

    public async getShoppingCartItems(): Promise<InventoryItemInCartRowComponent[]> {
        const count = await this.cartItemsList.count();
        const items: InventoryItemInCartRowComponent[] = [];
        for (let i = 0; i < count; i++) {
            const item = await this.cartItemsList.nth(i);
            items.push(new InventoryItemInCartRowComponent(item));
        }
        return items;
    }

    public async getShoppingCartItemByTitle(title: string): Promise<InventoryItemInCartRowComponent> {
        const items = await this.getShoppingCartItems();
        for (const item of items) {
            const itemTitle = await item.getTitle();
            if (itemTitle === title) {
                return item;
            }
        }
        throw new Error(`[getShoppingCartItemByTitle] Item with title: ${title} was not found`);
    }

    public async isShoppingCartItemVisible(title: string): Promise<boolean> {
        return !!(await this.getShoppingCartItemByTitle(title));
    }
}
