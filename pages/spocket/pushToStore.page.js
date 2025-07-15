export class PushToStore {
    constructor(page) {
        this.page = page;
        this.pushToStoreButton = page.locator("button[title='Push To Store']");
        this.liveProductsSideBar = page.locator("(//a[@data-heap='sidebar-post-upgrade-products-link'])[1]");
        this.importedProductName = page.locator("section[data-testid='import-list-product-tab'] h4");
        this.liveAddedProduct = page.locator("//a[contains(@data-heap,'products-page-product-image-link')]//following::p");
    }

    async pushToStoreItem() {
        await this.pushToStoreButton.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(3000);
        const addedName = (await this.importedProductName.first().textContent()).trim();
        this._addedName = addedName;
        await this.pushToStoreButton.waitFor({ state: 'visible' });
        await this.pushToStoreButton.click();
        await this.page.waitForTimeout(10000);
    }


    async liveProductsItem() {
        await this.liveProductsSideBar.click();
        await this.page.waitForTimeout(2000);
        await this.page.reload();
        const liveAddedProductName = (await this.liveAddedProduct.first().textContent()).trim();
        console.log(`Live added product name is: ${liveAddedProductName}`);

        if (this._addedName !== liveAddedProductName) {
            throw new Error(`Product name mismatch! Expected: "${this._addedName}", Found: "${liveAddedProductName}"`);
        }
        console.log(`Product name validated: "${liveAddedProductName}"`);
    }
}