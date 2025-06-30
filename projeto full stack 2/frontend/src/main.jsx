// Arquivo: frontend/src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// --- ADICIONE ESTAS IMPORTAÇÕES ---
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Cria um tema básico (pode ser personalizado depois)
const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {}
    <ThemeProvider theme={theme}>
      <CssBaseline /> {}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)