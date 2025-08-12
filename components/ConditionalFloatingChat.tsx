'use client';

import { usePathname } from 'next/navigation';
import FloatingChat from './FloatingChat';

export default function ConditionalFloatingChat() {
  const pathname = usePathname();
  
  // No mostrar FloatingChat en páginas de admin
  const isAdminPage = pathname?.startsWith('/admin');
  
  if (isAdminPage) {
    return null;
  }
  
  return <FloatingChat />;
}
