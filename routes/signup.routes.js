import express from 'express'
import { User } from '../models/index.model.js'

const router = express.Router()

router.post('/signup', async (req, res) => {
    try {
        const { name, ageGroup, interests, phone, email, password } = req.body


        if (!name || !ageGroup || !phone || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }


        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" })
        }

        const user = new User({ name, ageGroup, interests, phone, email, password })
        await user.save()

        res.status(201).json({ message: "Sign up successful" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
})

export default router
