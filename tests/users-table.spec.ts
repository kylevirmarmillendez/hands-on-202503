import { test, expect } from '@playwright/test';

test.describe('Users Table Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/users');
  });

  test('should display users table with headers', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Created Users' })).toBeVisible();
    
    // Check table headers using th elements
    const headers = ['First Name', 'Last Name', 'Email', 'Role'];
    for (const header of headers) {
      await expect(page.locator('th', { hasText: header })).toBeVisible();
    }
  });

  test('should display sample user data', async ({ page }) => {
    // Check for first row data with more specific selectors
    const firstRow = page.locator('tr').nth(1); // First row after header
    await expect(firstRow.locator('td').nth(0)).toHaveText('John');
    await expect(firstRow.locator('td').nth(1)).toHaveText('Doe');
    await expect(firstRow.locator('td').nth(2)).toHaveText('john.doe@example.com');
    await expect(firstRow.locator('td').nth(3)).toHaveText('Software Developer');
  });

  test('should show newly created user in the table', async ({ page }) => {
    // First create a new user
    await page.goto('/create');
    
    // Fill first step
    await page.getByLabel('First Name').fill('Test');
    await page.getByLabel('Last Name').fill('User');
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Fill second step
    await page.getByLabel('Email Address').fill('test.user@example.com');
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Fill final step and submit
    await page.getByLabel('Your Role').fill('QA Engineer');
    await page.getByRole('button', { name: 'Complete' }).click();
    
    // Verify the new user appears in the last row of the table
    const lastRow = page.locator('tr').last();
    await expect(lastRow.locator('td').nth(0)).toHaveText('Test');
    await expect(lastRow.locator('td').nth(1)).toHaveText('User');
    await expect(lastRow.locator('td').nth(2)).toHaveText('test.user@example.com');
    await expect(lastRow.locator('td').nth(3)).toHaveText('QA Engineer');
  });
});