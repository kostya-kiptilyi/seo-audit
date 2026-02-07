import fs from 'fs';
import path from 'path';

export function loadUrls(): string[] {
    const filePath = path.resolve(__dirname, '../../data/urls.txt');
    return fs
        .readFileSync(filePath, 'utf-8')
        .split('\n')
        .map(u => u.trim())
        .filter(Boolean);
}