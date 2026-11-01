
import { type Page } from '@playwright/test';

export class CheckoutStepOnePage {
  constructor(private readonly page: Page) {}

  async fillFirstName(firstName: string): Promise<void> {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.page.locator('[data-test="lastName"]').fill(lastName);
  }

  async fillZipCode(zipCode: string): Promise<void> {
    await this.page.locator('[data-test="postalCode"]').fill(zipCode);
  }

  async continue(): Promise<void> {
    await this.page.locator('[data-test="continue"]').click();
  }
}
