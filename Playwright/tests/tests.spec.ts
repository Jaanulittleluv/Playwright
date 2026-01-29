import { test, expect } from '@playwright/test';
import { Portfolio } from '../pages/Portfolio';

test('User can send an email via contact form', async ({ page }) => {
  const portfolio = new Portfolio(page);

  await portfolio.goto();
  
  await portfolio.submitContactForm('test@example.com', 'Hello, this is a Playwright test!');

  await expect(portfolio.snackBar).toBeVisible();
  await expect(portfolio.snackBar).toContainText('Your message has been sent successfully');
});