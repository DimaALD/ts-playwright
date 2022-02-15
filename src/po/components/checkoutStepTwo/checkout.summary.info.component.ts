import { Locator } from '@playwright/test';
import { TSummaryRowInfo } from '@_types/index';

export class CheckoutSummaryInfoComponent {
    public summaryInfoSection: Locator;

    public paymentInfoLabel: Locator;

    public paymentInfoValue: Locator;

    public shippingInfoLabel: Locator;

    public shippingInfoValue: Locator;

    public totalPriceWithoutTaxes: Locator;

    public totalPriceWithTaxes: Locator;

    public cancelButton: Locator;

    public finishButton: Locator;

    public taxes: Locator;

    constructor(readonly content: Locator) {
        this.summaryInfoSection = this.content.locator('.summary_info');
        this.paymentInfoLabel = this.summaryInfoSection.locator('div:nth-of-type(1)');
        this.paymentInfoValue = this.summaryInfoSection.locator('div:nth-of-type(2)');

        this.shippingInfoLabel = this.summaryInfoSection.locator('div:nth-of-type(3)');
        this.shippingInfoValue = this.summaryInfoSection.locator('div:nth-of-type(4)');

        this.totalPriceWithoutTaxes = this.summaryInfoSection.locator('.summary_subtotal_label');
        this.taxes = this.summaryInfoSection.locator('.summary_tax_label');
        this.totalPriceWithTaxes = this.summaryInfoSection.locator('.summary_total_label');

        this.cancelButton = this.summaryInfoSection.locator('[data-test=cancel]');
        this.finishButton = this.summaryInfoSection.locator('[data-test=finish]');
    }

    public async getPaymentInfo(): Promise<TSummaryRowInfo> {
        const label = await this.paymentInfoLabel.innerText();
        const value = await this.paymentInfoValue.innerText();
        return { label, value };
    }

    public async getShippingInfo(): Promise<TSummaryRowInfo> {
        const label = await this.shippingInfoLabel.innerText();
        const value = await this.shippingInfoValue.innerText();
        return { label, value };
    }

    public async getTotalPriceWithoutTaxes(): Promise<string> {
        return this.totalPriceWithoutTaxes.innerText();
    }

    public async getTaxesInfo(): Promise<string> {
        return this.taxes.innerText();
    }

    public async getTotalPriceWithTaxes(): Promise<string> {
        return this.totalPriceWithoutTaxes.innerText();
    }
}
