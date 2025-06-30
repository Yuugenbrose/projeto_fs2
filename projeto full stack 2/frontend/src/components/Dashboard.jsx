

import { useState } from 'react';
import InserirClimaPage from './InserirClimaPage.jsx';
import BuscarClimaPage from './BuscarClimaPage.jsx';
import ListarClimaPage from './ListarClimaPage.jsx';


import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function Dashboard({ onLogout }) {
  const [view, setView] = useState('inicio');

  const renderView = () => {
    switch (view) {
      case 'inserir':
        return <InserirClimaPage />;
      case 'buscar':
        return <BuscarClimaPage />;
      case 'listar':
        return <ListarClimaPage />;
      default:
        return <Typography variant="h6" align="center" sx={{ mt: 4 }}>Selecione uma opção no menu acima para começar.</Typography>;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        {}
        <Toolbar>
          {}
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1 }}>
            
            {}
            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
              ClimaApp
            </Typography>
            
            {}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" onClick={() => setView('inserir')}>Inserir</Button>
              <Button color="inherit" onClick={() => setView('buscar')}>Buscar</Button>
              <Button color="inherit" onClick={() => setView('listar')}>Mostrar Todos</Button>
              <Button color="inherit" onClick={onLogout}>Sair</Button>
            </Box>

          </Box>
        </Toolbar>
      </AppBar>
      
      <Container sx={{ mt: 4, mb: 4 }}>
        <main>
          {renderView()}
        </main>
      </Container>
    </Box>
  );
}

export default Dashboard;