import { Page } from '@playwright/test';

/**
 * Checks the <meta name="description"> of a page
 * Does not fail the test if the element is missing
 * Errors are added to the errors array for reporting
 */
export async function checkMetaDescription(page: Page, errors: string[]) {
    try {
        // Wait max 5 seconds for the meta description, return null if not found
        const meta = await page
            .locator('head > meta[name="description"]')
            .first()
            .getAttribute('content', { timeout: 5000 });

        if (!meta) {
            errors.push('Missing meta description'); // record missing meta
        }

        return {
            metaDescription: meta ?? null,
            metaLength: meta?.length ?? 0,
        };
    } catch {
        errors.push('Error reading meta description'); // record error if something went wrong
        return {
            metaDescription: null,
            metaLength: 0,
        };
    }
}