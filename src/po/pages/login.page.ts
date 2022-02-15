import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    public content: Locator;

    public username: Locator;

    public password: Locator;

    public loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.content = this.page.locator('#root');
        this.username = this.content.locator('[data-test=username]');
        this.password = this.content.locator('[data-test=password]');
        this.loginButton = this.content.locator('[data-test=login-button]');
    }

    async login(credentials: { username: string; password: string }) {
        await this.username.type(credentials.username);
        await this.password.type(credentials.password);
        await this.loginButton.click();
    }

    public isOpened(): boolean {
        return this.page.url() === 'https://www.saucedemo.com/';
    }
}
