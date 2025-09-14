import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://fnb.kiotviet.vn/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Đăng nhập');
});

test('get started link', async ({ page }) => {
  await page.goto('https://fnb.kiotviet.vn/');
 
  // Click the get started link.
  await page.getByRole('link', { name: 'Quên mật khẩu' }).click();

  // Expects page to have a heading with the name of Quên mật khẩu.
  await expect(page.getByRole('heading', { name: 'Quên mật khẩu' })).toBeVisible();
});

test('login with invalid credentials', async ({ page }) => {
  await page.goto('https://fnb.kiotviet.vn/');
 
  // Điền tên gian hàng
  await page.getByPlaceholder('Tên gian hàng').fill('newfnbz41s2')
  // Điền tên đăng nhập
  await page.getByPlaceholder('Tên đăng nhập').fill('admin')
  // Điền pass
  await page.getByPlaceholder('Mật khẩu').fill('0909')
  // Click nút "Quản lý"
   await page.getByRole('button', { name: 'Quản lý' }).click();
});
