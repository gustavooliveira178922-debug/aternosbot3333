// index.js
const mineflayer = require('mineflayer')
const express = require('express')

const BOT_HOST = process.env.BOT_HOST || 'gustavo1288.aternos.me'
const BOT_PORT = parseInt(process.env.BOT_PORT || '59180', 10)
const BOT_USERNAME = process.env.BOT_USERNAME || 'BotAFK'

// cria o bot Minecraft
const bot = mineflayer.createBot({
  host: BOT_HOST,
  port: BOT_PORT,
  username: BOT_USERNAME
})

bot.on('login', () => {
  console.log('Bot logado em', BOT_HOST + ':' + BOT_PORT)
})
bot.on('error', err => console.error('Bot error:', err))
bot.on('end', () => {
  console.log('Bot desconectado')
})

// keepalive HTTP para Koyeb (healthcheck)
const app = express()
app.get('/', (req, res) => res.send('OK'))
const webPort = process.env.PORT || 8000
app.listen(webPort, () => console.log('Web server listening on', webPort))
