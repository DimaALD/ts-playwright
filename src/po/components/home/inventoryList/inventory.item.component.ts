import { Locator } from '@playwright/test';
import { BaseItemComponent } from './base.item.component';

export class InventoryItemComponent extends BaseItemComponent {
    private addToCartButton: Locator;

    private description: Locator;

    private title: Locator;

    private price: Locator;

    constructor(item: Locator) {
        super(item);
        this.description = this.item.locator('.inventory_item_desc');
        this.title = this.item.locator('.inventory_item_name');
        this.price = this.item.locator('.inventory_item_price');
        this.addToCartButton = this.item.locator('.btn_inventory');
    }

    public getInfo(): Promise<string> {
        return this.description.innerText();
    }

    public getTitle(): Promise<string> {
        return this.title.innerText();
    }

    public getPrice(): Promise<string> {
        return this.price.innerText();
    }

    public async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    public async openItemInfo(): Promise<void> {
        await this.title.click();
    }
}
