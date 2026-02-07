import { test } from '@playwright/test';
import { runAudit } from '../../src/core/auditor';
import { loadUrls } from '../../src/utils/loadUrls';
import fs from 'fs';
import { parse } from 'json2csv';

// Helper function to enforce per-page timeout
function timeout(ms: number) {
    return new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Audit timed out')), ms)
    );
}

test('SEO batch audit', async ({ browser }) => {
    // Disable global timeout for long batch audits
    test.setTimeout(0);

    // Load URLs from data/urls.txt
    const urls = loadUrls();
    const results: any[] = [];

    console.log(`Starting SEO audit for ${urls.length} URLs`);

    // Ensure reports directory exists
    if (!fs.existsSync('reports')) {
        fs.mkdirSync('reports');
    }

    for (const url of urls) {
        // Create isolated browser context per URL
        const context = await browser.newContext();
        const page = await context.newPage();

        try {
            console.log(`\nAuditing: ${url}`);

            // Navigate to page and wait for DOM
            await page.goto(url, {
                waitUntil: 'domcontentloaded',
                timeout: 60000, // max 60s for navigation
            });

            // Run SEO audit, force timeout after 60s per page
            const result = await Promise.race([
                runAudit(page, url),
                timeout(60000)
            ]);

            results.push(result);
            console.log('Result:', result);
        } catch (error: any) {
            // Do not fail the test, just record the error
            console.error(`Error loading ${url}:`, error.message);

            results.push({
                url,
                errors: [error.message],
            });
        } finally {
            // Always close context to avoid memory leaks
            await context.close();
        }
    }

    // Save JSON report
    fs.writeFileSync(
        'reports/audit.json',
        JSON.stringify(results, null, 2),
        'utf-8'
    );

    // Save CSV report
    try {
        const csv = parse(results, {
            fields: [
                'url',
                'errors',
                'title',
                'titleLength',
                'h1',
                'h1Length',
                'h2Count',
                'h2Texts',
                'metaDescription',
                'metaLength',
                'canonical',
            ],
        });

        fs.writeFileSync('reports/audit.csv', csv, 'utf-8');
    } catch (err) {
        console.error('Error generating CSV:', err);
    }

    console.log('\nSEO audit finished');
    console.log(`Total audited URLs: ${results.length}`);
});