# API and Authentication Research — Dojo Articles

## 1. Authentication Storage

Dojo Articles uses `localStorage` to store the authentication token.

- **Storage type:** localStorage
- **Key:** `qa-dojo.token`
- **Origin:** `http://104.168.59.50`

I identified the authentication mechanism using Chrome DevTools and verified it in Playwright.

The token returned by the registration API matches the token stored in the browser's localStorage.

## 2. Authentication API

**User registration**

- Method: `POST`
- Endpoint: `/api/users`
- Successful response: `201 Created`

Request body structure:

```json
{
  "user": {
    "username": "...",
    "email": "...",
    "password": "..."
  }
}
```

The response contains a `user` object with the following fields:

`username`, `email`, `bio`, `image`, `token`.

**User login**

- Method: `POST`
- Endpoint: `/api/users/login`
- Request body: `user` object containing `email` and `password`

The exact login response status and structure should be confirmed in DevTools.

**Authenticated requests**

Authenticated API requests use the following header:

`Authorization: Token <token>`

I verified that `GET /api/user` returns HTTP `200` with the created user's information when a valid token is provided.

## 3. UI Scenarios with API Preconditions

### Scenario 1: Create an Article

**API preconditions:**
- Register a new user using `POST /api/users`.
- Retrieve the authentication token.
- Set the token in browser localStorage using Playwright storageState.

**UI actions:**
- Open the article editor.
- Enter the article title, description, and content.
- Publish the article.
- Verify that the new article is displayed.

### Scenario 2: Edit an Existing Article

**API preconditions:**
- Register a new user using `POST /api/users`.
- Authenticate using the returned token.
- Create an article using the API (the endpoint and request structure need to be verified).

**UI actions:**
- Open the existing article.
- Edit its content.
- Save the changes.
- Reload the page.
- Verify that the updated content is preserved.

## 4. Conclusion

Using API requests for test setup makes UI tests faster and reduces dependencies on manual preparation.

In this homework, I implemented an E2E test that:

1. Creates a unique user through the API.
2. Validates the API response and authentication token.
3. Authenticates the browser using localStorage.
4. Updates the user's avatar through the UI.
5. Verifies the avatar image source.
6. Reopens the settings page and confirms that the changes persist.

The test also passed three consecutive local runs.