'use client';

import React, { useState, useRef, useEffect } from 'react';
import { API_CONFIG, apiRequest } from '../src/config/api';


interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface RecommendResponse {
  recomendacion: string;
}

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! ¿No sabes qué pedir? ¡Pregúntame y te ayudo a elegir el plato perfecto!',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
  if (!inputValue.trim() || isLoading) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    text: inputValue,
    isUser: true,
    timestamp: new Date(),
  };

  setMessages(prev => [...prev, userMessage]);
  const currentInput = inputValue;
  setInputValue('');
  setIsLoading(true);

  try {
    console.log('🔄 Enviando solicitud a:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RECOMMEND}`);
    console.log('📝 Mensaje:', currentInput);
    
    const response = await apiRequest(API_CONFIG.ENDPOINTS.RECOMMEND, {
      method: 'POST',
      body: JSON.stringify({ message: currentInput }),
    });


    console.log('📡 Status de respuesta:', response.status);
    console.log('📡 Response OK:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error del servidor:', errorText);
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const data: RecommendResponse = await response.json();
    console.log('✅ Respuesta recibida:', data);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: data.recomendacion || 'No pude procesar tu consulta. ¿Podrías intentar de nuevo?',
      isUser: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMessage]);
  } catch (error) {
    console.error('❌ Error completo:', error);
    const errorMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: `Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}. ¿Está el servidor corriendo?`,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, errorMessage]);
    } finally {
    setIsLoading(false);
    }
  };
    
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-50 bg-[var(--color-ribello-gold)] hover:bg-[#e2bc50] text-black rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Abrir chat de recomendaciones"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <div className="absolute -top-8 -left-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 animate-pulse">
            ¿Qué pedir?
          </div>
        </button>
      )}

      {/* Ventana de chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header del chat */}
          <div className="bg-[var(--color-ribello-gold)] hover:bg-[#e2bc50] text-black p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-semibold">Asistente Ribello</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-black hover:bg-opacity-10 rounded-full p-1 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-[var(--color-ribello-gold)] text-black'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-60 mt-1 block">
                    {message.timestamp.toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-xs">Pensando...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input del chat */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ej: Quiero algo con carne..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-[var(--color-ribello-gold)] hover:bg-[#e2bc50] disabled:bg-gray-300 disabled:cursor-not-allowed text-black rounded-lg px-3 py-2 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChat;
