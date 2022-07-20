const { WAConnection, MessageType } = require('@adiwajshing/baileys').default
const makeWASocket = require("@adiwajshing/baileys").default
const { exec, spawn, execSync } = require("child_process")
const pino = require('pino')
const fs = require('fs')
const fetch = require('node-fetch')
const qrcode = require("qrcode-terminal")
const { delay, useSingleFileAuthState } = require("@adiwajshing/baileys")
exec('rm -rf session.json')
const { state, saveState } = useSingleFileAuthState(`./session.json`)


function Kichu() {
  let ToxicKichu = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    browser: ["LIZA-MWOL-MD", "Mac", "3.0.0"]
  })
  ToxicKichu.ev.on("connection.update", async (s) => {
    const { connection, lastDisconnect } = s
    if (connection == "open") {
      await delay(1000 * 10)
      const session = fs.readFileSync('./session.json')

 
    

      await ToxicKichu.sendMessage(ToxicKichu.user.id, { document: session, mimetype: 'application/json', fileName: `session.json`})
      await ToxicKichu.sendMessage(ToxicKichu.user.id, {text: `*LIZA MWOL MD BOT: SESSION*\n\n*NB: DONT SHARE THIS SESSION FILE*\n*Fork this repo* https://github.com/Chunkindepadayali/LIZA-MWOL-MD\n\n*Fork and upload this json file to your repo, and change deploy link in README.*\n\n*DONT FORGET TO GIVE IT A STAR BRO ENJOY*`})

      process.exit(0)
    }
    if (
      connection === "close" &&
      lastDisconnect &&
      lastDisconnect.error &&
      lastDisconnect.error.output.statusCode != 401
    ) {
      Kichu()
    }
  })
  ToxicKichu.ev.on('creds.update', saveState)
  ToxicKichu.ev.on('messages.upsert', () => { })
}
Kichu()
