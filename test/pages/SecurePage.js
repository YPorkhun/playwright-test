
export class SecurePage {
  constructor(page) {
    this.page = page;
    this.message = '#flash';
  }

  async getMessage() {
    return await this.page.textContent(this.message);
  }
}