
import { APIRequestContext, expect } from '@playwright/test';

export class UserController {
  constructor(private request: APIRequestContext) {}

  async createUser() {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const user = {
      username: `testuser_${id}`,
      email: `testuser_${id}@example.com`,
      password: 'Test123456!',
    };

    const response = await this.request.post('/api/users', {
      data: { user },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.user.username).toBe(user.username);
    expect(body.user.email).toBe(user.email);
    expect(typeof body.user.token).toBe('string');
    expect(body.user.token.length).toBeGreaterThan(0);

    return {
      ...user,
      token: body.user.token as string,
    };
  }
}
