import { Page } from '@playwright/test';

/**
 * Checks <link rel="canonical">
 * Logs an error if missing
 */
export async function checkCanonical(page: Page, errors: string[]) {
    const canonical = await page.locator('head > link[rel="canonical"]').first()
        .getAttribute('href').catch(() => '');

    if (!canonical) {
        errors.push('Missing canonical tag');
    }

    return { canonical: canonical || '' };
}