
import { type Page } from '@playwright/test';

export class CheckoutStepTwoPage {
  constructor(private readonly page: Page) {}

  async getTotalPrice(): Promise<string> {
    const total = await this.page
      .locator('[data-test="total-label"]')
      .innerText();

    return total.replace('Total: ', '').trim();
  }


async getProductNames(): Promise<string[]> {
  const productNames = this.page.locator(
    '[data-test="inventory-item-name"]'
  );

  await productNames.first().waitFor({
    state: 'visible',
    timeout: 10000,
  });

  return await productNames.allInnerTexts();
}


  async finish(): Promise<void> {
    await this.page.locator('[data-test="finish"]').click();
  }

  async cancel(): Promise<void> {
    await this.page.locator('[data-test="cancel"]').click();
  }
}
