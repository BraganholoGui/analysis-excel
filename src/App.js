import './App.css';
import React, { useState, useEffect } from 'react';
import AppRoutes from './routes';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  return ready ? <AppRoutes /> : null;
}

