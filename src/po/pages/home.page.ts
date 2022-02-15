import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { InventoryListComponent, HomeHeaderComponent, InventoryItemComponent } from '@po/components';

export class HomePage extends BasePage {
    public inventoryTableComponent: InventoryListComponent;

    public content: Locator;

    constructor(page: Page) {
        super(page);
        this.content = this.page.locator('#inventory_container:not(.inventory_container)');
        this.header = new HomeHeaderComponent(this.page);
        this.inventoryTableComponent = new InventoryListComponent(this.content);
    }

    public isOpened(): boolean {
        return this.page.url().includes('inventory');
    }

    public async addItemToCart(title: string): Promise<void> {
        let item: InventoryItemComponent;
        try {
            item = await this.inventoryTableComponent.getInventoryItemByTitle(title);
        } catch (error) {
            throw new Error(`[addItemToCart] Couldn't find inventory item with title: ${title}. Error: ${error}`);
        }

        await item.addToCart();
    }

    public async openItemInfoByTitle(title: string): Promise<void> {
        let item: InventoryItemComponent;
        try {
            item = await this.inventoryTableComponent.getInventoryItemByTitle(title);
        } catch (error) {
            throw new Error(`[openItemInfoByTitle] Couldn't find inventory item with title: ${title}. Error: ${error}`);
        }

        await item.openItemInfo();
    }
}
