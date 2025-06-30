// Arquivo: backend/src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Usuario = require('../models/usuarioModel'); // Lembre-se que este arquivo depende do seu model
const blacklist = require('../middleware/auth').blacklist;

// Define a rota POST para o caminho /login
router.post('/login',
    body('username').trim().escape().notEmpty().withMessage('Usuário é obrigatório.'),
    body('password').notEmpty().withMessage('Senha é obrigatória.'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(`[${new Date().toISOString()}] Falha de validação no login:`, errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;

        try {
            const usuario = await Usuario.findByUsername(username);
            if (!usuario) {
                console.log(`[${new Date().toISOString()}] Login falhou para usuário inexistente: ${username}`);
                return res.status(400).json({ message: "Credenciais inválidas." });
            }

            const isMatch = await bcrypt.compare(password, usuario.password);
            if (!isMatch) {
                console.log(`[${new Date().toISOString()}] Login falhou para usuário: ${username} (senha incorreta)`);
                return res.status(400).json({ message: "Credenciais inválidas." });
            }

            const payload = { id: usuario.id, username: usuario.username };
            const token = jwt.sign(payload, "SEGREDO_JWT_MUITO_SEGURO", { expiresIn: '1h' });

            console.log(`[${new Date().toISOString()}] Login bem-sucedido para usuário: ${username}`);
            res.json({ token });

        } catch (error) {
            console.error(`[${new Date().toISOString()}] Erro interno no login:`, error);
            res.status(500).json({ message: "Erro interno no servidor." });
        }
    }
);

// Rota para logout
router.post('/logout', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        blacklist.add(token);
    }
    res.json({ message: 'Logout realizado com sucesso.' });
});

module.exports = router;