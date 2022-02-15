import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    forbidOnly: false,
    retries: 0,
    workers: 3,
    use: {
        trace: 'on-first-retry',
        headless: false,
    },
    projects: [
        {
            name: 'chronium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    testDir: `${process.cwd()}/tests`,
    testMatch: /.+(test|tests).ts/,
};

export default config;
