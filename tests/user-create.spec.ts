import { test, expect } from '@playwright/test';

test.describe('User Creation Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/create');
    // Add a small delay to ensure the page is fully loaded
    await page.waitForTimeout(500);
  });

  test('should show initial form state correctly', async ({ page }) => {
    // Check step indicator with explicit wait
    await page.waitForSelector('.step');
    await expect(page.locator('.step').first()).toHaveClass(/active/);
    
    // Check welcome message
    await expect(page.getByRole('heading', { name: 'Welcome!' })).toBeVisible();
    
    // Check first step form fields with delay between checks
    await expect(page.getByLabel('First Name')).toBeVisible();
    await page.waitForTimeout(300);
    await expect(page.getByLabel('Last Name')).toBeVisible();
    await page.waitForTimeout(300);
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
  });

  test('should validate required fields before proceeding', async ({ page }) => {
    await page.waitForSelector('form');
    // Try to proceed without filling fields
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(500);
    
    // Form should still be on first step
    await expect(page.getByLabel('First Name')).toBeVisible();
    await expect(page.getByLabel('Last Name')).toBeVisible();
  });

  test('should navigate through all steps correctly', async ({ page }) => {
    // Fill and submit first step
    await page.waitForSelector('form');
    await page.getByLabel('First Name').fill('John');
    await page.waitForTimeout(300);
    await page.getByLabel('Last Name').fill('Smith');
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(500);

    // Verify second step
    await expect(page.getByRole('heading', { name: 'Contact Information' })).toBeVisible();
    await page.waitForSelector('#email');
    await expect(page.getByLabel('Email Address')).toBeVisible();
    
    // Fill and submit second step
    await page.getByLabel('Email Address').fill('john.smith@example.com');
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(500);

    // Verify final step
    await expect(page.getByRole('heading', { name: 'Final Steps' })).toBeVisible();
    await expect(page.getByLabel('Your Role')).toBeVisible();
  });

  test('should allow navigation back to previous steps', async ({ page }) => {
    // Navigate to second step
    await page.waitForSelector('form');
    await page.getByLabel('First Name').fill('John');
    await page.waitForTimeout(300);
    await page.getByLabel('Last Name').fill('Smith');
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(500);

    // Go back to first step
    await page.getByRole('button', { name: 'Back' }).click();
    await page.waitForTimeout(500);

    // Verify we're back on first step with data preserved
    await expect(page.getByLabel('First Name')).toHaveValue('John');
    await expect(page.getByLabel('Last Name')).toHaveValue('Smith');
  });

  test('should complete full user creation process', async ({ page }) => {
    await page.waitForSelector('form');
    
    // Fill first step
    await page.getByLabel('First Name').fill('Jane');
    await page.waitForTimeout(300);
    await page.getByLabel('Last Name').fill('Wilson');
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(500);

    // Fill second step
    await page.getByLabel('Email Address').fill('jane.wilson@example.com');
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(500);

    // Fill final step
    await page.getByLabel('Your Role').fill('Product Manager');
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Complete' }).click();
    await page.waitForTimeout(500);

    // Should redirect to users page
    await expect(page).toHaveURL('/users');
    
    // Wait for table to be visible
    await page.waitForSelector('table');
    
    // Verify new user appears in table
    const lastRow = page.locator('tr').last();
    await expect(lastRow.locator('td').nth(0)).toHaveText('Jane');
    await expect(lastRow.locator('td').nth(1)).toHaveText('Wilson');
    await expect(lastRow.locator('td').nth(2)).toHaveText('jane.wilson@example.com');
    await expect(lastRow.locator('td').nth(3)).toHaveText('Product Manager');
  });
});