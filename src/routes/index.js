import { Router } from 'express'
import { conn } from '../db.js'

const router = Router()

//case page index
router.get('/', async (req, res) => {
  const [result] = await conn.query('SELECT id_daily, concept, amount, person, DATE_FORMAT(date, "%Y-%m-%d") as date FROM daily_movements')
  // console.log("sum", sum);
  res.render('index', {
    title: 'Cuentas from server 1',
    data: result,
    page: 1
  })
})

//pending
router.get('/select', async (req, res) => {
  const [result] = await conn.query('SELECT id_daily, concept, amount, person, DATE_FORMAT(date, "%Y-%m-%d") as date FROM daily_movements')
  res.send(result)
})

//pending
router.post('/add', async (req, res) => {
  const data = req.body
  console.log('data', data);
  const [result] = await conn.query('INSERT INTO daily_movements set ?', [data])
  console.log('result', result );
  res.redirect('/')
})

//pending
router.get('/delete/:id_daily', async (req, res) => {
  const id = req.params.id_daily
  const [result] = await conn.query('DELETE FROM daily_movements WHERE id_daily = ?', [id])
  console.log('result', result );
  console.log('id', id );
  res.redirect('/')
})
//pending
router.get('/update/:id_daily', async (req, res) => {
  const id = req.params.id_daily
  const [result] = await conn.query('SELECT id_daily, concept, amount, person, DATE_FORMAT(date, "%Y-%m-%d") as date FROM daily_movements WHERE id_daily = ?', [id])
  console.log("result", result);
  res.render('edit', {
    title: 'Cuentas from server 1',
    data: result
  })
})

//pending
router.post('/update/:id_daily', async (req, res) => {
  const id = req.params.id_daily
  const data = req.body
  const [result] = await conn.query('UPDATE daily_movements set ? WHERE id_daily = ?', [data, id] )
  console.log(result);
  res.redirect('/')
})

//cases page about
router.get('/about', (req, res) => res.render('about', { title: 'Cuentas from server 2', page: 2}))

// pending
router.get('/account', async (req, res) => {
  const [result] = await conn.query('SELECT id_account, bank, concept, person, amount, msi, partiality, miss_mounth, pay, miss_pay, DATE_FORMAT(date, "%m-%d") as date, status FROM accont_status')
  res.send(result)
})

// pending
router.post('/add-account', async (req, res) => {
  const data = req.body
  const dataQuery = req.query
  console.log('data', data);
  console.log('dataQuery', dataQuery);
  const [result] = await conn.query('INSERT INTO accont_status set ?', [data])
  console.log('result', result );
  res.redirect('/about')
})

//cases page contact
router.get('/contact', (req, res) => res.render('contact', { title: 'Cuentas from server 2', page: 3 }))

//cases page contact
router.get('/dates', async (req, res) => {
  const [result] = await conn.query('SELECT id_limit, bank, amount, DATE_FORMAT(date_cutoff, "%Y-%m-%d") as date_cutoff, DATE_FORMAT(date_limit, "%Y-%m-%d") AS date_limit, TIMESTAMPDIFF(DAY, CURDATE(), date_cutoff) AS days_cutoff, TIMESTAMPDIFF(DAY, CURDATE(), date_limit) AS days_limit, record, status from limit_date')
  res.send(result)
})

// pending
router.post('/add-dates', async (req, res) => {
  const data = req.body
  console.log('data', data);
  const [result] = await conn.query('INSERT INTO limit_date set ?', [data])
  console.log('result', result );
  res.redirect('/contact')
})

//cases page daily-taxes
router.get('/daily-taxes', (req, res) => res.render('dailyTaxes', { title: 'Cuentas from server 2', page: 4 }))

//pending
router.get('/taxes-daily-data', async (req, res) => {
  const [result] = await conn.query('SELECT id_daily_taxes, DATE_FORMAT(date, "%Y-%m-%d") as date, amount, percentage, amount_year, amount_month, amount_week, amount_daily FROM daily_taxes')
  res.send(result)
})

//cases page graphic
router.get('/cards', (req, res) => res.render('cards', { title: 'Cuentas from server 2', page: 5 }))

//pending
router.get('/cards-select', async (req, res) => {
  const [result] = await conn.query('SELECT * FROM cards')
  res.send(result)
})

//cases page graphic
router.get('/graphic', (req, res) => res.render('graphic', { title: 'Cuentas from server 2', page: 6 }))










export default router
