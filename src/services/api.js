// Servicio de API para conectar con el backend Django
const API_BASE_URL = 'http://localhost:8000/api';

class ApiService {
  // Método base para hacer peticiones HTTP
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Métodos para categorías
  async getCategorias() {
    return this.request('/categorias/');
  }

  async getCategoria(id) {
    return this.request(`/categorias/${id}/`);
  }

  async createCategoria(data) {
    return this.request('/categorias/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Métodos para productos
  async getProductos() {
    return this.request('/productos/');
  }

  async getProducto(id) {
    return this.request(`/productos/${id}/`);
  }

  async getProductosPorCategoria(categoriaId) {
    return this.request(`/productos/?categoria=${categoriaId}`);
  }

  async searchProductos(query) {
    return this.request(`/productos/?search=${encodeURIComponent(query)}`);
  }

  async createProducto(data) {
    return this.request('/productos/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Métodos para carrusel
  async getCarruseles() {
    return this.request('/carruseles/');
  }

  async createCarrusel(data) {
    return this.request('/carruseles/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Métodos para clientes
  async getClientes() {
    return this.request('/clientes/');
  }

  async getCliente(id) {
    return this.request(`/clientes/${id}/`);
  }

  async createCliente(data) {
    return this.request('/clientes/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCliente(id, data) {
    return this.request(`/clientes/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Métodos para pedidos
  async getPedidos() {
    return this.request('/pedidos/');
  }

  async getPedido(id) {
    return this.request(`/pedidos/${id}/`);
  }

  async createPedido(data) {
    return this.request('/pedidos/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePedido(id, data) {
    return this.request(`/pedidos/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Métodos para carrito de compras
  async getCarritos() {
    return this.request('/carritos/');
  }

  async getCarrito(id) {
    return this.request(`/carritos/${id}/`);
  }

  async createCarrito(data) {
    return this.request('/carritos/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getItemsCarrito(carritoId) {
    return this.request(`/itemscarrito/?carrito=${carritoId}`);
  }

  async addItemCarrito(data) {
    return this.request('/itemscarrito/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateItemCarrito(id, data) {
    return this.request(`/itemscarrito/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteItemCarrito(id) {
    return this.request(`/itemscarrito/${id}/`, {
      method: 'DELETE',
    });
  }

  // Métodos para preguntas frecuentes
  async getPreguntasFrecuentes() {
    return this.request('/preguntasfrecuentes/');
  }

  async createPreguntaFrecuente(data) {
    return this.request('/preguntasfrecuentes/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Métodos para administración
  async getProductosAdmin() {
    return this.request('/admin/productos-admin/');
  }

  async uploadProductFile(productId, file) {
    const formData = new FormData();
    formData.append('producto', productId);
    formData.append('archivo', file);
    formData.append('nombre_archivo', file.name);
    formData.append('tipo_archivo', file.type);

    return this.request('/admin/product-files/', {
      method: 'POST',
      headers: {}, // No establecer Content-Type para FormData
      body: formData,
    });
  }

  // Métodos para análisis de comportamiento (Web 4.0)
  async trackUserBehavior(data) {
    return this.request('/analytics/user-behavior/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getRecommendations(userId) {
    return this.request(`/ai/recommendations/${userId}/`);
  }

  async getProactiveAssistance(userBehavior) {
    return this.request('/ai/proactive-assistance/', {
      method: 'POST',
      body: JSON.stringify(userBehavior),
    });
  }
}

// Exportar una instancia única del servicio
const apiService = new ApiService();
export default apiService;

