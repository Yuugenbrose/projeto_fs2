

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import WaterDropIcon from '@mui/icons-material/WaterDrop'; 

function ListarClimaPage() {
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRegistros = async () => {
            try {
                const url = 'https://localhost:5000/api/clima';
                const token = localStorage.getItem('authToken');
                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRegistros(response.data);
            } catch (error) {
                console.error("Erro ao buscar registros:", error);
                alert("Não foi possível carregar os registros.");
            } finally {
                setLoading(false);
            }
        };
        fetchRegistros();
    }, []);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Box>
            <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
                Todos os Registros de Clima
            </Typography>
            {registros.length === 0 ? (
                <Typography align="center">Nenhum registro encontrado.</Typography>
            ) : (
                
                <Box sx={{ flexGrow: 1, mt: 2 }}>
                    {}
                    {registros.map((registro) => (
                        
                        <Grid container key={registro.id} spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #e0e0e0', py: 1.5 }}>
                            
                            {}
                            <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationCityIcon sx={{ color: 'action.active', mr: 1 }} />
                                <ListItemText 
                                    primary={registro.cidade} 
                                    secondary={`Condição: ${registro.condicao || 'N/A'}`} 
                                />
                            </Grid>

                            {}
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                <ThermostatIcon sx={{ color: 'action.active', mr: 1 }} />
                                <Typography variant="body1">{registro.temperatura}°C</Typography>
                            </Grid>

                            {}
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                                <WaterDropIcon sx={{ color: 'action.active', mr: 1 }} />
                                <Typography variant="body1">{registro.umidade || 'N/A'}%</Typography>
                            </Grid>

                        </Grid>
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default ListarClimaPage;