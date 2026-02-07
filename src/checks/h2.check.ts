import { Page } from '@playwright/test';

/**
 * Checks all <h2> elements on the page
 * Logs an error if none are found
 */
export async function checkH2(page: Page, errors: string[]) {
    const h2Elements = await page.locator('h2').all();
    const h2Count = h2Elements.length;
    const h2Texts: string[] = [];

    if (h2Count === 0) {
        errors.push('No H2 tags found');
    } else {
        for (const h2 of h2Elements) {
            const text = await h2.innerText().catch(() => '');
            h2Texts.push(text.trim());
        }
    }

    return { h2Count, h2Texts };
}