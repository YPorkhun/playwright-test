// api/user.api.js

export class UserAPI {
  constructor(request) {
    this.request = request;
  }

  async createUser(data) {
    return await this.request.post('/users', {
      data,
    });
  }

  async getUser(id) {
    return await this.request.get(`/users/${id}`);
  }
}