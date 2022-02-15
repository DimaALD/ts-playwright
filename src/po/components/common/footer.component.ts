import { Locator, Page } from '@playwright/test';

export class FooterComponent {
    public content: Locator;

    public socialMediaLinks: Locator;

    public copyright: Locator;

    constructor(readonly page: Page) {
        this.content = this.page.locator('.footer');
        this.socialMediaLinks = this.content.locator('.social');
        this.copyright = this.content.locator('.footer_copy');
    }

    public getLinks() {
        return this.socialMediaLinks.allTextContents();
    }
}
