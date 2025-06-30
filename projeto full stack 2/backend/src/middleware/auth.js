const jwt = require('jsonwebtoken');
const blacklist = new Set();

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Espera: Bearer <token>
  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

  if (blacklist.has(token)) {
    return res.status(401).json({ message: 'Token inválido (logout).' });
  }

  try {
    const decoded = jwt.verify(token, "SEGREDO_JWT_MUITO_SEGURO");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

