

import React, { useState } from 'react';
import axios from 'axios';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';

function BuscarClimaPage() {
    const [cidade, setCidade] = useState('');
    const [resultados, setResultados] = useState([]);
    const [buscou, setBuscou] = useState(false);

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!cidade.trim()) return;
        setBuscou(true);
        try {
            const url = `https://localhost:5000/api/clima/cidade/${cidade}`;
            const token = localStorage.getItem('authToken');
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResultados(response.data);
        } catch (error) {
            console.error("Erro ao buscar:", error);
            alert("Falha na busca.");
        }
    };

    return (
        <Box>
            <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
                Buscar Registros por Cidade
            </Typography>
            <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <TextField
                    fullWidth
                    label="Digite o nome da cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                />
                <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
                    Buscar
                </Button>
            </Box>

            <Typography component="h2" variant="h6">
                Resultados:
            </Typography>
            {!buscou ? (
                <Typography>Digite uma cidade e clique em buscar.</Typography>
            ) : resultados.length > 0 ? (
                <List>
                    {resultados.map(registro => (
                        <ListItem key={registro.id} divider>
                            <ListItemText 
                                primary={registro.cidade} 
                                secondary={`Temp: ${registro.temperatura}°C - Condição: ${registro.condicao || 'N/A'} - Umidade: ${registro.umidade}%`} 
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography>Nenhum resultado encontrado para "{cidade}".</Typography>
            )}
        </Box>
    );
}

export default BuscarClimaPage;