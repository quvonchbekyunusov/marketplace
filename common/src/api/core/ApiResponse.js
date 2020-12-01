class ApiResponse {
  meta = null;

  data = null;

  constructor({ meta = null, data = null } = {}) {
    this.meta = meta;
    this.data = data;
  }
}

export default ApiResponse;
