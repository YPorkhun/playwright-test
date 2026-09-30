import { test, expect } from '@playwright/test';

test.describe('Sortable table', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://104.168.59.50/laboratory/interactions');
  });

  test('Checkbox and count increment', async ({ page }) => {

    const table = page.locator('xpath=//table[@data-testid="interactions-table"]');
    const checkboxes = page.locator('xpath=//table[@data-testid="interactions-table"]//input[@type="checkbox"]');
    const selectedCount = page.locator('xpath=//*[contains(normalize-space(.), "Вибрано")]').last();

    await expect(table).toBeVisible();
    await expect(checkboxes.nth(0)).not.toBeChecked();

    await checkboxes.nth(0).check();

    await expect(checkboxes.nth(0)).toBeChecked();
    await expect(selectedCount).toContainText('1');

    await checkboxes.nth(1).check();

    await expect(checkboxes.nth(1)).toBeChecked();
    await expect(selectedCount).toContainText('2');
  });


  test('Check sorting and order change', async ({ page }) => {
  const durationSort = page.locator('xpath=//button[@data-testid="interactions-sort-duration"]');
  const durationCells = page.locator('xpath=//table[@data-testid="interactions-table"]//tbody/tr/td[4]');

  await durationSort.click();

  await expect(durationCells).toHaveText([
    '0.0 s',
    '5.7 s',
    '8.4 s',
    '12.1 s'
  ]);

  await durationSort.click();

  await expect(durationCells).toHaveText([
    '12.1 s',
    '8.4 s',
    '5.7 s',
    '0.0 s'
  ]);
});

});