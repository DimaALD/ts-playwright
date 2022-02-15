import { Locator } from '@playwright/test';
import { BaseInventoryItemRowComponent } from './base.inventory.item.row.component';

export class InventoryItemInCartRowComponent extends BaseInventoryItemRowComponent {
    protected removeButton: Locator;

    constructor(item: Locator) {
        super(item);
        this.removeButton = this.item.locator('.cart_button');
    }

    public async removeItem(): Promise<void> {
        await this.removeButton.click();
    }
}
