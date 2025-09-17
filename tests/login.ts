import { test, expect } from '@playwright/test';

const baseUrl = 'https://fnb.kiotviet.vn/login?redirect=%2ftestfnb2%2f#f=Unauthorized';

// Helper function
async function login(page, tenant: string, username: string, password: string) {
  await page.goto(baseUrl);
  await page.fill('input[placeholder="Tên gian hàng"]', tenant);
  await page.fill('input[placeholder="Tên đăng nhập"]', username);
  await page.fill('input[placeholder="Mật khẩu"]', password);
  await page.click('button:has-text("Đăng nhập")');
}

test('Đăng nhập thành công', async ({ page }) => {
  await login(page, 'testfnbdev41', 'admin', '0909');
  await expect(page).toHaveURL(/.*testfnbdev41.*/);
  await expect(page.locator('body')).toContainText('KiotViet');
});

test('Sai mật khẩu', async ({ page }) => {
  await login(page, 'testfnbdev41', 'admin', 'sai_pass');
  await expect(page.locator('.error-message')).toContainText(/sai/i);
});

test('Sai username', async ({ page }) => {
  await login(page, 'testfnbdev41', 'sai_user', '0909');
  await expect(page.locator('.error-message')).toContainText(/sai/i);
});

test('Sai tenant', async ({ page }) => {
  await login(page, 'wrongtenant', 'admin', '0909');
  await expect(page.locator('.error-message')).toContainText(/không tìm thấy/i);
});

test('Bỏ trống tất cả', async ({ page }) => {
  await page.goto(baseUrl);
  await page.click('button:has-text("Đăng nhập")');
  await expect(page.locator('.error-message')).toContainText(/bắt buộc/i);
});

test('Bỏ trống username', async ({ page }) => {
  await page.goto(baseUrl);
  await page.fill('input[placeholder="Tên gian hàng"]', 'testfnbdev41');
  await page.fill('input[placeholder="Mật khẩu"]', '0909');
  await page.click('button:has-text("Đăng nhập")');
  await expect(page.locator('.error-message')).toContainText(/tên đăng nhập/i);
});

test('Password sai định dạng', async ({ page }) => {
  await login(page, 'testfnbdev41', 'admin', '0');
  await expect(page.locator('.error-message')).toContainText(/mật khẩu/i);
});
