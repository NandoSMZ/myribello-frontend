import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDropzone, FileRejection } from 'react-dropzone';
import { getImagePath } from '@/src/utils/utils';
import { showError } from '@/src/utils/toast';
import { Product, Category, ProductFormData } from '@/src/services/adminProductService';

interface ProductFormProps {
  isOpen: boolean;
  editingProduct: Product | null;
  categories: Category[];
  onClose: () => void;
  onSubmit: (productData: ProductFormData, imageFile: File | null) => Promise<void>;
  submitting: boolean;
}

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  image: '',
  price: 0,
  categoryId: 0,
};

export const ProductForm: React.FC<ProductFormProps> = ({
  isOpen,
  editingProduct,
  categories,
  onClose,
  onSubmit,
  submitting,
}) => {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Configurar formulario cuando cambia el producto a editar
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description || '',
        image: editingProduct.image,
        price: editingProduct.price,
        categoryId: editingProduct.categoryId,
      });
      setImageFile(null);
      setImagePreview(getImagePath(editingProduct.image));
    } else {
      setFormData(initialFormData);
      setImageFile(null);
      setImagePreview('');
    }
  }, [editingProduct]);

  // Manejar drop de archivos
  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      showError('Solo se permiten archivos JPG y PNG', 'Formato no válido');
      return;
    }
    
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData(prev => ({ ...prev, image: file.name }));
    }
  };

  // Configurar dropzone
  const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    onDrop,
    maxFiles: 1,
  });

  // Manejar selección de archivo manual (fallback)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.match(/^image\/(jpeg|png)$/)) {
        showError('Solo se permiten archivos JPG y PNG', 'Formato no válido');
        return;
      }
      
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData(prev => ({ ...prev, image: file.name }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData, imageFile);
  };

  // Cerrar y limpiar
  const handleClose = () => {
    setFormData(initialFormData);
    setImageFile(null);
    setImagePreview('');
    onClose();
  };

  if (!isOpen) return null;

  // Manejar clic fuera del modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-black border border-ribello-gold/30 rounded-lg p-4 sm:p-6 max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-ribello-gold mb-4 sm:mb-6">
          {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-ribello-gold text-sm font-medium mb-2">
              Nombre *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-ribello-gold/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-ribello-gold focus:ring-1 focus:ring-ribello-gold text-sm sm:text-base"
              placeholder="Nombre del producto"
              required
              disabled={submitting}
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-ribello-gold text-sm font-medium mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-ribello-gold/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-ribello-gold focus:ring-1 focus:ring-ribello-gold text-sm sm:text-base"
              placeholder="Descripción del producto"
              rows={3}
              disabled={submitting}
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-ribello-gold text-sm font-medium mb-2">
              Precio *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-ribello-gold/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-ribello-gold focus:ring-1 focus:ring-ribello-gold text-sm sm:text-base"
              placeholder="0.00"
              required
              disabled={submitting}
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-ribello-gold text-sm font-medium mb-2">
              Categoría *
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData(prev => ({ ...prev, categoryId: parseInt(e.target.value) }))}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-ribello-gold/30 rounded-lg text-white focus:outline-none focus:border-ribello-gold focus:ring-1 focus:ring-ribello-gold text-sm sm:text-base"
              required
              disabled={submitting}
            >
              <option value={0}>Seleccionar categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-ribello-gold text-sm font-medium mb-2">
              Imagen (Solo JPG y PNG)
            </label>
            
            <div
              {...getRootProps()}
              className={`w-full px-4 py-8 border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer ${
                isDragActive
                  ? isDragAccept
                    ? 'border-green-500 bg-green-500/10'
                    : isDragReject
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-ribello-gold bg-ribello-gold/10'
                  : 'border-ribello-gold/30 bg-ribello-gold/5 hover:border-ribello-gold/50 hover:bg-ribello-gold/10'
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-center">
                {imagePreview ? (
                  <div className="space-y-3">
                    <div className="w-32 h-32 relative rounded-lg border border-ribello-gold/30 overflow-hidden mx-auto">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                    <div className="text-white text-sm">
                      <p className="font-medium">{imageFile?.name}</p>
                      <p className="text-gray-400">Haz clic o arrastra una nueva imagen para cambiar</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-4xl text-ribello-gold">📷</div>
                    <div className="text-white">
                      <p className="font-medium">
                        {isDragActive
                          ? isDragAccept
                            ? 'Suelta la imagen aquí'
                            : 'Archivo no válido'
                          : 'Arrastra una imagen aquí o haz clic'}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">Solo archivos JPG y PNG</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Input manual como fallback (oculto) */}
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleImageChange}
              className="hidden"
              disabled={submitting}
              id="manual-file-input"
            />
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="w-full sm:flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
              disabled={submitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full sm:flex-1 bg-ribello-gold text-black py-3 px-6 rounded-lg hover:bg-ribello-gold/90 transition-colors disabled:opacity-50 cursor-pointer"
              disabled={submitting}
            >
              {submitting ? 'Guardando...' : editingProduct ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
