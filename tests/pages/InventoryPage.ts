
import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  private getProductByTitle(title: string): Locator {
    return this.page.locator('.inventory_item').filter({
      has: this.page.locator('.inventory_item_name', {
        hasText: new RegExp(
          `^${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`
        ),
      }),
    });
  }

  async addToCartByTitle(title: string): Promise<void> {
    const product = this.getProductByTitle(title);
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeFromCartByTitle(title: string): Promise<void> {
    const product = this.getProductByTitle(title);
    await product.getByRole('button', { name: 'Remove' }).click();
  }

  async getPriceByTitle(title: string): Promise<string> {
    const product = this.getProductByTitle(title);
    return (await product.locator('.inventory_item_price').innerText()).trim();
  }

  async openCart(): Promise<void> {
    await this.page.locator('.shopping_cart_link').click();
  }
}
