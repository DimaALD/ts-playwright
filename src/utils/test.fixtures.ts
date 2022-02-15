import { test as base, expect } from '@playwright/test';
import { pageProvider } from '@po/pages';

type MyFixtures = {
    po: ReturnType<typeof pageProvider>;
};

export const test = base.extend<MyFixtures>({
    po: async ({ page }, use) => {
        await use(pageProvider(page));
    },
});

export { expect };
