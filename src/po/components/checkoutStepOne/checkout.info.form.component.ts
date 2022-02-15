import { Locator } from '@playwright/test';

export class CheckoutInfoFormComponent {
    public form: Locator;

    public firstName: Locator;

    public lastName: Locator;

    public zipCode: Locator;

    public cancelButton: Locator;

    public continueButton: Locator;

    constructor(readonly content: Locator) {
        this.form = this.content.locator('#checkout_info_container');
        this.firstName = this.form.locator('[data-test=firstName]');
        this.lastName = this.form.locator('[data-test=lastName]');
        this.zipCode = this.form.locator('[data-test=postalCode]');
        this.cancelButton = this.form.locator('[data-test=cancel]');
        this.continueButton = this.form.locator('[data-test=continue]');
    }

    public async fillFirstName(value: string): Promise<void> {
        await this.firstName.type(value);
    }

    public async fillLastName(value: string): Promise<void> {
        await this.lastName.type(value);
    }

    public async fillZipCode(value: string): Promise<void> {
        await this.zipCode.type(value);
    }
}
