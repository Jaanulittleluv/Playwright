import { type Locator, type Page } from "@playwright/test";

export class Portfolio {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly messageInput: Locator;
    readonly submitBtn: Locator;
    readonly snackBar: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.emailInput = page.getByLabel('Your Email');
        this.messageInput = page.getByLabel('Message');
        this.submitBtn = page.getByRole('button', { name: 'Send Email' });
       
        this.snackBar = page.locator('.mat-mdc-snack-bar-container');
    }

    async goto() {
        await this.page.goto('http://localhost:4200/');
    }

    async submitContactForm(email: string, message: string) {
        await this.emailInput.fill(email);
        await this.messageInput.fill(message);
        await this.submitBtn.click();
    }
}