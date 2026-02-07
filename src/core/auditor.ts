// src/core/auditor.ts
import { Page } from '@playwright/test';
import { checkTitle } from '../checks/title.check';
import { checkH1 } from '../checks/h1.check';
import { checkH2 } from '../checks/h2.check';
import { checkMetaDescription } from '../checks/meta.check';
import { checkCanonical } from '../checks/canonical.check';

/**
 * Run SEO audit on a single page
 * @param page - Playwright Page object
 * @param url - URL to audit
 * @returns Audit result object with errors and element data
 */
export async function runAudit(page: Page, url: string) {
    // Array to store any SEO errors for this page
    const errors: string[] = [];

    // Check <title> element
    const titleData = await checkTitle(page, errors);

    // Check <h1> element
    const h1Data = await checkH1(page, errors);

    // Check <h2> elements
    const h2Data = await checkH2(page, errors);

    // Check <meta name="description">
    const metaData = await checkMetaDescription(page, errors);

    // Check <link rel="canonical">
    const canonicalData = await checkCanonical(page, errors);

    // Combine all data and return
    return {
        url,
        errors,        // array of error messages
        ...titleData,
        ...h1Data,
        ...h2Data,     // H2 count and texts
        ...metaData,
        ...canonicalData,
    };
}