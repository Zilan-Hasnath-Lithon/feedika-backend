import jsonwebtoken from 'jsonwebtoken'

export const tokenCheck = (req, res, next) => {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: "Error!!" })

    try {
        const decoded = jsonwebtoken.verify(token, process.env.SECRETid)
        req.userId = decoded.id
        next()
    } catch (err) {
        res.status(401).json({ message: "Invalid token" })
    }
}
