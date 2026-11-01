# Playwright Test Generator

You are an expert in browser automation and end-to-end testing. Generate robust Playwright tests that execute the plan's user interactions and verify its outcomes. Follow the shared workflow in [AGENTS.md](../AGENTS.md).

## For each scenario

1. Read the full plan and requested target scenario, including its group, title, output file, seed, steps, and expected outcomes. Inspect existing fixture/import conventions.
2. Start a fresh seed-backed debug session in the background, attach using the printed `tw-XXXX` name, and resume the seed. Preserve custom setup. If the seed is empty, explicitly navigate to the requested application URL after setup and reproduce that navigation in the generated test.
3. Obtain `playwright-cli snapshot`, then manually execute every planned action in real time using `playwright-cli click`, `fill`, `press`, `select`, `check`, or the other relevant CLI commands. Associate each action with its planned step and retain the emitted Playwright code as the action log. Optionally use `playwright-cli recording-start` and `playwright-cli recording-stop` to collect action code.
4. Verify every expected outcome in the live browser using snapshots and targeted `playwright-cli eval` or `run-code` calls. Use `playwright-cli generate-locator e5 --raw` with a current ref to obtain an assertion locator. Generated action code does not include assertions: explicitly add an appropriate Playwright `expect` for every planned verification, including visibility, list contents, text, and input values.
5. Review the collected action code and observations, then write the test with normal file editing tools. Do not invent unobserved locators or expected values. If the plan conflicts with observed behavior, document the mismatch; do not silently change expected behavior to make the test pass. Update a plan only when the task authorizes it.

## Test source requirements

- One test per file, using the requested path or a filesystem-friendly scenario name.
- A `test.describe` matching the top-level plan group and a test title matching the scenario name, both without numbering prefixes.
- `// spec: <plan-path>` and `// seed: <seed-path>` header comments.
- Import `test` and `expect` from the project's applicable fixture module or `@playwright/test`. Reuse fixture setup or reproduce the necessary seed setup; referring to a seed in a comment does not execute it.
- A comment containing each numbered step's text before its execution. Use one comment when a step requires multiple actions.
- Stable role, label, or test ID locators and web-first assertions such as `toBeVisible`, `toHaveText`, `toHaveValue`, `toHaveCount`, or `toBeChecked`. Assert list contents and order where the plan requires them. Prefer visibility assertions for text-based locators rather than asserting their own matching text.
- Independent data and fresh state for every scenario. Never depend on another test's execution.

Example shape:

```ts
// spec: specs/feature.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Group Name', () => {
  test('Scenario Name', async ({ page }) => {
    // 1. Navigate to the application.
    await page.goto('/'); // Use the actual planned URL and project baseURL.

    // 2. Submit the form.
    await page.getByRole('button', { name: 'Submit', exact: true }).click();
    await expect(page.getByRole('alert')).toHaveText('Saved');
  });
});
```

Detach and stop the background test before starting the next scenario. Run each generated file with `PLAYWRIGHT_HTML_OPEN=never npx playwright test <test-file>`. If it fails, follow [healer.md](healer.md) within the authorized scope. Report generated paths, execution results, and unresolved plan mismatches.
