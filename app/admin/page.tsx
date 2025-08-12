'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingProducts from '../../components/LoadingProducts';

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  // Verificar si ya hay una sesión activa al cargar la página
  useEffect(() => {
    const checkExistingAuth = async () => {
      const token = localStorage.getItem('admin_token');
      const userData = localStorage.getItem('admin_user');

      if (!token || !userData) {
        setCheckingAuth(false);
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

        if (response.ok) {
          // Token válido, redirigir al dashboard
          router.push('/admin/dashboard');
        } else {
          // Token inválido, limpiar localStorage
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_user');
          setCheckingAuth(false);
        }
      } catch {
        // Error de conexión, limpiar localStorage
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        setCheckingAuth(false);
      }
    };

    checkExistingAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const data = await response.json();
      
      // Guardar el token en localStorage
      localStorage.setItem('admin_token', data.access_token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      
      // Redirigir al dashboard
      router.push('/admin/dashboard');
      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Credenciales inválidas. Verifique usuario y contraseña.');
    } finally {
      setLoading(false);
    }
  };

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingProducts message="Verificando sesión..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4">
      {/* Logo/Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-serif font-bold text-ribello-gold mb-2">RIBELLO</h1>
        <p className="text-gray-300">Panel de Administración</p>
      </div>

      {/* Formulario de Login */}
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-ribello-gold/10 to-black border border-ribello-gold/30 rounded-lg shadow-2xl p-8">
          <h2 className="text-2xl font-serif font-bold text-ribello-gold text-center mb-6">
            Iniciar Sesión
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-ribello-gold text-sm font-medium mb-2">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-4 py-3 bg-black border border-ribello-gold/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-ribello-gold focus:ring-1 focus:ring-ribello-gold"
                placeholder="Ingrese su usuario"
                required
                disabled={loading}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-ribello-gold text-sm font-medium mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 bg-black border border-ribello-gold/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-ribello-gold focus:ring-1 focus:ring-ribello-gold"
                placeholder="Ingrese su contraseña"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ribello-gold text-black font-bold py-3 px-4 rounded-lg hover:bg-ribello-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <LoadingProducts message="Verificando credenciales..." />
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>© 2024 Ribello. Acceso restringido.</p>
      </div>
    </div>
  );
}
