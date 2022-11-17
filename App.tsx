import React from 'react';
import AuthProvider from './src/context/auth.context';
import Routes from './src/pages/routes';

export default function App() {
  return <AuthProvider>
      <Routes />
    </AuthProvider>
};
