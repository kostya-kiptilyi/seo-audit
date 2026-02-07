import { test } from '@playwright/test';
import { runAudit } from '../../src/core/auditor';
import { loadUrls } from '../../src/utils/loadUrls';
import fs from 'fs';
import { parse } from 'json2csv';

test('SEO batch audit', async ({ page }) => {
    // Set generous timeout for the whole batch
    test.setTimeout(120000); // 2 minutes

    // Load URLs from data/urls.txt
    const urls = loadUrls();

    const results: any[] = [];

    // Ensure reports folder exists
    if (!fs.existsSync('reports')) {
        fs.mkdirSync('reports');
    }

    for (const url of urls) {
        try {
            // Navigate to the page, wait for DOM content loaded, timeout 60s
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

            // Run SEO audit on the page
            const result = await runAudit(page, url);

            results.push(result);
            console.log(result);
        } catch (e: any) {
            // Record error but continue with next URL
            results.push({ url, errors: ['Page failed to load'] });
            console.error(`Error loading ${url}:`, e.message);
        }
    }

    // Save JSON report
    fs.writeFileSync('reports/audit.json', JSON.stringify(results, null, 2), 'utf-8');

    // Convert to CSV and save
    try {
        const csv = parse(results, { fields: [
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
                'canonical'
            ]});
        fs.writeFileSync('reports/audit.csv', csv, 'utf-8');
    } catch (err) {
        console.error('Error generating CSV:', err);
    }
});