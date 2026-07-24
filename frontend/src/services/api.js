const API_BASE = '/api/todos';

class ApiService {
  async handleResponse(response) {
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorObj = (data && data.error) ? data.error : {
        code: 'NETWORK_ERROR',
        message: `HTTP Error ${response.status}: ${response.statusText}`,
        details: []
      };
      
      const error = new Error(errorObj.message);
      error.code = errorObj.code;
      error.details = errorObj.details;
      error.status = response.status;
      throw error;
    }

    return data;
  }

  async getTodos(filters = {}) {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.search) params.append('search', filters.search);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}${queryString}`);
    return this.handleResponse(res);
  }

  async getStats() {
    const res = await fetch(`${API_BASE}/stats`);
    return this.handleResponse(res);
  }

  async createTodo(todoData) {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todoData)
    });
    return this.handleResponse(res);
  }

  async updateTodo(id, todoData) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todoData)
    });
    return this.handleResponse(res);
  }

  async toggleTodo(id) {
    const res = await fetch(`${API_BASE}/${id}/toggle`, {
      method: 'PATCH'
    });
    return this.handleResponse(res);
  }

  async deleteTodo(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE'
    });
    return this.handleResponse(res);
  }
}

export const api = new ApiService();
