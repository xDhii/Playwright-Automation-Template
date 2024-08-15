import { test, expect, devices } from '@playwright/test';


// test('Perform login on saucedemo.com', async ({ page }) => {
//   const deviceName = test.info().project.name.toLowerCase()
//   if (!deviceName.includes("mobile")) {
//     await page.setViewportSize({ width: 1920, height: 1080 });
//   }

//   await page.goto('https://www.saucedemo.com');

//   await expect(page).toHaveTitle(/Swag Labs/);
//   await page.locator('xpath=//input[@id="user-name"]').fill('standard_user')
//   await page.locator('xpath=//input[@id="password"]').fill('secret_sauce');
//   await page.locator('xpath=//input[@id="login-button"]').click();
//   await expect(page.locator('xpath=//button[@id="react-burger-menu-btn"]')).toBeVisible();
//   await page.screenshot({ path: `screenshots/${deviceName}_after_login.png` });

// });

test('Sort products on saucedemo.com', async ({ page }) => {

  await page.goto('https://www.saucedemo.com');

  await expect(page).toHaveTitle(/Swag Labs/);
  await page.locator('xpath=//input[@id="user-name"]').fill('standard_user')
  await page.locator('xpath=//input[@id="password"]').fill('secret_sauce');
  await page.locator('xpath=//input[@id="login-button"]').click();
  await expect(page.locator('xpath=//button[@id="react-burger-menu-btn"]')).toBeVisible();

  await page.selectOption('//select[@class="product_sort_container"]', 'az');
  await page.screenshot({ path: `screenshots/after_sort.png` });

  const elememts = await page.locator('xpath=//div[@data-test="inventory-item-name"]').elementHandles();
  const productNames = await Promise.all(elememts.map(async (element) => await element.textContent()))

  const cleanNames = productNames.filter(name =>  name !== null).map(name => name.trim());

  const firstItem = cleanNames[0];
  const sortedNames = [...cleanNames].sort((a, b) => a.localeCompare(b));

  expect(firstItem).toBe(sortedNames[0]);

  console.log(cleanNames);
  //div[@data-test="inventory-item-name"]

});