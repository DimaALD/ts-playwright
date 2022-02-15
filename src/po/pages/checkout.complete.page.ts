import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { TCompleteText } from '@_types/index';

export class CheckoutCompletePage extends BasePage {
    public content: Locator;

    public completeHeader: Locator;

    public completeText: Locator;

    public completeImage: Locator;

    public backHomeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.content = this.page.locator('#checkout_complete_container');
        this.completeHeader = this.content.locator('.complete-header');
        this.completeText = this.content.locator('.complete-text');
        this.completeImage = this.content.locator('.pony_express');
        this.backHomeButton = this.content.locator('[data-test=back-to-products]');
    }

    public isOpened(): boolean {
        return this.page.url().includes('/checkout-complete');
    }

    public async getCompleteText(): Promise<TCompleteText> {
        const completeHeaderText = await this.completeHeader.innerText();
        const completeText = await this.completeText.innerText();
        return { header: completeHeaderText, text: completeText };
    }
}
