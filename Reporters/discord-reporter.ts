// discord-reporter.ts
import type { Reporter, Suite, FullResult, TestCase } from '@playwright/test/reporter';
import * as path from 'path';

export default class DiscordReporter implements Reporter {
    private suite!: Suite;
    constructor(private options: { webhookUrl?: string; projectName?: string } = {}) {}

    formatTestName(t: TestCase): string {
        const project = t.parent.project()?.name;
        const file = path.relative(process.cwd(), t.location.file);
        const { line, column } = t.location;
        const names = t.titlePath().slice(3);

        return [
            project ? `[${project}]` : '',
            `${file}:${line}:${column}`,
            ...names,
        ]
            .filter(Boolean)
            .join(' › ');
    }

    formatList(label: string, tests: TestCase[], maxChars = 900): string {
        const lines: string[] = [];
        let used = 0;
        for (const t of tests) {
            const line = this.formatTestName(t);
            if (used + line.length + 1 > maxChars) {
            lines.push(`… and ${tests.length - lines.length} more`);
            break;
            }
            lines.push(line);
            used += line.length + 1;
        }
        return '```\n' + lines.join('\n') + '\n```';
    }

    onBegin(_config: unknown, suite: Suite) {
        this.suite = suite;
    }

    async onEnd(result: FullResult) {
        const url = this.options.webhookUrl;
        if (!url) return;

        const tests = this.suite.allTests();
        const failed = tests.filter(t => t.outcome() === 'unexpected');
        const flaky = tests.filter(t => t.outcome() === 'flaky');
        const skipped = tests.filter(t => t.outcome() === 'skipped');
        const passed = tests.length - failed.length - flaky.length - skipped.length;

        const runUrl = process.env.GITHUB_RUN_ID
        ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
        : undefined;

        const failures = failed
        .slice(0, 5)
        .map(t => `• ${t.title}`)
        .join('\n');

        const body = {
        embeds: [{
            title: `${result.status === 'passed' ? '✅' : '❌'} ${this.options.projectName ?? 'Playwright'}: ${result.status}`,
            color: result.status === 'passed' ? 0x2ecc71 : 0xe74c3c,
            url: runUrl,
            fields: [
            { name: 'Passed', value: String(passed), inline: true },
            { name: 'Failed', value: String(failed.length), inline: true },
            { name: 'Flaky', value: String(flaky.length), inline: true },
            { name: 'Skipped', value: String(skipped.length), inline: true },
                ...(failed.length
                ? [{ name: `${failed.length} failed`, value: this.formatList('failed', failed) }]
                : []),
            ...(flaky.length
                ? [{ name: `${flaky.length} flaky`, value: this.formatList('flaky', flaky) }]
                : []),
                ],
            timestamp: new Date().toISOString(),
        }],
        };

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        
        if (!res.ok) console.error(`Discord webhook failed: ${res.status} ${await res.text()}`);
    }
}