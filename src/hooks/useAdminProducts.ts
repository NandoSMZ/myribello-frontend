import { useState, useEffect, useMemo } from 'react';
import { adminProductService, Product, Category, ProductFormData } from '../services/adminProductService';

export const useAdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Filtrar productos por categoría seleccionada
  const filteredProducts = useMemo(() => {
    if (selectedCategory === null) {
      return products;
    }
    return products.filter(product => product.categoryId === selectedCategory);
  }, [products, selectedCategory]);

  // Contar productos por categoría
  const productCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    categories.forEach(category => {
      counts[category.id] = products.filter(product => product.categoryId === category.id).length;
    });
    return counts;
  }, [products, categories]);

  // Cargar datos iniciales
  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const [productsResult, categoriesResult] = await Promise.all([
        adminProductService.getProducts(),
        adminProductService.getCategories(),
      ]);

      if (productsResult.success && productsResult.data) {
        setProducts(productsResult.data);
      } else {
        setError(productsResult.message || 'Error al cargar productos');
      }

      if (categoriesResult.success && categoriesResult.data) {
        setCategories(categoriesResult.data);
      } else {
        setError(categoriesResult.message || 'Error al cargar categorías');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  // Crear producto
  const createProduct = async (productData: ProductFormData): Promise<{ success: boolean; message?: string }> => {
    const result = await adminProductService.createProduct(productData);
    
    if (result.success) {
      // Recargar productos
      await loadData();
      return { success: true };
    }
    
    return { success: false, message: result.message };
  };

  // Actualizar producto
  const updateProduct = async (id: number, productData: ProductFormData): Promise<{ success: boolean; message?: string }> => {
    const result = await adminProductService.updateProduct(id, productData);
    
    if (result.success) {
      // Recargar productos
      await loadData();
      return { success: true };
    }
    
    return { success: false, message: result.message };
  };

  // Eliminar producto
  const deleteProduct = async (id: number): Promise<{ success: boolean; message?: string }> => {
    const result = await adminProductService.deleteProduct(id);
    
    if (result.success) {
      // Actualizar estado local sin recargar todo
      setProducts(products.filter(p => p.id !== id));
      return { success: true };
    }
    
    return { success: false, message: result.message };
  };

  // Subir imagen
  const uploadImage = async (file: File): Promise<{ success: boolean; url?: string; message?: string }> => {
    const result = await adminProductService.uploadImage(file);
    
    if (result.success && result.data) {
      return { success: true, url: result.data.secure_url };
    }
    
    return { success: false, message: result.message };
  };

  // Cambiar status de producto
  const toggleProductStatus = async (productId: number, status: boolean): Promise<{ success: boolean; message?: string }> => {
    // Actualizar inmediatamente el estado local para mejor UX
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, status } 
          : product
      )
    );

    const result = await adminProductService.toggleProductStatus(productId, status);
    
    if (result.success) {
      return { success: true };
    } else {
      // Si falla, revertir el cambio local
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === productId 
            ? { ...product, status: !status } 
            : product
        )
      );
      return { success: false, message: result.message };
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  return {
    products,
    filteredProducts,
    categories,
    loading,
    error,
    selectedCategory,
    productCounts,
    setSelectedCategory,
    loadData,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    toggleProductStatus,
  };
};
