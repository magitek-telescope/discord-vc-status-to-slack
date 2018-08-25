const Eris = require('eris')
const bot = new Eris(process.env.DISCORD_CLIENT_TOKEN)
const SERVER_NAME = process.env.DISCORD_SERVER_NAME
const WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
const axios = require('axios')
const moment = require('moment')
const { inspect } = require('util')

try {
  bot.on('ready', () => {
    console.log(`[${moment().format()}] INFO start ${SERVER_NAME}`)
    axios.post(WEBHOOK_URL, {
      text: 'Discord bot ready.'
    })
  })

  bot.on('voiceChannelJoin', (member, channel) => {
    if (member.guild.name !== SERVER_NAME) {
      return
    }
    console.log(`[${moment().format()}] INFO join ${member.username}`)
    const text = `[Discord] ${member.username} joined(${channel.name})`
    axios.post(WEBHOOK_URL, { text })
  })

  bot.on('voiceChannelLeave', (member, channel) => {
    if (member.guild.name !== SERVER_NAME) {
      return
    }
    console.log(`[${moment().format()}] INFO leave ${member.username}`)
    const text = `[Discord] ${member.username} left(${channel.name})`
    axios.post(WEBHOOK_URL, { text })
  })

  bot.connect()
} catch(e) {
  console.log(`[${moment().format()}] ERROR catcherror ${inspect(e)}`)
  process.exit(1)
}
