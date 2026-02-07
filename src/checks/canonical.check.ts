import { Page } from '@playwright/test';

export async function checkCanonical(page: Page, errors: string[]) {
    const canonical = await page.locator('head > link[rel="canonical"]').first().getAttribute('href');

    if (!canonical) {
        errors.push('Missing canonical link');
        return {};
    }

    return { canonical };
}