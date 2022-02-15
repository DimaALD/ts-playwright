import { Locator } from '@playwright/test';

export abstract class BaseInventoryItemRowComponent {
    protected description: Locator;

    protected price: Locator;

    protected title: Locator;

    protected numberOfItems: Locator;

    protected constructor(protected item: Locator) {
        this.price = this.item.locator('.inventory_item_price');
        this.description = this.item.locator('.inventory_item_desc');
        this.title = this.item.locator('.inventory_item_name');
        this.numberOfItems = this.item.locator('.cart_quantity');
    }

    public getPrice(): Promise<string> {
        return this.price.innerText();
    }

    public getTitle(): Promise<string> {
        return this.title.innerText();
    }

    public getDescription(): Promise<string> {
        return this.description.innerText();
    }

    public getNumberOfItems(): Promise<string> {
        return this.numberOfItems.innerText();
    }

    public isVisible(): Promise<boolean> {
        return this.item.isVisible();
    }
}
