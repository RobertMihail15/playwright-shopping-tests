import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
    extraHTTPHeaders: {
    'Content-Security-Policy': 'font-src \'self\' data:;'
  }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        //viewport: {width:1920, height: 1080}
       },
    },

    {
      name: 'mobile',
      testMatch:'testMobile.spec.ts',
      use: {
        ...devices['iPhone 13 Pro']
      }
    }

  ],

});
