import { Locator, Page } from '@playwright/test';
import { PrimaryHeaderComponent } from '../common';

export class HomeHeaderComponent extends PrimaryHeaderComponent {
    public sortDropdown: Locator;

    public optionInSortDropdown: Locator;

    constructor(page: Page) {
        super(page);
        this.sortDropdown = this.content.locator('[data-test=product_sort_container]');
        this.optionInSortDropdown = this.sortDropdown.locator('option');
    }

    public async selectOption(option: string): Promise<void> {
        await this.sortDropdown.click();

        await this.optionInSortDropdown.selectOption({ label: option });
    }
}
