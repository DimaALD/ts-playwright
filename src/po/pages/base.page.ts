import { Page, Response } from '@playwright/test';
import { PrimaryHeaderComponent, FooterComponent } from '@po/components';

export abstract class BasePage {
    public header: PrimaryHeaderComponent;

    public footer: FooterComponent;

    protected constructor(readonly page: Page) {
        this.header = new PrimaryHeaderComponent(this.page);
        this.footer = new FooterComponent(this.page);
    }

    public open(url: string): Promise<Response | null> {
        return this.page.goto(url);
    }

    public abstract isOpened(): boolean;
}
