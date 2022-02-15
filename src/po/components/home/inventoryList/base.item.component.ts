import { Locator } from '@playwright/test';

export abstract class BaseItemComponent {
    protected constructor(protected item: Locator) {}

    public abstract getTitle(): Promise<string>;

    public abstract addToCart(): Promise<void>;

    public abstract getPrice(): Promise<string>;

    public abstract getInfo(): Promise<string>;
}
