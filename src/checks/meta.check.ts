import { Page } from '@playwright/test';

/**
 * Checks <meta name="description">
 * Logs an error if missing
 */
export async function checkMetaDescription(page: Page, errors: string[]) {
    const meta = await page.locator('head > meta[name="description"]').first()
        .getAttribute('content').catch(() => '');

    if (!meta) {
        errors.push('Missing meta description');
    }

    return {
        metaDescription: meta || '',
        metaLength: meta?.length || 0,
    };
}