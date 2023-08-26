import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => res.render('index', { title: 'Cuentas from server 1'}))

router.get('/about', (req, res) => res.render('about', { title: 'Cuentas from server 2'}))

router.get('/contact', (req, res) => res.render('contact', { title: 'message from server 3'}))

export default router
