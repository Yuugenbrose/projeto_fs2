// Arquivo: backend/src/routes/climaRoutes.js

const express = require('express');
const { body, validationResult, param } = require('express-validator');
const router = express.Router();
const Clima = require('../models/climaModel');
const auth = require('../middleware/auth');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // cache de 60 segundos

// --- ROTA DE INSERÇÃO (POST) - AGORA PROTEGIDA ---
router.post('/',
    auth,
    // Validação e sanitização dos campos
    body('cidade').trim().escape().notEmpty().withMessage('Cidade é obrigatória.'),
    body('temperatura').isNumeric().withMessage('Temperatura deve ser um número.'),
    body('condicao').optional().trim().escape(),
    body('umidade').optional().isInt({ min: 0, max: 100 }).withMessage('Umidade deve ser um inteiro entre 0 e 100.'),
    async (req, res) => {
        // Checa os erros de validação
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(`[${new Date().toISOString()}] Falha de validação ao inserir clima:`, errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const { cidade, temperatura, condicao, umidade } = req.body;

        try {
            const novoDado = {
                cidade,
                temperatura,
                condicao,
                umidade,
                usuario_id: req.user.id // Usa o ID do usuário autenticado
            };

            const dadoInserido = await Clima.inserir(novoDado);
            console.log(`[${new Date().toISOString()}] Inserção de clima por usuário ${req.user.username}:`, novoDado);
            // O status 201 significa "Created" (Criado), ideal para respostas de POST.
            res.status(201).json(dadoInserido);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Erro ao inserir clima:`, error);
            res.status(500).json({ message: 'Erro ao inserir dados de clima.', error: error.message });
        }
    }
);

// --- ROTA DE BUSCA (GET) - AGORA COM CACHE ---
router.get('/', auth, async (req, res) => {
    const cacheKey = 'clima_todos';
    const cached = cache.get(cacheKey);
    if (cached) {
        console.log(`[${new Date().toISOString()}] Cache HIT para todos os climas`);
        return res.json(cached);
    }
    try {
        const todosOsRegistros = await Clima.buscarTodos();
        cache.set(cacheKey, todosOsRegistros);
        console.log(`[${new Date().toISOString()}] Cache MISS para todos os climas`);
        res.json(todosOsRegistros);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Erro ao buscar dados de clima:`, error);
        res.status(500).json({ message: 'Erro ao buscar dados de clima.', error: error.message });
    }
});

// --- ROTA DE BUSCA POR CIDADE (GET) - AGORA PROTEGIDA ---
router.get('/cidade/:nomeDaCidade',
    auth, // Protege a rota
    param('nomeDaCidade').trim().escape(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(`[${new Date().toISOString()}] Falha de validação na busca por cidade:`, errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const cidade = req.params.nomeDaCidade;
            const registros = await Clima.buscarPorCidade(cidade);
            console.log(`[${new Date().toISOString()}] Busca de clima por cidade "${cidade}" pelo usuário ${req.user.username}`);
            res.json(registros);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Erro ao buscar dados por cidade:`, error);
            res.status(500).json({ message: 'Erro ao buscar dados por cidade.', error: error.message });
        }
    }
);


module.exports = router;