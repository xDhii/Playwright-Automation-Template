import { test, expect, devices } from '@playwright/test';


test('Perform login on amazon.com', async ({ page }) => {
  const deviceName = test.info().project.name.toLowerCase()
  if (!deviceName.includes("mobile")) {
    await page.setViewportSize({ width: 1920, height: 1080 });
  }

  await page.goto('https://www.amazon.com/');

  await expect(page).toHaveTitle(/Amazon/);
  await page.screenshot({ path: `screenshots/${deviceName}_login_before.png` });
  await page.locator('xpath=//a[@id="nav-link-accountList"]').click();
  await page.locator('xpath=//input[@id="ap_email"]').fill('adriano.valumin@outlook.com')
  await page.locator('xpath=//input[@id="continue"]').click();
  await page.locator('xpath=//input[@id="ap_password"]').fill('A1234567');
  await expect(page.locator('xpath=//input[@id="ap_password"]')).toBeVisible();
  await page.screenshot({ path: `screenshots/${deviceName}_login_after.png` });

});

test('Search for pet toys on amazon.com', async ({ page }) => {
  const deviceName = test.info().project.name.toLowerCase()
  if (!deviceName.includes("mobile")) {
    await page.setViewportSize({ width: 1920, height: 1080 });
  }

  await page.goto('https://www.amazon.com/');

  await expect(page).toHaveTitle(/Amazon/);
  await page.screenshot({ path: `screenshots/${deviceName}_search_before.png` });
  await page.locator('xpath=//input[@id="twotabsearchtextbox"]').fill('pet toys');
  await page.locator('//input[@id="nav-search-submit-button"]').click();
  await expect(page.locator('//a[@class="s-pagination-item s-pagination-next s-pagination-button s-pagination-separator"]')).toBeAttached();
  await page.screenshot({ path: `screenshots/${deviceName}_search_after.png` });

});