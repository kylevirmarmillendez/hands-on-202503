import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display dashboard header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Welcome to User Management' })).toBeVisible();
  });

  test('should show statistics cards', async ({ page }) => {
    await expect(page.getByText('Total Users')).toBeVisible();
    await expect(page.getByText('Unique Roles')).toBeVisible();
  });

  test('should display role distribution section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Role Distribution' })).toBeVisible();
    // Check for sample role with more specific selector
    await expect(page.getByRole('heading', { name: 'Software Developer' })).toBeVisible();
  });

  test('should show recent users section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Recent Users' })).toBeVisible();
    // Check for a sample user
    await expect(page.getByRole('heading', { name: 'John Doe', exact: true })).toBeVisible();
  });
});