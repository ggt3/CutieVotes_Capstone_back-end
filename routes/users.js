import express from 'express'
import User from '../models/User.js'

const router = new express.Router()

//get all users
router.get('/', async (req, res) => {
    // res.send('Get All Users')
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        console.log(error);
        
    }
})