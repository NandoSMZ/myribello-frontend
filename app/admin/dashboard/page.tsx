'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminUser {
  username: string;
  role: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token');
      const userData = localStorage.getItem('admin_user');

      if (!token || !userData) {
        router.push('/admin');
        return;
      }

      try {
        // Validar el token con el backend
        const response = await fetch('http://localhost:3000/auth/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error('Token inválido');
        }

        await response.json();
        setUser(JSON.parse(userData));
      } catch {
        // Token inválido, redirigir al login
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        router.push('/admin');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-ribello-gold text-lg">Verificando acceso...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Será redirigido
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gradient-to-r from-ribello-gold/20 to-black border-b border-ribello-gold/30 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif font-bold text-ribello-gold">RIBELLO ADMIN</h1>
            <p className="text-gray-300 text-sm">Panel de Administración</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-ribello-gold font-medium">Bienvenido, {user.username}</p>
              <p className="text-gray-400 text-sm capitalize">{user.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card de Productos */}
          <div className="bg-gradient-to-br from-ribello-gold/10 to-black border border-ribello-gold/30 rounded-lg p-6 hover:border-ribello-gold/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-serif font-bold text-ribello-gold">Productos</h3>
              <div className="w-12 h-12 bg-ribello-gold/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-ribello-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">Gestionar menú, precios y categorías</p>
            <button className="w-full bg-ribello-gold text-black font-medium py-2 px-4 rounded-lg hover:bg-ribello-gold/90 transition-colors"
              onClick={() => router.push('/admin/products')}
            >
              Gestionar Productos
            </button>
          </div>

          {/* Card de Transacciones */}
          <div className="bg-gradient-to-br from-ribello-gold/10 to-black border border-ribello-gold/30 rounded-lg p-6 hover:border-ribello-gold/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-serif font-bold text-ribello-gold">Pedidos</h3>
              <div className="w-12 h-12 bg-ribello-gold/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-ribello-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">Ver y gestionar pedidos</p>
            <button className="w-full bg-ribello-gold text-black font-medium py-2 px-4 rounded-lg hover:bg-ribello-gold/90 transition-colors">
              Ver Pedidos
            </button>
          </div>

          {/* Card de Estadísticas */}
          <div className="bg-gradient-to-br from-ribello-gold/10 to-black border border-ribello-gold/30 rounded-lg p-6 hover:border-ribello-gold/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-serif font-bold text-ribello-gold">Reportes</h3>
              <div className="w-12 h-12 bg-ribello-gold/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-ribello-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">Estadísticas y reportes</p>
            <button className="w-full bg-ribello-gold text-black font-medium py-2 px-4 rounded-lg hover:bg-ribello-gold/90 transition-colors">
              Ver Reportes
            </button>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-8 bg-gradient-to-r from-ribello-gold/5 to-transparent border border-ribello-gold/20 rounded-lg p-6">
          <h2 className="text-2xl font-serif font-bold text-ribello-gold mb-2">¡Bienvenido al Panel de Administración!</h2>
          <p className="text-gray-300">
            Desde aquí puedes gestionar todos los aspectos de tu restaurante: productos, pedidos, precios y mucho más. 
            Usa las opciones del menú para navegar por las diferentes funcionalidades.
          </p>
        </div>
      </main>
    </div>
  );
}
