import { test, expect } from '@playwright/test';

test.describe('Token table visual regression', () => {
  test('matches baseline on desktop', async ({ page }) => {
    await page.goto('/');
    // wait for data + skeleton to settle
    await page.waitForTimeout(2000);

    const screenshot = await page.screenshot();
    await expect(screenshot).toMatchSnapshot('token-table-desktop.png', {
      maxDiffPixels: 2,
    });
  });

  test('matches baseline on mobile width', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 360, height: 720 });
    await page.waitForTimeout(2000);

    const screenshot = await page.screenshot();
    await expect(screenshot).toMatchSnapshot('token-table-mobile.png', {
      maxDiffPixels: 2,
    });
  });
});
