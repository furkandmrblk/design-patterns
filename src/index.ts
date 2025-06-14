import { readdirSync } from 'fs';
import { join } from 'path';

async function runPattern(patternName: string) {
    try {
        const patternPath = join(__dirname, 'design-patterns', patternName);
        const pattern = await import(join(patternPath, 'index.ts'));
        
        if (pattern.default && typeof pattern.default === 'function') {
            pattern.default();
        }
    } catch (error) {
        console.error(`Error running pattern ${patternName}:`, error);
    }
}

function listAvailablePatterns(): string[] {
    try {
        return readdirSync(join(__dirname, 'design-patterns'));
    } catch (error) {
        console.error('Error reading patterns directory:', error);
        return [];
    }
}

function main() {
    const patternName = process.argv[2];
    
    if (!patternName) {
        console.log('Select an available pattern:\n');
        console.log(listAvailablePatterns().join('\n'));
        console.log('\nUsage: npm start <pattern-name>');
        return;
    }

    runPattern(patternName);
}

main();