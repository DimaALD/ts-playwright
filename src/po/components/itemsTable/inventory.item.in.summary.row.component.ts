import { Locator } from '@playwright/test';
import { BaseInventoryItemRowComponent } from './base.inventory.item.row.component';

export class InventoryItemInSummaryRowComponent extends BaseInventoryItemRowComponent {
    constructor(item: Locator) {
        super(item);
    }
}
