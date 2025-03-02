import { authenticateAdmin, generateToken } from './auth.service.js'

export const login = async (req, res) => {
    const { username, password } = req.body

    try {
        // Autenticar al usuario
        const user = await authenticateAdmin(username, password)

        // Generar el token de autenticación
        const token = generateToken(user._id)

        // Responder al cliente con el token
        res.json({
            message: 'Login exitoso',
            token,
        })
    } catch (error) {
        res.status(401).json({
            message: error.message,
        })
    }
}
