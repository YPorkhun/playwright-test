# Playwright agent roles

Use the role that matches the requested work. Read its instructions before starting:

- [Planner](playwright-agents/planner.md): explore the application and save a comprehensive Markdown test plan.
- [Generator](playwright-agents/generator.md): execute planned scenarios and generate Playwright tests.
- [Healer](playwright-agents/healer.md): reproduce, diagnose, repair, and verify failing tests.

These are role instructions for the current agent; selecting a role does not require spawning another agent. They adapt the definitions in `.claude/agents/` to Playwright CLI.

## Shared workflow

Read [.agents/skills/playwright-cli/SKILL.md](.agents/skills/playwright-cli/SKILL.md) and the relevant references before browser work. Use `playwright-cli` for browser interactions and `npx playwright test` for test execution. Use normal file tools to read and write plans and tests.

- Inspect `package.json`, `playwright.config.ts`, the relevant plan, fixtures, and seed before working. Confirm the installed version with `npx --no-install playwright --version`. If the global CLI is unavailable, use the skill's local `npx playwright cli` fallback when available.
- For planning and generation, start the seed with `PLAYWRIGHT_HTML_OPEN=never npx playwright test tests/seed.spec.ts --debug=cli` in a background terminal session. Wait for the printed debugging instructions, attach using `playwright-cli attach tw-XXXX` with the actual session name, and use `playwright-cli resume` to execute the seed. Follow the printed instructions for stepping and pausing.
- Preserve seed and fixture setup. The current `tests/seed.spec.ts` has an empty body, so it does not navigate. After it runs, explicitly navigate with `playwright-cli goto` to the requested URL or the configured base URL. Include equivalent navigation in generated tests unless a fixture supplies it. Do not edit the seed merely to explore.
- Prefer snapshots over screenshots. Use current snapshot refs for CLI actions and semantic locators in test source. Refresh snapshots when the page changes; do not put temporary refs such as `e5` in tests.
- Use locator auto-waiting and web-first assertions. For additional synchronization, use `playwright-cli run-code` with a specific locator wait or URL wait. Never use fixed sleeps, `networkidle`, or deprecated APIs.
- Work through scenarios and failures sequentially. Detach from attached sessions with `playwright-cli detach` and stop the background test process when finished, including on failure. Close standalone browsers with `playwright-cli close`.
- Respect task scope and existing changes. Do not modify existing tests or `specs/article-search-plan.md` as part of this instruction adaptation. Future generation or healing requests must authorize changes to their target files; keep unrelated tests and plans untouched.
- Report files produced, checks performed, and unresolved failures. Never claim a test passed without running it.

See [test generation](.agents/skills/playwright-cli/references/test-generation.md) and [running/debugging tests](.agents/skills/playwright-cli/references/playwright-tests.md) for the CLI workflows.
