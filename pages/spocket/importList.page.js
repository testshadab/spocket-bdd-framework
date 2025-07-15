
export class ImportList {
  constructor(page) {
    this.page = page;
    this.searchButton = page.locator("(//div[@data-cy='upgrade-button']/following::button)[1]");
    this.jewelryCategoryCard = page.locator("div[data-heap*='jewelry-watches']");
    this.techCategoryCard = page.locator("div[data-heap*='tech-accessories']");
    this.firstItemOfList = page.locator("(//a[@data-cy='listing-card-image'])[1]");
    this.removeFromImpListButton = page.locator("button[title='Remove product from import list']");
    this.addToImportListButton = page.locator("button[data-heap*='add-to-import-list-button']");
    this.importedcheck = page.locator("img[src*='/icon-check.svg'] + p");
    this.addedProductName = page.locator("a[data-heap='listing-card-description-link']");
    this.importedProductName = page.locator("section[data-testid='import-list-product-tab'] h4");
    this.importListSideBar = page.locator("(//a[@data-heap='sidebar-post-upgrade-import-link'])[1]");
    this.removeButton = page.locator("button[data-heap='import-list-product-remove-button']");
    this.spocketLogo = page.locator("a[data-heap='sidebar-desktop-logo-link']");
    this._addedName = '';
  }

  async navigate() {
    // Implement navigation to the import list page if needed
    // Example: await this.page.goto('your-import-list-url');
  }

  async removeImpItems() {
    await this.importListSideBar.click();
    await this.page.waitForTimeout(10000);
    while (await this.removeButton.isVisible()) {
      await this.removeButton.first().click();
      await this.page.waitForTimeout(5000);
    }
  }

  async importItemList() {
    await this.searchButton.waitFor({ state: 'visible' });
    await this.removeImpItems();
    await this.spocketLogo.first().click();
    await this.techCategoryCard.scrollIntoViewIfNeeded();
    await this.techCategoryCard.click();
    await this.firstItemOfList.waitFor({ state: 'visible' });
    await this.firstItemOfList.hover();
    if (await this.removeFromImpListButton.isVisible()) {
      await this.removeFromImpListButton.click();
    }
    const addedName = (await this.addedProductName.first().textContent()).trim();
    this._addedName = addedName;
    await this.addToImportListButton.first().click();
    await this.importedcheck.waitFor({ state: 'visible' });
    const importedText = (await this.importedcheck.textContent()).trim();
    if (!importedText.includes('Imported')) {
      throw new Error('Product was not imported successfully');
    }
    await this.importListSideBar.click();
  }

  async verifyImportedListProduct() {
    await this.page.waitForTimeout(10000);
    const importedName = (await this.importedProductName.textContent()).trim();
    if (importedName !== this._addedName) {
      throw new Error(`Imported name (${importedName}) does not match added name (${this._addedName})`);
    }
    await this.removeButton.click();
  }
}