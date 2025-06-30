// Arquivo: frontend/src/components/LoginPage.jsx

import React, { useState } from 'react';
import axios from 'axios';

// --- IMPORTAÇÕES DO MATERIAL-UI ---
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function LoginPage({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = 'https://localhost:5000/api/login';
            const response = await axios.post(url, { username, password });
            onLoginSuccess(response.data.token);
        } catch (error) {
            alert('Falha no login: ' + (error.response?.data?.message || 'Erro de comunicação'));
        }
    };

    return (
        
        <Container component="main" maxWidth="xs">
            {}
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {}
                <Typography component="h1" variant="h5">
                    Login
                </Typography>

                {}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    {}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Usuário"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained" 
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Entrar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginPage;