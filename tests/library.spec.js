import { test, expect } from '@playwright/test';

test('shows the starter shelf and filters books', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A little space for big stories.');
  await expect(page.getByRole('listitem')).toHaveCount(3);
  await page.screenshot({ path: testInfo.outputPath('desktop.png'), fullPage: true });

  await page.getByRole('button', { name: 'Finished', exact: true }).click();
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Little Women', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'To read', exact: true }).click();
  await expect(page.getByRole('listitem')).toHaveCount(2);
});

test('adds, completes, persists, and removes a book', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Book title', { exact: true }).fill('  The Secret Garden  ');
  await page.getByLabel('Author', { exact: true }).fill('Frances Hodgson Burnett');
  await page.getByRole('button', { name: 'Add to my shelf' }).click();
  await expect(page.getByRole('listitem')).toHaveCount(4);
  await expect(page.getByLabel('Book title', { exact: true })).toHaveValue('');

  await page.getByRole('button', { name: 'Mark as read: The Secret Garden', exact: true }).click();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Mark unread: The Secret Garden', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Mark unread: The Secret Garden', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Mark as read: The Secret Garden', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Remove The Secret Garden', exact: true }).click();
  await page.reload();
  await expect(page.getByRole('listitem')).toHaveCount(3);
  await expect(page.getByRole('heading', { name: 'The Secret Garden', exact: true })).toHaveCount(0);
});

test('rejects whitespace-only entries', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Book title', { exact: true }).fill('   ');
  await page.getByLabel('Author', { exact: true }).fill('An author');
  await page.getByRole('button', { name: 'Add to my shelf' }).click();
  await expect(page.getByRole('alert')).toHaveText('Please enter a title and an author.');
  await expect(page.getByRole('listitem')).toHaveCount(3);
});

test('shows an empty shelf and keeps it empty after reloading', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Remove The Hobbit', exact: true }).click();
  await page.getByRole('button', { name: 'Remove A Walk in the Woods', exact: true }).click();
  await page.getByRole('button', { name: 'Remove Little Women', exact: true }).click();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'A little room for a new story.' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);
});

test('recovers from invalid saved data', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('little-library-books', 'not valid JSON');
  });
  await page.goto('/');
  await expect(page.getByRole('listitem')).toHaveCount(3);
});

test('warns when browser storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => { throw new Error('Storage is blocked'); };
  });
  await page.goto('/');
  await expect(page.getByRole('alert')).toContainText('Your browser cannot save this shelf.');
  await expect(page.getByRole('listitem')).toHaveCount(3);
});

test('fits a narrow mobile viewport', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Add to my shelf' })).toBeVisible();
  const hasHorizontalOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  expect(hasHorizontalOverflow).toBe(false);
  await page.screenshot({ path: testInfo.outputPath('mobile.png'), fullPage: true });
});
