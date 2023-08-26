import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import indexRoutes from './routes/index.js'
import { PORT } from "./config.js";
import { conn } from './db.js'

// const PORT = process.env.PORT || 3000
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(indexRoutes)

app.use(express.static(join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log(`tu server esta listo en el puerto ${PORT}`)
})

// MySQL connection
// Query test
app.get('/ping', async (req, res) => {
  const [result] = await conn.query(`SELECT 'hello world' AS RESULT`)
  res.json(result[0])
  res.send('welcome')
})

// Insert Query
app.get('/create', async (req, res) => {
  const result = await conn.query('INSERT INTO daily_movements VALUES (null, "prueba1", 1, "Jose", "2023-08-25")')
  res.json(result)
})

// Select Query
app.get('/select', async (req, res) => {
  const [rows] = await conn.query('SELECT * FROM daily_movements')
  res.json(rows)
})