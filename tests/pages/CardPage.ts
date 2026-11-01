
import { type Page, type Locator } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  private getProductByTitle(title: string): Locator {
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return this.page.locator('.cart_item').filter({
      has: this.page.locator('.inventory_item_name', {
        hasText: new RegExp(`^${escapedTitle}$`),
      }),
    });
  }

  async removeFromCartByTitle(title: string): Promise<void> {
    const product = this.getProductByTitle(title);
    await product.getByRole('button', { name: 'Remove' }).click();
  }

  async getPriceByTitle(title: string): Promise<string> {
    const product = this.getProductByTitle(title);
    return (await product.locator('.inventory_item_price').innerText()).trim();
  }

  async checkout(): Promise<void> {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async continueShopping(): Promise<void> {
    await this.page.locator('[data-test="continue-shopping"]').click();
  }
}
