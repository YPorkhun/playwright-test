# Article search test plan

Explored on 2026-10-25 at http://104.168.59.50/articles using Playwright CLI through the terminal, without signing in.

## Instructions and access

The requested `AGENTS.md` and `playwright-agents/planner.md` were absent from the project. Reading each returned `No such file or directory`; a broader file search did not locate them. This plan follows the requested planner role and the available Playwright CLI skill.

Initial browser launch was blocked by the sandbox:

```text
Error: EPERM: operation not permitted, open '/Users/yuliia_porkhun_work/Library/Caches/ms-playwright/daemon/59cceddbea3e308f/default.err'
```

Launch succeeded with escalated terminal access. Separate terminal calls also reported `Browser 'default' is not open`; running dependent CLI commands in one terminal invocation allowed exploration to complete.

## Observed behavior

- Initial loading text: `Завантаження модуля…`. Loaded title: `QA Dojo — Testing articles`.
- Global feed initially displayed `9 articles`, with nine article cards.
- Search field: role `searchbox`, accessible name `Search headlines…` (snapshot ref `e27`).
- Adjacent controls: sorting select (`Newest first` selected; `Oldest first` and `Most favorited` available), unchecked `With cover`, `Reset`, and `Apply`.
- Filling `WebdriverIO` left the snapshot showing all nine articles before Apply.
- Clicking Apply changed the count to `1 article` and left exactly one article card. The query stayed in the field and the URL remained `/articles`.
- Result heading: `Очікування у WebdriverIO без зайвих sleep`.
- Result metadata: `maksym · 21 October 2026 · Tools`; tags: `automation`, `waits`, `webdriverio`.
- Result description: `Як замінити фіксовані паузи на перевірку реального стану інтерфейсу.`
- Heading/card link and `Read on →` both pointed to `/articles/article/ochikuvannya-u-webdriverio-bez-zajvih-sleep`. Navigation was not exercised.

## Scenarios supported by observations

Use a fresh anonymous visit for each scenario and wait for the searchbox to be visible. Counts and exact metadata below describe the observed seed data; ensure equivalent fixture data exists before automating.

### 1. Initial search controls and feed

1. Open `/articles` and wait for the module to load.
2. Verify the empty `Search headlines…` searchbox and visible Apply and Reset buttons.
3. Verify sorting defaults to Newest first and With cover is unchecked.
4. Verify `9 articles` and nine article cards for the observed seed data.

### 2. Enter a search query before applying

1. Start from the initial feed.
2. Fill the searchbox with `WebdriverIO`.
3. Verify the field contains the query.
4. Verify the pre-Apply snapshot still shows `9 articles` and nine cards.

The observation establishes the immediate pre-Apply state; delayed/debounced filtering was not separately investigated.

### 3. Apply a matching headline search

1. Start from the initial feed and fill `WebdriverIO`.
2. Click Apply.
3. Verify `1 article` and exactly one article card.
4. Verify its heading is `Очікування у WebdriverIO без зайвих sleep` and unrelated initial headlines are absent.
5. Verify the query remains `WebdriverIO`, the URL remains `/articles`, sorting stays Newest first, and With cover stays unchecked.

### 4. Validate the matching result card

1. Perform scenario 3.
2. Within the single article, verify the observed author, date, category, description, and three tags listed above.
3. Verify both the heading/card link and Read on link have the observed article URL.

## Follow-up exploration before defining expected behavior

The following are useful additional scenarios but were not exercised: Reset after searching; an unmatched query and empty-state copy; empty search submission; Enter-key submission; case sensitivity; partial headlines; leading/trailing spaces; Unicode queries; search combined with sorting, cover filtering, or a tag; reload persistence; and opening a result. Do not treat their outcomes as confirmed requirements.

## CLI commands and results

Commands below were executed in dependent sequences within one terminal invocation where needed.

```sh
playwright-cli open http://104.168.59.50/articles
# Succeeded with escalated access; initially showed the loading module.

playwright-cli snapshot
# Initial snapshot: loading text. Loaded snapshot after waiting: nine articles,
# searchbox e27, Apply e33, Reset e32, and the controls documented above.

playwright-cli run-code 'async page => { await page.getByRole("searchbox", { name: "Search headlines…" }).waitFor(); }'
# Succeeded; loaded title was QA Dojo — Testing articles.

playwright-cli fill 'getByRole("searchbox", { name: "Search headlines…" })' WebdriverIO
playwright-cli snapshot
# Field contained WebdriverIO; feed still displayed 9 articles.

playwright-cli click 'getByRole("button", { name: "Apply", exact: true })'
playwright-cli snapshot
# 1 article: Очікування у WebdriverIO без зайвих sleep.

playwright-cli close
# Browser 'default' closed.
```

Additional loading inspection used `getByText("Завантаження модуля…", { exact: true }).waitFor({ state: "hidden", timeout: 30000 })`, which failed with a strict-mode violation because two loading elements matched. Retrying with `.first()` succeeded. The final search sequence waited directly for the searchbox.

Saved post-Apply snapshot: `../.playwright-cli/page-2026-10-25T12-44-40-537Z.yml`.

No existing automated tests were modified or run.
