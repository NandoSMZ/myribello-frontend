'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminProducts } from '@/src/hooks/useAdminProducts';
import { CategorySelector } from '@/components/admin/CategorySelector';
import { ProductList } from '@/components/admin/ProductList';
import { ProductForm } from '@/components/admin/ProductForm';
import { showSuccess, showError, showConfirmation } from '@/src/utils/toast';
import { Product, ProductFormData } from '@/src/services/adminProductService';

export default function ProductsManagement() {
  const router = useRouter();
  const {
    filteredProducts,
    categories,
    loading,
    error,
    selectedCategory,
    productCounts,
    setSelectedCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    toggleProductStatus,
  } = useAdminProducts();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [togglingProducts, setTogglingProducts] = useState<Set<number>>(new Set());

  // Verificar autenticación
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
    }
  }, [router]);

  // Abrir formulario para crear producto
  const openCreateForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  // Abrir formulario para editar producto
  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  // Cerrar formulario
  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  // Manejar envío del formulario
  const handleFormSubmit = async (productData: ProductFormData, imageFile: File | null) => {
    setSubmitting(true);

    try {
      let imageUrl = productData.image;

      // Si hay una nueva imagen, subirla primero
      if (imageFile) {
        const uploadResult = await uploadImage(imageFile);
        if (uploadResult.success && uploadResult.url) {
          imageUrl = uploadResult.url;
        } else {
          showError(uploadResult.message || 'Error al subir la imagen', 'Error de imagen');
          return;
        }
      }

      const finalProductData = {
        ...productData,
        image: imageUrl,
      };

      let result;
      if (editingProduct) {
        result = await updateProduct(editingProduct.id, finalProductData);
      } else {
        result = await createProduct(finalProductData);
      }

      if (result.success) {
        showSuccess(
          editingProduct 
            ? `Producto "${productData.name}" actualizado correctamente` 
            : `Producto "${productData.name}" creado correctamente`,
          editingProduct ? 'Producto actualizado' : 'Producto creado'
        );
        closeForm();
      } else {
        showError(result.message || 'Error al guardar el producto', 'Error al guardar');
      }
    } catch {
      showError('Error inesperado al procesar la solicitud', 'Error inesperado');
    } finally {
      setSubmitting(false);
    }
  };

  // Manejar cambio de status (activar/desactivar)
  const handleToggleStatus = async (productId: number, newStatus: boolean) => {
    const product = filteredProducts.find(p => p.id === productId);
    const productName = product?.name || 'el producto';
    const action = newStatus ? 'activar' : 'desactivar';

    // Agregar el producto a la lista de productos siendo toggleados
    setTogglingProducts(prev => new Set(prev).add(productId));

    try {
      const result = await toggleProductStatus(productId, newStatus);
      if (result.success) {
        showSuccess(`Producto "${productName}" ${action}do correctamente`, `Producto ${action}do`);
      } else {
        showError(result.message || `Error al ${action} el producto`, `Error al ${action}`);
      }
    } catch {
      showError(`Error inesperado al ${action} el producto`, 'Error inesperado');
    } finally {
      // Remover el producto de la lista de productos siendo toggleados
      setTogglingProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  // Manejar eliminación
  const handleDelete = async (productId: number) => {
    // Encontrar el producto para mostrar su nombre en la confirmación
    const product = filteredProducts.find(p => p.id === productId);
    const productName = product?.name || 'este producto';

    showConfirmation({
      title: 'Eliminar Producto',
      message: `¿Estás seguro de que quieres eliminar "${productName}"? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      confirmButtonClass: 'bg-red-600 hover:bg-red-700',
      onConfirm: async () => {
        try {
          const result = await deleteProduct(productId);
          if (result.success) {
            showSuccess(`Producto "${productName}" eliminado correctamente`, 'Producto eliminado');
          } else {
            showError(result.message || 'Error al eliminar el producto', 'Error al eliminar');
          }
        } catch {
          showError('Error inesperado al eliminar el producto', 'Error inesperado');
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-ribello-gold text-lg">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-3 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="bg-gradient-to-r from-ribello-gold/10 to-black hover:from-ribello-gold/15 text-ribello-gold border border-ribello-gold/30 hover:border-ribello-gold/50 p-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer flex items-center space-x-2"
          >
            <span className="text-lg">←</span>
            <span className="hidden sm:inline">Volver al Dashboard</span>
          </button>
          <div>
            <h1 className="text-xl sm:text-3xl font-serif font-bold text-ribello-gold">Gestión de Productos</h1>
            <p className="text-sm sm:text-base text-gray-400 sm:text-gray-300">Administra el menú del restaurante</p>
          </div>
        </div>
        <button
          onClick={openCreateForm}
          className="bg-ribello-gold text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-ribello-gold/90 transition-colors cursor-pointer w-full sm:w-auto text-center"
        >
          + Nuevo Producto
        </button>
      </div>

      {/* Selector de Categorías */}
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        productCounts={productCounts}
      />

      {/* Título de la sección */}
      {selectedCategory && (
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-serif text-ribello-gold">
            {categories.find(cat => cat.id === selectedCategory)?.name || 'Categoría'}
          </h2>
          <p className="text-sm sm:text-base text-gray-400 sm:text-gray-300">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Lista de Productos */}
      <ProductList
        products={filteredProducts}
        onEdit={openEditForm}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        togglingProducts={togglingProducts}
      />

      {/* Formulario Modal */}
      <ProductForm
        isOpen={isFormOpen}
        editingProduct={editingProduct}
        categories={categories}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
        submitting={submitting}
      />
    </div>
  );
}
