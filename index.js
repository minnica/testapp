const express = require('express')

const app = express()
const PORT = process.env.PORT || 3977

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`tu server esta listo en el puerto ${PORT}`)
})
