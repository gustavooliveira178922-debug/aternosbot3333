// index.js
const mineflayer = require('mineflayer')
const express = require('express')

const BOT_HOST = process.env.BOT_HOST || 'gustavo1288.aternos.me'
const BOT_PORT = parseInt(process.env.BOT_PORT || '59180', 10)
const BOT_USERNAME = process.env.BOT_USERNAME || 'BotAFK'

let bot

function createBot() {
  bot = mineflayer.createBot({
    host: BOT_HOST,
    port: BOT_PORT,
    username: BOT_USERNAME
  })

  bot.on('login', () => {
    console.log('✅ Bot logado em', BOT_HOST + ':' + BOT_PORT)
  })

  bot.on('error', err => {
    console.error('❌ Bot error:', err)
  })

  bot.on('end', () => {
    console.log('⚠️ Bot desconectado. Tentando reconectar em 10s...')
    setTimeout(createBot, 10000) // reconecta depois de 10 segundos
  })
}

// inicia o bot
createBot()

// keepalive HTTP para Koyeb (healthcheck)
const app = express()
app.get('/', (req, res) => res.send('Bot online'))
const webPort = process.env.PORT || 8000
app.listen(webPort, () => console.log('🌍 Web server listening on', webPort))
