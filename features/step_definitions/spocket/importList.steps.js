import { When, Then } from '@cucumber/cucumber';
import { ImportList } from '../../../pages/spocket/importList.page.js';
/** @type {ImportList} */
let importListPage;

When('the user navigates to the products page and add product', async function () {
    importListPage = new ImportList(this.page);
    await importListPage.importItemList();
});

Then('the product should be added to the import list', async function () {
    await importListPage.verifyImportedListProduct();
});