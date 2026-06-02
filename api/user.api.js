export class UserAPI {
constructor(request) {
  this.request = request;
  this.baseURL = 'https://reqres.in/api';
  this.headers = {
    'x-api-key': process.env.API_KEY,
  };
}
async createUser(data) {
  return this.request.get(`${this.baseURL}/users`, {
    headers: this.headers,
    data,
  });
}

async getUser(id) {
  return this.request.get(`${this.baseURL}/users/${id}`, {
    headers: this.headers,
  });
}}
