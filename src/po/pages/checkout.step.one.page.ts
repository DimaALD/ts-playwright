import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { CheckoutInfoFormComponent } from '@po/components';

export class CheckoutStepOnePage extends BasePage {
    public title: Locator;

    public content: Locator;

    public checkoutInfoFormComponent: CheckoutInfoFormComponent;

    constructor(page: Page) {
        super(page);
        this.title = this.page.locator('.title');
        this.content = this.page.locator('#contents_wrapper');
        this.checkoutInfoFormComponent = new CheckoutInfoFormComponent(this.content);
    }

    public isOpened() {
        return this.page.url().includes('checkoutStepOne-step-one');
    }

    public getPageTitle(): Promise<string | null> {
        return this.title.textContent();
    }

    public async fillForm(data: { firstName: string; lastName: string; zipCode: string }) {
        const { firstName, lastName, zipCode } = data;
        await this.checkoutInfoFormComponent.fillFirstName(firstName);
        await this.checkoutInfoFormComponent.fillLastName(lastName);
        await this.checkoutInfoFormComponent.fillZipCode(zipCode);
    }
}
