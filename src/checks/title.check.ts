import { Page } from '@playwright/test';

export async function checkTitle(page: Page, errors: string[]) {
    const title = await page.title();

    if (!title) {
        errors.push('Missing title');
        return {};
    }

    if (title.length < 10 || title.length > 60) {
        errors.push(`Title length invalid: ${title.length}`);
    }

    return { title, titleLength: title.length };
}