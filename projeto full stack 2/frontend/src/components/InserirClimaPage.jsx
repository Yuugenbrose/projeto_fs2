

import React, { useState } from 'react';
import axios from 'axios';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function InserirClimaPage() {
    const [cidade, setCidade] = useState('');
    const [temperatura, setTemperatura] = useState('');
    const [condicao, setCondicao] = useState('');
    const [umidade, setUmidade] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const novoRegistro = { cidade, temperatura: parseFloat(temperatura), condicao, umidade: parseInt(umidade) };

        try {
            const url = 'https://localhost:5000/api/clima';
            const token = localStorage.getItem('authToken');
            await axios.post(url, novoRegistro, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Registro de clima inserido com sucesso!');
            setCidade(''); setTemperatura(''); setCondicao(''); setUmidade('');
        } catch (error) {
            console.error("Erro ao inserir registro:", error);
            alert('Falha ao inserir registro: ' + (error.response?.data?.message || 'Erro de comunicação.'));
        }
    };

    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <Typography component="h1" variant="h5">
                Inserir Novo Registro de Clima
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%', maxWidth: '400px' }}>
                <TextField
                    margin="normal" required fullWidth
                    label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)}
                />
                <TextField
                    margin="normal" required fullWidth
                    label="Temperatura (°C)" type="number" value={temperatura} onChange={(e) => setTemperatura(e.target.value)}
                />
                <TextField
                    margin="normal" fullWidth
                    label="Condição (ex: Ensolarado)" value={condicao} onChange={(e) => setCondicao(e.target.value)}
                />
                <TextField
                    margin="normal" fullWidth
                    label="Umidade (%)" type="number" value={umidade} onChange={(e) => setUmidade(e.target.value)}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Salvar Registro
                </Button>
            </Box>
        </Box>
    );
}

export default InserirClimaPage;