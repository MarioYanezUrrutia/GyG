import { useState, useEffect } from 'react';
import apiService from '../services/api';

// Hook personalizado para manejar llamadas a la API
export const useApi = (endpoint, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService.request(endpoint);
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (endpoint) {
      fetchData();
    }
  }, [endpoint, ...dependencies]);

  return { data, loading, error, refetch: () => fetchData() };
};

// Hook para categorías
export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setLoading(true);
        const data = await apiService.getCategorias();
        setCategorias(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching categorias:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  return { categorias, loading, error };
};

// Hook para productos
export const useProductos = (categoriaId = null) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        let data;
        if (categoriaId) {
          data = await apiService.getProductosPorCategoria(categoriaId);
        } else {
          data = await apiService.getProductos();
        }
        setProductos(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching productos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoriaId]);

  return { productos, loading, error };
};

// Hook para carrusel
export const useCarrusel = () => {
  const [carrusel, setCarrusel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarrusel = async () => {
      try {
        setLoading(true);
        const data = await apiService.getCarruseles();
        setCarrusel(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching carrusel:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarrusel();
  }, []);

  return { carrusel, loading, error };
};

// Hook para carrito de compras
export const useCarrito = (carritoId) => {
  const [carrito, setCarrito] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarrito = async () => {
      if (!carritoId) return;

      try {
        setLoading(true);
        const [carritoData, itemsData] = await Promise.all([
          apiService.getCarrito(carritoId),
          apiService.getItemsCarrito(carritoId)
        ]);
        setCarrito(carritoData);
        setItems(itemsData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching carrito:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarrito();
  }, [carritoId]);

  const addItem = async (productoId, cantidad = 1) => {
    try {
      const newItem = await apiService.addItemCarrito({
        carrito: carritoId,
        producto: productoId,
        cantidad
      });
      setItems(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateItem = async (itemId, cantidad) => {
    try {
      const updatedItem = await apiService.updateItemCarrito(itemId, { cantidad });
      setItems(prev => prev.map(item => 
        item.item_carrito_id === itemId ? updatedItem : item
      ));
      return updatedItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeItem = async (itemId) => {
    try {
      await apiService.deleteItemCarrito(itemId);
      setItems(prev => prev.filter(item => item.item_carrito_id !== itemId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { 
    carrito, 
    items, 
    loading, 
    error, 
    addItem, 
    updateItem, 
    removeItem 
  };
};

// Hook para búsqueda de productos
export const useProductSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await apiService.searchProductos(query);
      setResults(data);
    } catch (err) {
      setError(err.message);
      console.error('Error searching productos:', err);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
};

// Hook para preguntas frecuentes
export const usePreguntasFrecuentes = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        setLoading(true);
        const data = await apiService.getPreguntasFrecuentes();
        setPreguntas(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching preguntas frecuentes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreguntas();
  }, []);

  return { preguntas, loading, error };
};

