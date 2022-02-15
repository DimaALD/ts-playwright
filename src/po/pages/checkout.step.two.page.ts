import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { InventoryItemInSummaryRowComponent, CheckoutSummaryInfoComponent } from '@po/components';
import { IShoppingSummaryInfoModel } from '@models/shopping.summary.info.model';

export class CheckoutStepTwoPage extends BasePage {
    public title: Locator;

    public content: Locator;

    public cartItemsList: Locator;

    public checkoutSummaryInfoComponent: CheckoutSummaryInfoComponent;

    constructor(page: Page) {
        super(page);
        this.title = this.page.locator('.title');
        this.content = this.page.locator('#checkout_summary_container');
        this.cartItemsList = this.content.locator('.cart_item');
        this.checkoutSummaryInfoComponent = new CheckoutSummaryInfoComponent(this.content);
    }

    public isOpened(): boolean {
        return this.page.url().includes('checkout-step-two');
    }

    public getPageTitle(): Promise<string | null> {
        return this.title.textContent();
    }

    public async getShoppingCartItems(): Promise<InventoryItemInSummaryRowComponent[]> {
        const count = await this.cartItemsList.count();
        const items: InventoryItemInSummaryRowComponent[] = [];
        for (let i = 0; i < count; i++) {
            const item = await this.cartItemsList.nth(i);
            items.push(new InventoryItemInSummaryRowComponent(item));
        }
        return items;
    }

    public async getShoppingCartItemByTitle(title: string): Promise<InventoryItemInSummaryRowComponent | null> {
        const items = await this.getShoppingCartItems();
        for (const item of items) {
            const itemTitle = await item.getTitle();
            if (itemTitle === title) {
                return item;
            }
        }
        return null;
    }

    public async calcTotalPriceForCartItems(): Promise<number> {
        const items = await this.getShoppingCartItems();
        let price = 0;
        for (const item of items) {
            const itemPriceNotFormatted = await item.getPrice();
            const itemPrice = itemPriceNotFormatted.match(/\d+.?\d*/)![0]!;
            price += parseFloat(itemPrice);
        }
        return price;
    }

    public async getSummaryInfo(): Promise<IShoppingSummaryInfoModel> {
        const shippingInfo = await this.checkoutSummaryInfoComponent.getShippingInfo();
        const paymentInfo = await this.checkoutSummaryInfoComponent.getPaymentInfo();
        const priceWithoutTaxes = await this.checkoutSummaryInfoComponent.getTotalPriceWithoutTaxes();
        const taxes = await this.checkoutSummaryInfoComponent.getTaxesInfo();
        const priceWithTaxes = await this.checkoutSummaryInfoComponent.getTotalPriceWithTaxes();

        return {
            priceWithoutTaxes,
            priceWithTaxes,
            paymentInfo,
            shippingInfo,
            taxes,
        };
    }
}
