import { promises as fs } from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class BrandedInvoicePage {
    constructor(page) {
        this.page = page;
        this.settingsButton = page.locator("(//img[@alt='Settings icon']//ancestor::span)[1]");
        this.brandedInvoiceMenu = page.locator("a[title='Membership']");
        this.billingHistoryHeading = page.locator("//h3[text()='Billing History']");
        this.downloadTemplateButton = page.locator("(//th[text()='E-Invoice']//following::img[contains(@src,'icon-download.svg')])[1]");
        this.downloadSuccessMsg = page.locator("div[data-testid='download-success']");
        this.downloadPath = path.resolve(__dirname, "../../downloadfile");
    }

    async navigateToBrandedInvoiceSettings() {
        await this.settingsButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.settingsButton.click();
        await this.brandedInvoiceMenu.waitFor({ state: 'visible', timeout: 10000 });
        await this.brandedInvoiceMenu.click();
    }

    async downloadFile() {
        await this.billingHistoryHeading.scrollIntoViewIfNeeded();
        try {
            await this.page.waitForTimeout(5000); // Ensure page is fully loaded
            const downloadCount = await this.downloadTemplateButton.count();

            if (downloadCount === 0) {
                console.log("No download button found - skipping.");
                return false;
            }

            // Ensure download folder exists
            await fs.mkdir(this.downloadPath, { recursive: true });

            // Set up download listener
            const [download] = await Promise.all([
                this.page.waitForEvent("download", { timeout: 30000 }),
                this.downloadTemplateButton.first().click({ timeout: 10000, force: true }),
            ]);

            if (!download) {
                console.log("No download triggered.");
                return false;
            }

            const suggestedFileName = download.suggestedFilename();
            const fullDownloadPath = path.join(this.downloadPath, suggestedFileName);

            // Save the file with timeout
            await Promise.race([
                download.saveAs(fullDownloadPath),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Save timeout")), 30000)
                ),
            ]);

            console.log(`File downloaded to: ${fullDownloadPath}`);
            return true;

        } catch (error) {
            console.error("Error downloading file:", error.message);
            return false;
        }
    }


    async validateDownloadedFile(partialName) {
        try {
            const files = await fs.readdir(this.downloadPath);
            const matched = files.find(f => f.includes(partialName));
            if (!matched) {
                throw new Error(`No file found in ${this.downloadPath} including "${partialName}"`);
            }
            const filePath = path.join(this.downloadPath, matched);
            const stats = await fs.stat(filePath);
            if (stats.size > 0) {
                console.log(`File exists and is not empty: ${filePath}`);
                return true;
            } else {
                throw new Error(`Downloaded file is empty: ${filePath}`);
            }
        } catch (error) {
            throw new Error(`Downloaded file not found or invalid: ${partialName} in ${this.downloadPath}`);
        }
    }

}
