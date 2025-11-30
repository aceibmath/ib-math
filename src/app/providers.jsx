'use client';

import { useEffect } from 'react';
import { AuthProvider } from '../context/AuthContext';

// CSS global (o singură dată, aici)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Providers({ children }) {
  useEffect(() => {
    // JS Bootstrap doar pe client (dropdown/offcanvas etc.)
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return <AuthProvider>{children}</AuthProvider>;
}
