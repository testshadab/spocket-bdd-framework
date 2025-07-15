

export class SampleOrderPage {
    constructor(page) {
        this.setPage(page);
    }

    setPage(page) {
        this.page = page;
        this.searchButton = page.locator("(//div[@data-cy='upgrade-button']/following::button)[1]");
        this.searchProduct = page.locator("input[data-cy='product-search-input'][name='keywords']");
        this.jewelryCategoryCard = page.locator("div[data-heap*='jewelry-watches']");
        this.productName = page.locator("a[data-heap='listing-card-description-link']");
        this.beardProduct = page.locator("//a[@title='Blue Devil Beard Balm'][@data-heap='listing-card-image']");
        this.sampleOrderButton = page.locator("//button[text()='Sample Order']");
        this.selectVarQtyDropdown = page.locator("div[data-testid='click-outside'] button");
        this.selectVariantOpt = page.locator("div[class*=' dropdown'] p[style*='list-style-type:']");
        this.qtyDropDown = page.locator("//label[text()='Qty']//following::button");
        this.updateCardButton = page.locator("a[data-testid='update-card-chargebee']");
        this.creditUpdateCard = page.locator("button[type='submit']");
        this.addShippingInfo = page.locator("//div[@role='rowgroup']//following::button");
        this.iframeSelector = page.locator("div[class='StripeElement'] iframe[name*='__privateStripeFrame']:nth-child(1)");
        this.firsrNameInput = page.locator("input[name='first_name']");
        this.lastNameInput = page.locator("input[name='last_name']");
        this.streetAddressInput = page.locator("textarea[name='line_one']");
        this.countryInput = page.locator("(//label[contains(text(),'Country')]//following::input)[1]");
        this.stateInput = page.locator("(//label[contains(text(),'State')]//following::input)[1]");
        this.cityInput = page.locator("input[name='city']");
        this.zipCodeInput = page.locator("input[name='zip']");
        this.phoneNumInput = page.locator("input[name='phone']");
        this.confirmOrderButton = page.locator("//button[contains(text(),'Confirm')]");
        this.orderConfirmationHeader = page.locator("//span[text()='Order Confirmation']");
        this.streetAddressDropdown = page.locator("//div[@class='portal-container']//following::ul/li");
        this.countryDropdown = page.locator("div[id*='react-select']");
        this.stateDropdown = page.locator("div[id*='react-select']");
        this.closeButton = page.locator("//button[text()='Close']");
        this.orderSideBar = page.locator("(//p[text()='Orders'])[1]//parent::a");
        this.validateOrder = page.locator("(//p[contains(@class,'title-box-text')])[1]");
    }

    async navigateToItemPage() {
        await this.searchButton.waitFor({ state: 'visible' });
        await this.jewelryCategoryCard.click();
        console.log('Opening product page...1');
        const [popup] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.productName.first().click()
        ]);
        await popup.waitForURL('**/product/**');
        console.log('Opening product page...2');
        this.setPage(popup);
        //   await this.sampleOrderDetails();
    }

    async searchAndNavigateToItem(product) {
        await this.searchButton.waitFor({ state: 'visible' });
        await this.searchProduct.fill(product);
        await this.searchButton.click();
        console.log('Opening product page...1');
        const [popup] = await Promise.all([
            this.page.waitForEvent('popup'),
            await this.beardProduct.first().click()
        ]);
        await popup.waitForURL('**/product/**');
        console.log('Opening product page...2');
        this.setPage(popup);
        //   await this.sampleOrderDetails();
    }

    async sampleOrderDetails(cardNum, expDate, cvcNum) {
        console.log('Sample order details...' + cardNum + ' ' + expDate + ' ' + cvcNum);
        await this.sampleOrderButton.first().click();
        await this.page.waitForTimeout(3000);
        await this.selectVarQtyDropdown.nth(0).click();
        await this.selectVariantOpt.nth(0).click();
        await this.selectVarQtyDropdown.nth(1).click();
        await this.qtyDropDown.nth(1).click();
        await this.updateCardButton.click();
        await this.page.waitForTimeout(8000);
        await this.selectPayment(cardNum, expDate, cvcNum);
    }

    async sampleOrderDetailsWithSingleProduct(cardNum, expDate, cvcNum) {
        console.log('Sample order details...' + cardNum + ' ' + expDate + ' ' + cvcNum);
        await this.sampleOrderButton.first().click();
        await this.page.waitForTimeout(3000);
        await this.selectVarQtyDropdown.nth(1).click();
        await this.selectVariantOpt.nth(0).click();
        await this.selectVarQtyDropdown.nth(2).click();
        await this.qtyDropDown.nth(1).click();
        await this.updateCardButton.click();
        await this.page.waitForTimeout(8000);
        await this.selectPayment(cardNum, expDate, cvcNum);
    }

    async selectPayment(cardNum, expDate, cvcNum) {
        console.log('select Payment details...' + cardNum + ' ' + expDate + ' ' + cvcNum);

        const frameHandle = await this.iframeSelector.elementHandle();
        const frame = await frameHandle.contentFrame();
        await frame.fill("input[autocomplete='cc-number']", String(cardNum));
        await frame.fill("input[autocomplete='cc-exp']", String(expDate));
        await frame.fill("input[autocomplete='cc-csc']", String(cvcNum));
        await this.creditUpdateCard.click();
        await this.addShippingInfo.waitFor({ state: 'visible' });
        await this.addShippingInfo.click();
    }

    async enterOrderDetails(name, lastName, streetAddress, country, state, city, zipCode, phoneNum) {
        console.log('Entering order details...' + name + ' ' + lastName + ' ' + streetAddress + ' ' + country + ' ' + state + ' ' + city + ' ' + zipCode + ' ' + phoneNum);
        await this.firsrNameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.streetAddressInput.fill(streetAddress);
        await this.streetAddressDropdown.first().click();
        // await this.page.waitForTimeout(1000);
        // await this.countryInput.click();
        // await this.countryDropdown.first().click();
        // await this.stateInput.click();
        // await this.stateDropdown.first().click();
        await this.cityInput.click();
        await this.cityInput.fill(city);
        await this.zipCodeInput.click();
        await this.zipCodeInput.fill(zipCode);
        await this.phoneNumInput.click();
        await this.phoneNumInput.fill(phoneNum);
        await this.confirmOrderButton.click();
        await this.orderConfirmationHeader.waitFor({ state: 'visible' });
        console.log('Order confirmed');
        await this.confirmOrderButton.click();
        await this.page.waitForTimeout(4000);
    }

    async closeOrderConfirmation() {
        await this.closeButton.click();
        console.log('Order confirmation closed');
    }

    async verifySampleOrderCreated(product) {
        await this.page.waitForTimeout(4000);
        await this.orderSideBar.click();
        await this.page.waitForTimeout(8000);
        // await this.validateOrder.waitFor({ state: 'visible' });
        const orderText = await this.validateOrder.textContent();
        if (orderText.includes(product)) {
            console.log('Sample order created successfully');
        } else {
            throw new Error('Sample order creation failed');
        }
    }



}