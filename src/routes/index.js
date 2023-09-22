import { Router } from 'express'
import { conn } from '../db.js'

const router = Router()

// tabla movimientos diarios
router.get('/select', async (req, res) => {
  const [result] = await conn.query('SELECT id_daily, concept, amount, person, DATE_FORMAT(date, "%Y-%m-%d") as date FROM daily_movements')
  res.send(result)
})

// tabla estados de cuenta
router.get('/account', async (req, res) => {
  const [result] = await conn.query('SELECT id_account, bank, concept, person, amount, msi, partiality, miss_mounth, pay, miss_pay, DATE_FORMAT(date, "%m-%d") as date, status FROM accont_status')
  res.send(result)
})

// tabla fecha de corte y limite de pago
router.get('/dates', async (req, res) => {
  const [result] = await conn.query('SELECT id_limit, bank, amount, DATE_FORMAT(date_cutoff, "%Y-%m-%d") as date_cutoff, DATE_FORMAT(date_limit, "%Y-%m-%d") AS date_limit, TIMESTAMPDIFF(DAY, CURDATE(), date_cutoff) AS days_cutoff, TIMESTAMPDIFF(DAY, CURDATE(), date_limit) AS days_limit, record, status from limit_date')
  res.send(result)
})

router.post('/add-dates', async (req, res) => {
  const data = req.body
  console.log('data', data);
  const [result] = await conn.query('INSERT INTO limit_date set ?', [data])
  console.log('result', result );
  res.redirect('/contact')
})

// tabla estados de cuenta// tabla estados de cuenta
router.post('/add-account', async (req, res) => {
  const data = req.body
  const dataQuery = req.query
  console.log('data', data);
  console.log('dataQuery', dataQuery);
  const [result] = await conn.query('INSERT INTO accont_status set ?', [data])
  console.log('result', result );
  res.redirect('/about')
})


//caso 1
router.get('/', async (req, res) => {
  // const [result] = await conn.query('SELECT * FROM daily_movements')
  const [result] = await conn.query('SELECT id_daily, concept, amount, person, DATE_FORMAT(date, "%Y-%m-%d") as date FROM daily_movements')
  const [sum] = await conn.query('SELECT SUM(amount) as total FROM daily_movements')
  // console.log('result', result);
  console.log("sum", sum);
  res.render('index', {
    title: 'Cuentas from server 1',
    data: result,
    total: sum,
    page: 1
  })
})

router.post('/add', async (req, res) => {
  const data = req.body
  console.log('data', data);
  const [result] = await conn.query('INSERT INTO daily_movements set ?', [data])
  console.log('result', result );
  res.redirect('/')
})

router.get('/delete/:id_daily', async (req, res) => {
  const id = req.params.id_daily
  const [result] = await conn.query('DELETE FROM daily_movements WHERE id_daily = ?', [id])
  console.log('result', result );
  console.log('id', id );
  res.redirect('/')
  // console.log(req.params.id_daily);
  // res.send('works')
})

router.get('/update/:id_daily', async (req, res) => {
  const id = req.params.id_daily
  const [result] = await conn.query('SELECT id_daily, concept, amount, person, DATE_FORMAT(date, "%Y-%m-%d") as date FROM daily_movements WHERE id_daily = ?', [id])
  console.log("result", result);
  res.render('edit', {
    title: 'Cuentas from server 1',
    data: result
  })
})

router.post('/update/:id_daily', async (req, res) => {
  const id = req.params.id_daily
  const data = req.body
  const [result] = await conn.query('UPDATE daily_movements set ? WHERE id_daily = ?', [data, id] )
  console.log(result);
  res.redirect('/')
})

//solo es estructura, modificar como en el caso1
// controller.save = (req, res) => {
//   console.log('req.body', req.body);
//   res.send('works')
//   // req.body
// }

router.get('/about', (req, res) => res.render('about', { title: 'Cuentas from server 2', page: 2}))
router.get('/contact', (req, res) => res.render('contact', { title: 'Cuentas from server 2', page: 3 }))
// router.get('/edit', (req, res) => res.render('edit'))


export default router
