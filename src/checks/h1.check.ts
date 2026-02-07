import { Page } from '@playwright/test';

/**
 * Checks the first <h1> on the page
 * If not found, the test continues and logs an error
 */
export async function checkH1(page: Page, errors: string[]) {
    try {
        const h1 = await page.locator('h1').first().textContent({ timeout: 5000 });
        if (!h1) errors.push('Missing H1'); // record missing H1
        return { h1, h1Length: h1?.length ?? 0 };
    } catch {
        errors.push('Error reading H1'); // record error if locator fails
        return { h1: null, h1Length: 0 };
    }
}