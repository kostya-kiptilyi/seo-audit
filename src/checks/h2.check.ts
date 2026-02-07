import { Page } from '@playwright/test';

/**
 * Check all <h2> elements on the page
 * @param page - Playwright Page object
 * @param errors - Array to collect SEO errors
 * @returns Object with H2 count and array of texts
 */
export async function checkH2(page: Page, errors: string[]) {
    // Get all <h2> elements on the page
    const h2Elements = await page.locator('h2').all();

    const h2Count = h2Elements.length;
    const h2Texts: string[] = [];

    if (h2Count === 0) {
        // Add an error if no <h2> tags are found
        errors.push('No H2 tags found');
    } else {
        // Iterate through each <h2> and collect its text
        for (const h2 of h2Elements) {
            const text = await h2.innerText();
            h2Texts.push(text.trim());
        }
    }

    return {
        h2Count,
        h2Texts,
    };
}