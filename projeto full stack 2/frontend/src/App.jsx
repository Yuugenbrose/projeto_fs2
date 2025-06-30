// Arquivo: frontend/src/App.jsx

import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import './App.css';

function App() {
  // O estado 'token' agora vive aqui, no componente pai.
  const [token, setToken] = useState(null);

  // useEffect é usado para verificar se já existe um token no localStorage
  // quando a aplicação carrega pela primeira vez.
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); // O array vazio [] garante que isso rode apenas uma vez.

  // Função que será chamada pelo LoginPage em um login bem-sucedido
  const handleLoginSuccess = (newToken) => {
    localStorage.setItem('authToken', newToken); // Salva no storage
    setToken(newToken); // Atualiza o estado
  };

  // Função que será chamada pelo Dashboard para fazer logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove do storage
    setToken(null); // Limpa o estado
  };

  return (
    <div className="App">
      {/* A lógica agora é baseada no ESTADO 'token', e não mais lendo
        diretamente do localStorage a cada renderização.
      */}
      {!token ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;