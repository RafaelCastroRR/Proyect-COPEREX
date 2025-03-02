import jwt from 'jsonwebtoken'

export const protect = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'No hay token, acceso denegado' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.id
        next()
    } catch (error) {
        res.status(401).json({ message: 'Token no válido' })
    }
}
