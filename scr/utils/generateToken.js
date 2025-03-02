import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',  // El token expirará en 30 días
    })
}

export default generateToken
