
import { test, expect } from './tests-with-fixtures/fixtures/api-fixtures';

// TEST 1: Change article title using route.continue()
test('route.continue: changes article title before publishing', async ({
  page,
  apiUser,
}) => {
  const id = Date.now();
  const formTitle = `Article from form ${id}`;
  const replacedTitle = `Article from route ${id}`;

  let intercepted = false;

  await page.route('**/api/articles', async (route) => {
    const request = route.request();

    if (request.method() !== 'POST') {
      await route.continue();
      return;
    }

    intercepted = true;

    const body = request.postDataJSON();

    await route.continue({
      postData: JSON.stringify({
        ...body,
        article: {
          ...body.article,
          title: replacedTitle,
        },
      }),
      headers: {
        ...request.headers(),
        'content-type': 'application/json',
      },
    });
  });

  await page.goto('/articles');

  await page.getByRole('link', { name: 'New Article' }).click();

  await page.getByPlaceholder('Article Title').fill(formTitle);

  await page.getByPlaceholder('What is this article about?').fill(
    'Testing page.route continue'
  );

  await page.getByPlaceholder('Write the article', {
  exact: false,
}).fill('Article content for Playwright homework.');

  const responsePromise = page.waitForResponse(
    (response) =>
      new URL(response.url()).pathname === '/api/articles' &&
      response.request().method() === 'POST'
  );

  await page.getByTestId('editor-submit').click();

  const response = await responsePromise;

  expect(response.status()).toBe(201);
  expect(intercepted).toBe(true);

  const responseBody = await response.json();
  expect(responseBody.article.title).toBe(replacedTitle);

  await expect(
    page.getByRole('heading', { name: replacedTitle })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: formTitle })
  ).toHaveCount(0);
});

// TEST 2: Mock articles list using route.fulfill()
test('route.fulfill: displays one mocked article', async ({
  page,
  apiUser,
}) => {
  const mockedTitle = 'My mocked article';

  const mockedArticle = {
    slug: 'my-mocked-article',
    title: mockedTitle,
    description: 'Article returned by route.fulfill',
    body: 'Mocked article content',
    tagList: [],
    createdAt: '2026-11-19T10:00:00.000Z',
    updatedAt: '2026-11-19T10:00:00.000Z',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: apiUser.username,
      bio: '',
      image: '/avatar-placeholder.svg',
      following: false,
    },
  };

  let intercepted = false;

 await page.route('**/api/articles**', async (route) => {
  if (route.request().method() !== 'GET') {
    await route.continue();
    return;
  }

  intercepted = true;

  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      articles: [mockedArticle],
      articlesCount: 1,
    }),
  });
});

await page.goto('/articles');

await expect(
  page.getByText(mockedTitle, { exact: true })
).toBeVisible();

expect(intercepted).toBe(true);

  // Check that the mocked article is displayed only once.
  await expect(
    page.getByText(mockedTitle, { exact: true })
  ).toHaveCount(1);
});
