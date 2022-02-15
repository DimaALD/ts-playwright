import { Locator } from '@playwright/test';
import { InventoryItemComponent } from '@po/components/home';

export class InventoryListComponent {
    public inventoryItems: Locator;

    constructor(protected content: Locator) {
        this.inventoryItems = this.content.locator('.inventory_item');
    }

    public async getInventoryItems(): Promise<InventoryItemComponent[]> {
        const count = await this.inventoryItems.count();
        const items: InventoryItemComponent[] = [];
        for (let i = 0; i < count; i++) {
            const item = await this.inventoryItems.nth(i);
            items.push(new InventoryItemComponent(item));
        }
        return items;
    }

    public getInventoryItemsNumber(): Promise<number> {
        return this.inventoryItems.count();
    }

    public async getInventoryItemByTitle(title: string): Promise<InventoryItemComponent> {
        const items = await this.getInventoryItems();
        for (const item of items) {
            const itemTitle = await item.getTitle();
            if (itemTitle === title) {
                return item;
            }
        }
        throw new Error(`[getInventoryItemByTitle] Inventory item with title: ${title} was not found`);
    }
}
