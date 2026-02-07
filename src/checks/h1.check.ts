import { Page } from '@playwright/test';

/**
 * Checks <title> of the page
 * If not found or length invalid, logs an error but continues
 */

export async function checkH1(page: Page, errors: string[]) {
    const h1Element = await page.locator('h1').first();
    const h1 = await h1Element.innerText().catch(() => '');
    const h1Length = h1.length;

    if (!h1) {
        errors.push('Missing H1 tag');
    }

    return { h1, h1Length };
}