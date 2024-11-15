// Kalau ada typo atau sesuatu yang masih kurang bantu perbaiki ya, Pull Request aja

//-- Whatsapp Connecting
const {
  WAConnection,
  MessageType,
  Presence,
  Mimetype,
  GroupSettingChange,
  MessageOptions,
  WALocationMessage,
  ReconnectMode,
  ProxyAgent,
  waChatKey,
  mentionedJid,
  processTime,
  ChatModification,
  whatsappID,
  WAConnectionTest,
} = require('@adiwajshing/baileys');

//-- Functions
const {color, bgcolor} = require('./fs/color');
const {fetchJson, fetchText} = require('./fs/fetcher');
const {recognize} = require('./fs/ocr');
const {_wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, success, close } = require('./fs/functions');

//-- Modules
const fs = require('fs');
const moment = require('moment-timezone');
const {exec} = require('child_process');
const fetch = require('node-fetch');
const ffmpeg = require('fluent-ffmpeg');
const imgbb = require('imgbb-uploader');
const speed = require('performance-now');
const cd = 4.32e+7 ;
const crypto = require('crypto');
const qrcode = require("qrcode-terminal");
const axios = require('axios');
const path = require('path');
const {removeBackgroundFromImageFile} = require('remove.bg');

//-- Data
const up = JSON.parse(fs.readFileSync('./data/setting.json'));
const _welcom = JSON.parse(fs.readFileSync('./data/welcom.json'));
const _user = JSON.parse(fs.readFileSync('./data/user.json'));
const _antilink = JSON.parse(fs.readFileSync('./data/antilink.json'));
const hit = JSON.parse(fs.readFileSync('./data/totalhit.json'))

//-- Media
const _stik = JSON.parse(fs.readFileSync('./media/stik.json'))
const _vid = JSON.parse(fs.readFileSync('./media/vid.json'))
const _vn = JSON.parse(fs.readFileSync('./media/vn.json'))
const _img = JSON.parse(fs.readFileSync('./media/image.json'))

//-- Result
const _truth = JSON.parse(fs.readFileSync('./result/truth.json'));
const _dare = JSON.parse(fs.readFileSync('./result/dare.json'));
const _fakta = JSON.parse(fs.readFileSync('./result/fakta.json'));
const _ilham = JSON.parse(fs.readFileSync('./result/ilham.json'));
const _dilan = JSON.parse(fs.readFileSync('./result/dilan.json'));
const _gombal = JSON.parse(fs.readFileSync('./result/gombal.json'));
const _hacker = JSON.parse(fs.readFileSync('./result/hacker.json'));
const { bahasa } = require('./result/kodebahasa');
const { negara } = require('./result/kodenegara');

//-- Report
const _lapor = JSON.parse(fs.readFileSync('./report/lapor.json'));
const _request = JSON.parse(fs.readFileSync('./report/request.json'));

//-- Help
const { menu, menu1, menu2, menuOwner, menuGrup} = require('./help/menu');
const { info } = require('./help/info');
const { termux } = require('./help/termux');
const { wait, stick, err, group, ban, ownerB, premi, userB, admin, Badmin } = require('./help/respon');

//-- Setting
const prefix = up.prefix
const memberlimit = up.memberlimit;
const banned = [
  ];
const premium = [
  ];
const ownerNumber = [
  "212625458341@s.whatsapp.net",
  ];

//-- Apikey
const Vkey = 'apivinz'
const Xinz = 'XinzBot'
const Pkode = 'pais'

//-- Waktu dan tanggal
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}
function tanggal(){
myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
			myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum\'at','Sabtu'];
			var tgl = new Date();
			var day = tgl.getDate()
			bulan = tgl.getMonth()
			var thisDay = tgl.getDay(),
			thisDay = myDays[thisDay];
			var yy = tgl.getYear()
			var year = (yy < 1000) ? yy + 1900 : yy;
			return `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}

//--Whatsapp start connect
async function starts() {
	const Lxa = new WAConnection()
	Lxa.logger.level = 'warn'
	Lxa.on('qr', () => {
		console.log(color('[البوت :]','aqua'), color("Scan QR code for Connecting...", "yellow"))
	})
	fs.existsSync('./session/Lexa.json') && Lxa.loadAuthInfo('./session/Lexa.json')
Lxa.on('connecting', () => {
        const time_connecting = moment.tz('Asia/Jakarta').format('HH:mm:ss')
        console.log(color('[البوت :]','aqua'), color("Wait For Connecting...", "yellow"))
    })
Lxa.on('open', () => {
        const time_connect = moment.tz('Asia/Jakarta').format('HH:mm:ss')
        console.log(color('[البوت :]','aqua'), color(`Done Connecting`, "aqua"))
        start('')
    })
	await Lxa.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session/Lexa.json', JSON.stringify(Lxa.base64EncodedAuthInfo(), null, '\t'))

Lxa.on('group-participants-update', async (anu) => {
		if (!_welcom.includes(anu.jid)) return
		try {
			const mdata = await Lxa.groupMetadata(anu.jid)
			if (anu.action == 'add') {
				num = anu.participants[0]
				hai = `مرحبا @${num.split('@')[0]}
مرحبا بك في
قروب *${mdata.subject}*
اكتب ${prefix}اشتراك لمشاهدة اوامر البوت.`
				Lxa.sendMessage(mdata.id, hai, MessageType.text, { contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				bye = `مع السلامة @${num.split('@')[0]}👋`
				Lxa.sendMessage(mdata.id, bye, MessageType.text, {contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

const blocked = []
Lxa.on('CB:Blocklist', json => {
      if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

Lxa.on('chat-update', async (mek) => {
  if (!mek.hasNewMessage) return
  mek = mek.messages.all()[0]
  if (!mek.message) return
  if (mek.key && mek.key.remoteJid == 'status@broadcast') return
  if (mek.key.fromMe) return
  global.prefix
  global.blocked
  const content = JSON.stringify(mek.message)
  const from = mek.key.remoteJid
  const type = Object.keys(mek.message)[0]
  const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
  const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
  const jam = moment.tz('Asia/Jakarta').format('HH:mm')

//--
const body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
const budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const is = budy.slice(0).trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const value = args.join(' ')
const isCmd = body.startsWith(prefix)
const totalchat = await Lxa.chats.all()
const botNumber = Lxa.user.jid
			
//-- Group Metadata
  const isGroup = from.endsWith('@g.us')
  const sender = isGroup ? mek.participant : mek.key.remoteJid
  const groupMetadata = isGroup ? await Lxa.groupMetadata(from) : ''
  const groupName = isGroup ? groupMetadata.subject : ''
  const groupId = isGroup ? groupMetadata.jid : ''
  const groupMembers = isGroup ? groupMetadata.participants : ''
  const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
  const isOwner = ownerNumber.includes(sender)
  const isVerify = _user.includes(sender)
  const isPrem = premium.includes(sender) || isOwner
  const isBan = blocked.includes(sender)
  const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
  const isGroupAdmins = groupAdmins.includes(sender) || false
  const isWelcom = isGroup ? _welcom.includes(from) : false
  const isAnti = isGroup ? _antilink.includes(from) : false
  const pushname = Lxa.contacts[sender] != undefined ? Lxa.contacts[sender].vname || Lxa.contacts[sender].notify: undefined

//-- other
  const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
  const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = Lxa.user.phone

//-- function reply
			const reply = (teks) => {
				Lxa.sendMessage(from, teks, text, {quoted:mek })
			}
			
			const sendMess = (hehe, teks) => {
				Lxa.sendMessage(hehe, teks, text)
			}
			
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? Lxa.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : Lxa.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
      const replyimg = (pesan, tipe, rep1, rep2) => {
        Lxa.sendMessage(from, pesan, tipe, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": `${rep1}`,
"fileLength": "201809",
"jpegThumbnail": `${rep2}` } } }})
      }
			
//--MessageType
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedText = type === 'extendedTextMessage' && content.includes('textMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')


//-- watermark stiker
			function addMetadata(packname, author) {	
				if (!packname) packname = '𝐗𝐃𝟏 𝐓𝐄𝐀𝐌'; if (!author) author = pushname ;	
				author = author.replace(/[^a-zA-Z0-9]/g, '');	
				let name = `${author}_${packname}`
				if (fs.existsSync(`./exif/${name}.exif`)) return `./exif/${name}.exif`
				const json = {	
					"sticker-pack-name": packname,
					"sticker-pack-publisher": author,
				}
				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

				let len = JSON.stringify(json).length	
				let last	

				if (len > 256) {	
					len = len - 256	
					bytes.unshift(0x01)	
				} else {	
					bytes.unshift(0x00)	
				}	

				if (len < 16) {	
					last = len.toString(16)	
					last = "0" + len	
				} else {	
					last = len.toString(16)	
				}	

				const buf2 = Buffer.from(last, "hex")	
				const buf3 = Buffer.from(bytes)	
				const buf4 = Buffer.from(JSON.stringify(json))	

				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

				fs.writeFile(`./exif/${name}.exif`, buffer, (err) => {	
					return `./exif/${name}.exif`	
				})	

			}

//--Colors
colors = ['red','white','black','blue','yellow','green']

//--Console log grup
if (!isGroup && isCmd) console.log(color('[البوت :]','aqua'), "CP", color(command, "orange"), "from", (sender.split('@')[0]),  args.length)
			
//--Console log chat pribadi
if (isGroup && isCmd) console.log(color('[البوت :]','aqua'), "GC", color(command, "orange"), "from", (sender.split('@')[0]), "in", (groupName), args.length)


//-- Cek fitur
let prem_ = 'User Free'
			if (isPrem) {
			prem_ = 'User Premium'
			} 
			if (isOwner) {
			prem_ = '*VVIP*'
			}
let Welcome_ = 'Off'
			if (isWelcom) {
			Welcome_ = 'On'
			}
let AntiLink_ = 'Off'
			if (isAnti) {
			AntiLink_ = 'On'
			}

//--- Total command
const cmdadd = () => {
	hit[0].totalcmd += 1
	fs.writeFileSync('./data/totalhit.json', JSON.stringify(hit))
}
  if (isCmd) cmdadd()
  const reqcmd = JSON.parse(fs.readFileSync('./data/totalhit.json'))[0].totalcmd

//--Member limit
if (isGroup) {
  try {
    const getmemex = groupMembers.length
    if (getmemex <= memberlimit) {
  Lxa.sendMessage(from, `Maaf syarat member harus di atas ${memberlimit}, مع السلامة 👋🏻`, text)

    setTimeout(() => {
    Lxa.groupLeave(from) // ur cods
  }, 5000) // 1000 = 1s,
}
  } catch {
console.error(err)
  }
}

// ---- Antilink 
const linkwa = 'https://chat.whatsapp.com/'
		if (budy.includes(`${linkwa}`)){
		if (!isGroup) return
		if (!isAnti) return
    if (!isBotGroupAdmins) return reply('لحسن الحظ فارس ليس مشرفًا ، إذا كان الأمر كذلك ، فسأركلك')
    linkgc = await Lxa.groupInviteCode (from)
    if (budy.includes(`${linkwa}${linkgc}`)) return reply('محظوظ ارتباط هذه المجموعة')
		if (isGroupAdmins) return reply(`هممم جيد`)
		Lxa.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		setTimeout( () => {
		reply('byee')
		}, 1100)
		setTimeout( () => {
		Lxa.groupRemove(from, [Kick]).catch((e) => {console.log(`*خطأ:* ${e}`)}) 
					}, 1000)
		setTimeout( () => {
		reply(`Antilink قيد التشغيل & تم اكتشاف ارتباط المجموعة آسفًا *${pushname}* سوف تتعرض للركل`)
		}, 0)
	}
	

//-- Anti user ban
if (isCmd && isBan) return reply(banned())

//-- Auto read jika ada pesan
if (isCmd) Lxa.chatRead(from)

//--Auto respon
switch(is) {
case 'assalamualaikum':
reply('waalaikumsallam')
}

//-- Command
switch(command) {
  
//-- List menu
case 'menu':
case 'help':
case 'اوامر':
  if (!isVerify) return reply(userB(prefix))
	uptime = process.uptime()
  capt = `Total Hits : ${reqcmd} \n‣ Rating : ★★★★☆\n‣ Jumlah User : ${_user.length}`
  thum = await fs.readFileSync('./docs/mrf.jpeg').toString('base64')
  if (args.length < 1) return replyimg(menu(tanggal, jam, pushname, sender, prem_, Lxa, prefix, _user, uptime, isGroupAdmins, groupMetadata, groupAdmins, Welcome_, AntiLink_, isGroup, process), text, capt, thum)
  if (args[0] === '1' ) {
   return replyimg(menu1(prefix, tanggal, jam), text, capt, thum)
  } else if (args[0] === '2' ) {
    return replyimg(menu2(prefix, tanggal, jam), text, capt, thum)
 /* } else if (args[0] === '3' ) {
    return reply(menu3(prefix, tanggal, jam))
  } else if (args[0] === 'premium' ) { 
    return reply(menuPrem(prefix, tanggal, jam))
 */} else if (args[0] === 'المالك' ) {
    return replyimg(menuOwner(prefix, tanggal, jam), text, capt, thum)
  } else if (args[0] === 'القروب' ) {
    return replyimg(menuGrup(prefix, tanggal, jam), text, capt, thum)
  }
          break

//-- informasi bot
case 'info':
  uptime = process.uptime()
  reply(info(Lxa, uptime, process, wa_version, mcc, mnc, os_version, device_manufacturer, device_model))
					break

//-- kecepatan respon
case 'speed':
case 'ping':
const timestamp = speed();
const latensi = speed() - timestamp
uptime = process.uptime()
reply(`Pong !! *Speed* : ${latensi.toFixed(4)} _Second_`)
break

//-- Simsimi
case 'bot':
case 'simi':
if (!isVerify) return reply(userB())
		if (args.length < 1) return reply(`Hai ${pushname}`)
		sims = value
		simt = await fs.readFileSync('./media/mrf.jpeg').toString('base64')
					try {
		anu = await fetchJson(`https://fdciabdul.tech/api/ayla/?pesan=${sims}`, {method: 'get'})
    jawab = anu.jawab
replyimg(jawab, text, sims, simt)
} catch (e) {
  reply(err())
  console.log('Error : %s', color(e, 'orange'))
}
break
  
//-- kode bahasa
case 'kodebahasa':
  if (!isVerify) return reply(userB())
  reply(bahasa())
  break

//-- kode negara
case 'kodebahasa':
  if (!isVerify) return reply(userB())
  reply(negara())
  break

//-- quotes senja
case 'senja':
  if (!isVerify) return reply(userB())
		try {
data = await fetchJson(`https://pencarikode.xyz/api/katasenja?apikey=${Pkode}`)
reply(data.message)
		 } catch (e) {
		 console.log('Error : %s', color(e, 'orange'))
		reply(err())
	}
	  break

//-- quotes islam
case 'quotesislam':
  if (!isVerify) return reply(userB())
			      try {
  data = await fetchJson(`https://xinzbot-api.herokuapp.com/api/randomquote/muslim?apikey=${Xinz}`)
  reply(data.result.text_id)
		} catch (e) {
			console.log('Error : %s', color(e, 'orange'))
					reply(err())
		}
	   break



//-- ganteng cek
case 'gantengcek':
  if (args.length < 1) return reply(`Contoh : ${prefix}gantengcek البوت :`)
  if (!isVerify) return reply(userB())
  random = `${Math.floor(Math.random() * 100)}`
  gan = value
  cek = `Target : *${gan}*
Persentase : ${random}%`
Lxa.sendMessage(from, cek, text, {quoted: mek})
break

//--- cantik cek
case 'cantikcek':
  if (args.length < 1) return reply(`Contoh : ${prefix}cantikcek البوت :`)
  if (!isVerify) return reply(userB())
  random = `${Math.floor(Math.random() * 100)}`
  can = value
  cek = `Target : *${can}*
Persentase : ${random}%`
Lxa.sendMessage(from, cek, text, {quoted: mek})
break

//--- apakah
case 'apakah':
if (!isVerify) return reply(userB())
if (args.length < 1) return reply(`Contoh : ${prefix}apakah aku jelek`)
apa = value
naon = ["Iya","Tidak","Mungkin"]
random = naon[Math.floor(Math.random() * (naon.length))]
apakah = `Apakah *${apa}*
Jawaban : ${random}`
reply(apakah)
break

//--- rate
case 'rate':
if (!isVerify) return reply(userB())
if (args.length < 1) return reply(`Contoh : ${prefix}rate aku jelek`)
rate = value
random = `${Math.floor(Math.random() * 100)}`
rating = `Rate ${rate}
Persentase : ${random}%`
reply(rating)
break

//--- bisakah
case 'bisakah':
if (!isVerify) return reply(userB())
if (args.length < 1) return reply(`Contoh : ${prefix}bisakah aku terbang`)
bisa = value
naon = ["Iya","Tidak","Mungkin"]
random = naon[Math.floor(Math.random() * (naon.length))]
bisakah = `Bisakah ${bisa}
Jawaban : ${random}`
reply(bisakah)
break

//--- kapankah
case 'kapankah':
if (!isVerify) return reply(userB())
if (args.length < 1) return reply(`Contoh : ${prefix}kapankah aku menikah`)
kapan = value
no = `${Math.floor(Math.random() * 100)}`
naon = ["Jam lagi","Hari lagi","Minggu lagi","Bulan lagi","Tahun lagi"]
random = naon[Math.floor(Math.random() * (naon.length))]
kapan = `Kapankah ${kapan}
Jawaban : ${no} ${random}`
reply(kapan)
break

//--- ciee
case 'ciee':
case 'cie':
    if (!isVerify) return reply(userB())
    if (!isGroup) return reply(group())
					jds = []
					meh = ["Putus","Jadian","Tunangan","Menikah","Cerai","Gelud","Ciuman di pinggir jalan"]
					yoyo = meh[Math.floor(Math.random() * meh.length)]
					jdii = groupMembers
					koss = groupMembers
					akuu = jdii[Math.floor(Math.random() * jdii.length)]
				 diaa = koss[Math.floor(Math.random() * koss.length)]
					teks = `Ciee @${akuu.jid.split('@')[0]} & @${diaa.jid.split('@')[0]} yang abis ${yoyo}`
					jds.push(akuu.jid)
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break	

//--- cantik
case 'وسيم':
  if (!isVerify) return reply(userB())
    if (!isGroup) return reply(group())
					jds = []
					 jdii = groupMembers
					 diaa = jdii[Math.floor(Math.random() * jdii.length)]
					teks = `الأكثر * وسامة * هنا @${diaa.jid.split('@')[0]}`
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break

//--- cantik
case 'الاجمل':
  if (!isVerify) return reply(userB())
    if (!isGroup) return reply(group())
					jds = []
					 jdii = groupMembers
					 diaa = jdii[Math.floor(Math.random() * jdii.length)]
					teks = `الاجمل هنا هو : @${diaa.jid.split('@')[0]}`
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break

//--- jelek
case 'قبيح':
  if (!isVerify) return reply(userB())
    if (!isGroup) return reply(group())
					jds = []
					 jdii = groupMembers
					 diaa = jdii[Math.floor(Math.random() * jdii.length)]
					teks = `الأكثر * قبيحة * هنا @${diaa.jid.split('@')[0]}`
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break

//--- sadboy
case 'sadboy':
  if (!isVerify) return reply(userB())
    if (!isGroup) return reply(group())
					jds = []
					 jdii = groupMembers
					 diaa = jdii[Math.floor(Math.random() * jdii.length)]
					teks = `Yang paling *Sadboy* disini adalah @${diaa.jid.split('@')[0]}`
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break

//--- sadgirl
case 'sadgirl':
  if (!isVerify) return reply(userB())
    if (!isGroup) return reply(group())
					jds = []
					 jdii = groupMembers
					 diaa = jdii[Math.floor(Math.random() * jdii.length)]
					teks = `Yang paling *Sadgirl* disini adalah @${diaa.jid.split('@')[0]}`
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break

//--- wibu
case 'wibu':
  if (!isVerify) return reply(userB())
    if (!isGroup) return reply(group())
					jds = []
					 jdii = groupMembers
					 diaa = jdii[Math.floor(Math.random() * jdii.length)]
					teks = `Yang paling *Wibu* disini adalah @${diaa.jid.split('@')[0]}`
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break

//--kutuk
case 'kutuk':
if (!isVerify) return reply(userB())
if (args.length < 1) return reply('منشن شخص')
					if (!isGroup) return reply(group())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					karn = ["Jelek","Ganteng","Miskin","Kaya","Cantik","Tukang PHO","Sering Di PHP in","Wibu","Tolol","Mirip Monyet"]
					karna = karn[Math.floor(Math.random() * karn.length)]
					jad = ["Monyet","Pengusaha","Pacar Kekeyi","Lonthe","Jelek","Patung","Kodok","Babi","Anak Anjing","Istriku","Suamiku","Setan"]
					jadi = jad[Math.floor(Math.random() * jad.length)]
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(from, mentioned, true)
					} else {
						mentions(`Karna @${mentioned[0].split('@')[0]} *${karna}*, Akan ku kutuk dia jadi *${jadi}*`, mentioned, true)
					}
					break

//-- suit
case 'حوم':
  if (!isVerify) return reply(userB())
					if (!isGroup) return reply(group())
					if (args.length < 1) return reply('اختر مقص/حجر/ورق')
					if (args[0] === 'مقص' ) {
					  مقص = [
					    "أنت *مقص*\nالبوت : *ورق*\nانت فزت 😔",
					    "أنت *مقص*\nالبوت : *حجر*\nفزت عليك 🙂",
					    "أنت *مقص*\nالبوت : *مقص*\nتعادل 😏"
					    ]
					  gun = مقص[Math.floor(Math.random() * مقص.length)]
					  reply(gun)
					} else if (args[0] === 'ورق') {
					  ker = [
					    "أنت *ورق*\nالبوت : *حجر*\nانت فزت 😔",
					    "أنت *ورق*\nالبوت : *مقص*\nفزت عليك 🙂",
					    "أنت *ورق*\nالبوت : *ورق*\nتعادل 😏"
					    ]
					  ورق = ker[Math.floor(Math.random() * ker.length)]
						reply(ورق)
					} else if (args[0] === 'حجر') {
					  bat = [
					    "أنت *حجر*\nالبوت : *مقص*\nانت فزت 😔",
					    "أنت *حجر*\nالبوت : *ورق*\nفزت عليك 🙂",
					    "أنت *حجر*\nالبوت : *حجر*\nتعادل 😏"
					    ]
					  حجر = bat[Math.floor(Math.random() * bat.length)]
					  reply(حجر)
					} else {
					  reply('اختر مقص/حجر/ورق')
					}
break

//-- Tod truth
case 'truth':
  if (!isVerify) return reply(userB())
  const truth = _truth[Math.floor(Math.random() * _truth.length)]
  reply(`‣ *Dare*\n${truth}`)
break

//-- Tod dare
case 'dare':
  if (!isVerify) return reply(userB())
  const dare = _dare[Math.floor(Math.random() * _dare.length)]
  reply(`‣ *Dare*\n${dare}`)
break

//-- quotes dilan
case 'dilan':
  if (!isVerify) return reply(userB())
  const dilan = _dilan[Math.floor(Math.random() * _dilan.length)]
  reply(dilan)
break

//-- quotes ilham
case 'فارس':
  if (!isVerify) return reply(userB())
  const ilham = _ilham[Math.floor(Math.random() * _ilham.length)]
  reply(ilham)
break

//-- gombal
case 'gombal':
  if (!isVerify) return reply(userB())
  const gombal = _gombal[Math.floor(Math.random() * _gombal.length)]
  reply(gombal)
break

//-- hacker
case 'hacker':
  if (!isVerify) return reply(userB())
  const hacker = _hacker[Math.floor(Math.random() * _hacker.length)]
  reply(hacker)
break

//-- fakta
case 'معلومات':
  if (!isVerify) return reply(userB())
  const fakta = _fakta[Math.floor(Math.random() * _fakta.length)]
  reply(fakta)
break

case 'pantun':
  fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-pantun-pakboy.txt')
            .then(res => res.text())
            .then(body =>
            {
  let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
              reply(pantun)
            })
              break

//-- link whatsapp
case 'تواصل':
  if (!isVerify) return reply(userB())
					reply(`wa.me/${sender.split('@')[0]}\nAtau\napi.whatsapp.com/send?phone=${sender.split('@')[0]}`)
			break

//-- Pengucapan ulang
case 'say':
case 'كرر':
  if (!isVerify) return reply(userB())
sendMess(from, value)
break

//-- salin teks dalam gambar
case 'ocr':
  if (!isVerify) return reply(userB())
			if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
			const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
			const media = await Lxa.downloadAndSaveMediaMessage(encmedia)
			reply(wait())
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err(prefix))
								fs.unlinkSync(media)
							})
					} else {
						reply('Gunakan foto')
					}
		break

//-- Merubah video jadi audio
case 'تحويل لصوة':
					if (!isQuotedVideo && isMedia) return reply('يرجى إعادة تشغيل الفيديو الذي تم إرساله')
					reply(wait())
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await Lxa.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('فشل تحويل الفيديو إلى mp3')
						bufferlkj = fs.readFileSync(ran)
						Lxa.sendMessage(from, bufferlkj, audio, {mimetype: 'audio/mp4', quoted: mek})
						fs.unlinkSync(ran)
					})
					break

//-- slow
case 'slow':
  if (!isQuotedAudio) return reply('Reply Audionya')
  if (!isVerify) return reply(userB())
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await Lxa.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						Lxa.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break

//-- gemuk
case 'gemuk':
  if (!isQuotedAudio) return reply('Reply Audionya')
  if (!isVerify) return reply(userB())
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await Lxa.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						Lxa.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break

//-- tupai
case 'tupai':
  if (!isQuotedAudio) return reply('Reply Audionya')
  if (!isVerify) return reply(userB())
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await Lxa.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						Lxa.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break

//-- to vn
case 'tovn':
  if (!isQuotedAudio) return reply('Reply Audionya')
  if (!isPrem) return reply(premi())
					reply(wait())
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await Lxa.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('يفشل !!! mengkonversi audio ke ptt')
						topt = fs.readFileSync(ran)
						Lxa.sendMessage(from, topt, audio, {mimetype: 'audio/mp4', quoted: mek, ptt:true})
						})
					break

//--- bass
case 'bass': 
  if (!isQuotedAudio) return reply('Reply Audionya')
  if (!isVerify) return reply(userB())
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await Lxa.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						Lxa.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break

//--- nighcore
case 'nightcore':
  if (!isVerify) return reply(userB())
  if (!isPrem) return reply(premi())
	if (!isQuotedAudio) return reply('Reply Audionya')
					night = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					core = await Lxa.downloadAndSaveMediaMessage(night)
					ran = getRandom('.mp3')
					reply(wait())
					exec(`ffmpeg -i ${core} -filter:a atempo=1.06,asetrate=44100*1.25 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(core)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						Lxa.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:false, quoted: mek, ptt: true})
						fs.unlinkSync(ran)
					   })
				       break

//-- add stiker
case 'gets': case 'getstick': case 'getstik':
			  if (args.length < 1) return reply(`Masukan juga nama stiker pada ${prefix}liststik`)
				stik = value
				try {
				result = fs.readFileSync(`./media/stick/${stik}.webp`)
				Lxa.sendMessage(from, result, sticker, selepbot)
				} catch {
				  reply('Pack tidak terdaftar')
				}
				 
				break

//--- menampilkan list stiker
case 'liststik':
			if (!isVerify) return reply(userB())
			teks = ` ≡ *STICKER PACK*\nGunakan perintah ${prefix}getstik untuk mengambil stiker\n*Total* : ${_stik.length}\n┌───⊷ *LIST* ⊶\n`
	    for (let stik of _stik) {
	    teks += `├╼ ${stik}\n`
					}
	    teks += `└──────────────`
	    reply(teks.trim())
				break

//-- menambah stiker
case 'addstik':
				if (!isQuotedSticker) return reply('Reply stiker nya')
				if (!isOwner) return reply(ownerB())
				stik = value
				if (!stik) return reply('Nama sticker nya apa?')
				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await Lxa.downloadMediaMessage(boij)
				_stik.push(`${stik}`)
				fs.writeFileSync(`./media/stick/${stik}.webp`, delb)
				fs.writeFileSync('./media/stik.json', JSON.stringify(_stik))
				Lxa.sendMessage(from, `Sukses Menambahkan Sticker\nCek dengan cara ${prefix}liststik`, MessageType.text, { quoted: mek })
				 
				break

//--- menambah vn
case 'addvn':
				if (!isQuotedAudio) return reply('Reply vnnya')
				if (!isOwner) return reply(ownerB())
				vn = value
				if (!vn) return reply('Nama audionya apa')
				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await Lxa.downloadMediaMessage(boij)
				_vn.push(`${vn}`)
				fs.writeFileSync(`./media/audio/${vn}.mp3`, delb)
				fs.writeFileSync('./media/vn.json', JSON.stringify(_vn))
				Lxa.sendMessage(from, `Sukses Menambahkan Audio\nCek dengan cara ${prefix}listvn`, MessageType.text, { quoted: mek })
				 
				break

//--- mengambil vn
case 'getvn':
			  if (args.length < 1) return reply(`Masukan juga nama vn pada ${prefix}listvn`)
				vn = value
				try {
				buffer = fs.readFileSync(`./media/audio/${vn}.mp3`)
				Lxa.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: mek, ptt: true })
				} catch {
				  reply('Pack tidak terdaftar')
				}
				 
				break

//-- list vn
case 'listvn':
case 'vnlist':
      teks = ` ≡ *VN PACK*\nGunakan perintah ${prefix}getvn untuk mengambil vn\n*Total* : ${_vn.length}\n┌───⊷ *LIST* ⊶\n`
	    for (let vn of _vn) {
	    teks += `├╼ ${vn}\n`
					}
	    teks += `└──────────────`
	    reply(teks.trim())
				break

//-- menambah foto
			case 'addimg':
				if (!isQuotedImage && isMedia) return reply('Reply imagenya')
				if (!isOwner) return reply(ownerB())
				img = value
				if (!img) return reply('Nama imagenya apa')
				fto = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await Lxa.downloadMediaMessage(fto)
				_img.push(`${img}`)
				fs.writeFileSync(`./media/foto/${img}.jpeg`, delb)
				fs.writeFileSync('./media/image.json', JSON.stringify(_img))
				Lxa.sendMessage(from, `Sukses Menambahkan Foto\nCek dengan cara ${prefix}listimg`, MessageType.text, { quoted: mek })
				 
				break

//--- mengambil foto
			case 'getimg':
			  if (args.length < 1) return reply(`Masukan juga nama image pada ${prefix}listimg`)
				img = value
				try {
				buffer = fs.readFileSync(`./media/foto/${img}.jpeg`)
				Lxa.sendMessage(from, buffer, image, { quoted: mek })
				} catch {
				  reply('Pack tidak terdaftar')
				}
				 
				break

//--- list foto
			case 'listimg':
				teks = ` ≡ *Image PACK*\nGunakan perintah ${prefix}getimg untuk mengambil image\n*Total* : ${_img.length}\n┌───⊷ *LIST* ⊶\n`
	    for (let img of _img) {
	    teks += `├╼ ${img}\n`
					}
	    teks += `└──────────────`
	    reply(teks.trim())
				break

//--- menambah video
			case 'addvid':
			  if (!isOwner) return reply(ownerB())
				if (!isQuotedVideo && isMedia) return reply('Reply videonya')
				vid = value
				if (!vid) return reply('Nama videonya')
				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await Lxa.downloadMediaMessage(boij)
				_vid.push(`${vid}`)
				fs.writeFileSync(`./media/video/${vid}.mp4`, delb)
				fs.writeFileSync('./media/vid.json', JSON.stringify(_vid))
				Lxa.sendMessage(from, `Sukses Menambahkan Video\nCek dengan cara ${prefix}listvid`, MessageType.text, { quoted: mek })
				
				break

//--- mengambil video
			case 'getvid':
			  if (args.length < 1) return reply(`Masukan juga nama video pada ${prefix}listvid`)
				vid = value
				try {
				buffer = fs.readFileSync(`./media/video/${vid}.mp4`)
				Lxa.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: mek })
				} catch {
				  reply('Pack tidak terdaftar')
				}
				 
				break

//--list video
			case 'listvid':
				teks = ` ≡ *VIDEO PACK*\nGunakan perintah ${prefix}getvid untuk mengambil video\n*Total* : ${_vid.length}\n┌───⊷ *LIST* ⊶\n`
	    for (let vid of _vid) {
	    teks += `├╼ ${vid}\n`
					}
	    teks += `└──────────────`
	    reply(teks.trim())
				 
				break

//-- pict to sticker
case 'stiker': case 's': case 'stikergif':
case 'ملصق': case 'م': case 'sgif':
  if (!isVerify) return reply(userB())
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await Lxa.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(stick)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata('البوت :', pushname)} ${ran} -o ${ran}`, async (error) => {
									if (error) return reply(stick())
									Lxa.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)	
									fs.unlinkSync(ran)	
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await Lxa.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(wait())
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`يفشل !!!, pada saat mengkonversi ${tipe} ke stiker`)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata('البوت :', pushname)} ${ran} -o ${ran}`, async (error) => {
									if (error) return reply(stick())
									Lxa.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)
									fs.unlinkSync(ran)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else {
						reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
					}
					break

//-- stiker to image
case 'تحويل لصورة':
case 'تواميج':
case 'تحويلص':
  if (!isVerify) return reply(UserB())
					if (!isQuotedSticker) return reply('قم بالرد على الملصق')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await Lxa.downloadAndSaveMediaMessage(encmedia)
					ran= getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply(' فشل ، عند تحويل الملصق إلى صورة ')
						buffer = fs.readFileSync(ran)
						Lxa.sendMessage(from, buffer, image, {quoted:mek, caption: 'Gini kan'})
						fs.unlinkSync(ran)
					})
					break

//-- owner bot
case 'owner':
case 'المالك':
    nomor = '966548322599@s.whatsapp.net'
    owner = await fs.readFileSync('./docs/mrf.jpeg').toString('base64')
    capt = "مطور\nIG : فارس"
    const been = {
    text: `@${nomor.split("@")[0]} `,
  contextInfo: {
mentionedJid: [nomor]
  }
}
replyimg(been, text, capt, owner)
break

//--clear all message
case 'clearchat':
		if (!isOwner) return reply(ownerB())
		anu = await Lxa.chats.all()
		list_chat = await Lxa.chats.all()
    for (let chat of list_chat) {
    Lxa.modifyChat(chat.jid, "delete")
    }
    reply("success clear all chat")
   break

//-- mentions all member
case 'mentionall': 
case 'tagall':
case 'افريون':
      if (!isVerify) return reply(userB())
		  if (!isGroup) return reply(group())
			if (!isGroupAdmins && !isOwner) return reply(admin())
					members_id = []
			teks = `▢ مجموعة : *${groupName}*\n▢ عدد من أعضاء : *${groupMetadata.participants.length}*\n${value}\n┌───⊷ *الإشارات* ⊶\n`
			for (let mem of groupMembers) {
						teks += `├╼ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
			teks += `└──────────────`
			mentions(teks, members_id, true)
			break

//-- blocklist user
case 'blocklist':
  if (!isVerify) return reply(userB())
      teks = ` ≡ *BLOCKLIST*\nNomor di bawah adalah list nomor yang di Blokir karena melanggar aturan dan melakukan spam pada bot\n\n*Total* : ${blocked.length}\n┌───⊷ *LIST* ⊶\n`
	    for (let block of blocked) {
	    teks += `├╼ @${block.split('@')[0]}\n`
					}
	    teks += `└──────────────`
	    Lxa.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break

//--- ban pengguna
case 'ban':
					if (args.length < 1) return
					if (!isOwner) return reply(ownerB())
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
			        banned = mentioned
					reply(`berhasil banned : ${banned}`)
					break

//--- unban penggunaan
case 'unban':
					if (!isOwner)return reply(ownerB())
					ban = value
					banned.splice(`${ban}@s.whatsapp.net`, 1)
					reply(`Nomor wa.me/${ban} telah di unban!`)
					break

//-- blocklist user
case 'banlist':
  if (!isVerify) return reply(userB())
      teks = ` ≡ *BANLIST USER*\nNomor di bawah adalah list nomor yang di Banned karena melanggar aturan dan melakukan spam pada bot\n\n*Total* : ${banned.length}\n┌───⊷ *LIST* ⊶\n`
	    for (let baned of banned) {
	    teks += `├╼ @${baned.split('@')[0]}\n`
					}
	    teks += `└──────────────`
	    Lxa.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break

//-- Report
case 'report':
case 'تبليغ':
  if (!isVerify) return reply(userB())
report = `  ≡ *معلومة*
طلب & الإبلاغ عن ميزة الخطأ على الروبوتات ، تأكد من تقديم تقارير صحيحة وواضحة!

┌───⊷ *REPORT* ⊶
├╼ *${prefix}طلب*
├╼ *${prefix}بلاغ*
└──────────────

المجموع :
طلب : ${_request.length}
بلاغ : ${_lapor.length}

✆ أو يمكنك الاتصال بالمالكين للحصول على معلومات أكثر تفصيلاً`
reply(report)
break


//--- request//البلاغات و الاستقبال
case 'طلب':
  if (!isVerify) return reply(userB())
  yoi = value
  if (args.length < 1) return reply('أدخل الميزات التي تريدها في البوت')
  if (yoi.length > 100 ) return reply('تجاوز النص الحد الأقصى ، تم رفض طلبك !')
  _request.push(yoi)
  fs.writeFileSync('./report/request.json', JSON.stringify(_request))
  reply(`شكرا لك *${pushname}*, تم حفظ طلبك في قاعدة البيانات`)
  
	break

//--- lapor
case 'بلاغ':
  if (!isVerify) return reply(userB())
  yoi = value
  if (args.length < 1) return reply('أدخل اسم ميزة الخطأ التي تحدث عند تجربتها')
  if (yoi.length > 100) return reply('تجاوز النص الحد المسموح به ، تم رفض طلبك !')
  _lapor.push(yoi)
  fs.writeFileSync('./report/lapor.json', JSON.stringify(_lapor))
  reply(`شكرا لك *${pushname}*, تم حفظ تقريرك في قاعدة البيانات`)
	break

//-- list laporan
case 'listlapor':
case 'قائمة البلاغات':
case 'البلاغات':
			if (!isOwner) return reply(ownerB())
				teks = ` ≡ *قائمة البلاغات*\nفيما يلي قائمة بالتقارير الواردة حسب التاريخ *${tanggal()}* مع عدد التقارير *${_lapor.length}*\n\n┌───⊷ *قائمة* ⊶\n`
				for (let lap of _lapor) {
					teks += `╼ ${lap}\n`
				}
				teks  += `└──────────────`
				reply(teks.trim())
				break

//-- list request
case 'listreq':
case 'listrequest':
			if (!isOwner) return reply(ownerB())
				teks = ` ≡ *LIST REQUEST*\nBerikut adalah list Request yang di terima pertanggal *${tanggal()}* dengan jumlah request *${_request.length}*\n\n┌───⊷ *LIST* ⊶\n`
				for (let req of _request) {
					teks += `╼ ${req}\n`
				}
				teks  += `└──────────────`
				reply(teks.trim())
				break

//--- List admin group
case 'adminlist':
case 'listadmin':
case 'الادمنية':
case 'المشرفين':
case 'مشرف':
  if (!isVerify) return reply(userB())
					if (!isGroup) return reply(group())
					teks = `المشرفين *${groupMetadata.subject}*\nالمجموع : ${groupAdmins.length}\n\n`
					teks = `المشرفين *${groupMetadata.subject}*\nالمجموع : ${groupAdmins.length}\n\n`
					for (let admin of groupAdmins) {
						teks += `- @${admin.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break

case 'listonline':
case 'المتصلين':
case 'اونلاين':
case 'متصل':
  if (!isVerify) return reply(userB())
  if (!isGroup) return reply(group())
        		let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
			    let online = [...Object.keys(Lxa.chats.get(ido).presences), Lxa.user.jid]
			    Lxa.sendMessage(from, 'المتصلين الان:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join`\n`, text, { quoted: mek,
  			  contextInfo: { mentionedJid: online }
			    })
			    
				break

//--- buka tutup grup
					case 'قروب':
					if (!isGroup) return reply(group())
					if (!isGroupAdmins && !isOwner) return reply(admin())
					if (!isBotGroupAdmins) return reply(Badmin())
					if (args.length < 1) return reply(`أضف * فتح * لفتح & "إغلاق * للإغلاق`)
					if (args[0] === 'فتح') {
					    reply(`مجموعة مفتوحة *${groupMetadata.subject}*`)
						Lexa.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'اغلاق') {
						reply(`المجموعة مغلقة *${groupMetadata.subject}*`)
						Lexa.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break

//--- Menambah member
case 'add':
case 'اضافة':
				  if (!isVerify) return reply(userB())
				  if (!isPrem) return reply(premi())
					if (!isGroup) return reply(group())
					if (!isGroupAdmins && !isOwner) return reply(admin())
					if (!isBotGroupAdmins) return reply(Badmin())
					if (args.length < 1) return reply('أضف الرقم المستهدف')
					if (args[0].startsWith('08')) return reply('استخدم رمز الدولة')
					if (args[0].startsWith('+62')) return reply('استخدم رمز البلد بدون +')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						Lxa.groupAdd(from, [num])
					} catch (e) {
						console.log('خطأ :', e)
						reply('يفشل !!! أضاف هدفًا ، ربما لأنه في مكان خاص')
					}
					break

//--- Kick member
case 'kick':
case 'طرد':
			    if (!isVerify) return reply(userB())
			    if (!isPrem) return reply(premi())
					if (!isGroup) return reply(group())
					if (!isGroupAdmins && !isOwner) return reply(admin())
					if (!isBotGroupAdmins) return reply(Badmin())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('منشن شخص')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'تم استلام الطلب وإصداره :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						Lxa.groupRemove(from, mentioned)
					} else {
						mentions(`تم استلام الطلب وإصداره : @${mentioned[0].split('@')[0]}`, mentioned, true)
				 Lxa.groupRemove(from, mentioned)
					}
					break

//-- Menaikan jabatan
case 'promote':
case 'تعيين ادمن':
case 'ادمن':
				  if (!isVerify) return reply(userB())
					if (!isGroup) return reply(group())
					if (!isGroupAdmins && !isOwner) return reply(admin())
					if (!isBotGroupAdmins) return reply(Badmin())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('ضع علامة على الهدف الذي تريد أن تكون مسؤولاً!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'تم استلام الطلب ، أصبحت مشرفًا :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						Lxa.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Perintah di terima, @${mentioned[0].split('@')[0]} أنت Menjadi Admin Di Group *${groupMetadata.subject}*`, mentioned, true)
						Lxa.groupMakeAdmin(from, mentioned)
					}
					break


//-- Menurunkan jabatan
case 'demote':
case 'سحب ادمن':
case 'سحب':
			    if (!isVerify) return reply(userB())
					if (!isGroup) return reply(group())
					if (!isGroupAdmins && !isOwner) return reply(admin())
					if (!isBotGroupAdmins) return reply(Badmin())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('منشن الشخص')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'تم استلام الطلب ، وخفض رتبة المشرف :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						Lxa.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`تم تخفيض الرتبة : @${mentioned[0].split('@')[0]} Menjadi Member`, mentioned, true)
						Lxa.groupDemoteAdmin(from, mentioned)
					}
		break

//-- link grup
case 'linkgrup':
case 'linkgc':
  if (!isVerify) return reply(userB())
			  if (!isGroupAdmins && !isOwner) return reply(admin())
				if (!isGroup) return reply(group())
				if (!isBotGroupAdmins) return reply(Badmin())
				linkgc = await Lxa.groupInviteCode (from)
				yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
				Lxa.sendMessage(from, yeh, text, {quoted: mek})
				break

//-- Notifikasi grup
case 'notif':
case 'اشعارات':
    if (!isGroupAdmins && !isOwner) return reply(admin())
    if (!isVerify) return reply(userB())
    if (!isGroup) return reply(group())
    if (args.length < 1) return reply(`ما هي الرسالة ?`)
    teks = `إشعار من @${sender.split("@")[0]}\n*Pesan : ${value}*`
    gc = await Lxa.groupMetadata(from);
    member = gc['participants']
    jids = [];
    member.map(async adm => {
  jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
})
options = {
  text: teks,
  contextInfo: {
mentionedJid: jids
  },
  quoted: mek
}
await Lxa.sendMessage(from, options, text)
break

//-- Bot leave grup
case 'leave': 
				if (!isGroup) return reply(group())
				if (!isOwner) return reply(ownerB())
				anu = await Lxa.groupLeave(from, `Bye *${groupMetadata.subject}*`, groupId)
				break

//-- set profil grup
case 'setppgc':
case 'تغببر الصورة':
				if (!isGroup) return reply(group())
				if (!isGroupAdmins && !isOwner) return reply(admin())
				if (!isBotGroupAdmins) return reply(Badmin())
				if (!isQuotedImage && isMedia) return reply('قم بالرد على الصورة التي تريد إنشاء ملف تعريف جماعي')
				try {
				media = await Lxa.downloadAndSaveMediaMessage(mek)
				await Lxa.updateProfilePicture (from, media)
				reply(wait())
				reply(`○ تم تغيير صورة الملف الشخصي للمجموعة بنجاح *${groupMetadata.subject}*`)
				} catch (e) {
				  reply('يفشل !!!')
				}
			break

//-- Cloning foto profil
case 'clone':
		if (!isGroup) return reply(group())
		if (!isGroupAdmins) return reply(admin())
		if (args.length < 1) return reply('ضع علامة على الهدف الذي تريد استنساخه')
		if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('ضع علامة على الهدف الذي تريد استنساخه')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await Lxa.getProfilePicture(id)
						buffer = await getBuffer(pp)
						Lxa.updateProfilePicture(botNumber, buffer)
						mentions(`صورة الملف الشخصي تم التحديث بنجاح باستخدام صورة الملف الشخصي @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('يفشل !!!')
					}
		break

//-- broadcast
case 'bc':
					if (!isOwner) return reply(ownerB())
					if (args.length < 1) return reply('ليش ؟')
					anu = await Lxa.chats.all()
						for (let _ of anu)
							sendMess(_.jid, value)
						reply('نجاح البث')
					break


//-- Total user
case 'totaluser':
  if (!isOwner) return reply(ownerB())
					teks = `إجمالي المستخدمين ${name}*\n`
					no = 0
					for (let hehehe of _user) {
						no += 1
						teks += `[${no.toString()}] @${hehehe.split('@')[0]}\n`
					}
					teks += `إجمالي المستخدمين : ${_user.length}`
					Lxa.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": _user}})
					break

//-- Delet message
case 'delete':
case 'del':
case 'حذف':
					if (!isGroup)return reply(group())
					try {
					Lxa.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					} catch (e) {
					  reply('يمكن فقط حذف الرسائل مني')
					}
					break

//--- verify // التحقق قبل البد
case 'verify':
case 'اشتراك':
case 'daftar':
			if (isVerify) return reply('تم الاشتراك بنجاح')
					_user.push(sender)
			fs.writeFileSync('./data/user.json', JSON.stringify(_user))
			capt = `شكرا لك *${pushname}* اكتمل التحقق ، اكتب *${prefix}اوامر* لعرض قائمة الاوامر \n مستخدم مسجل في التاريخ ${tanggal()} = *${_user.length}*`
			Lxa.sendMessage(from, capt, text, {quoted: mek})
					break

//--- Welcome on/off
case 'welcome':
case 'wellcome':
  if (!isVerify) return reply(userB())
		if (!isGroup) return reply(group())
		if (!isGroupAdmins && !isOwner) return reply(admin())
		if (args.length < 1) return reply(`تشغيل للتمكين وإيقاف التعطيل`)
		if ((args[0]) === 'on') {
		if (isWelcom) return reply('ترحيب نشط')
						_welcom.push(from)
						fs.writeFileSync('./data/welcom.json', JSON.stringify(_welcom))
						reply(`قم بتنشيط ميزة الترحيب في المجموعة *${groupMetadata.subject}*`)
		} else if ((args[0]) === 'off') {
		if (!isWelcom) return reply('ترحيب مغلق')
						_welcom.splice(from, 1)
						fs.writeFileSync('./data/welcom.json', JSON.stringify(_welcom))
						reply(`نجح في تعطيل ميزة الترحيب في المجموعة *${groupMetadata.subject}*`)
					} else {
						reply('تشغيل للتمكين ، إيقاف التشغيل للتعطيل')
					}
		break

//--- on/off antilink
				case 'antilink':
				if (!isPrem) return reply(premi())
				if (!isGroup) return reply(group())
					if (!isGroupAdmins && !isOwner) return reply(admin())
					if (!isBotGroupAdmins) return reply(Badmin())
					if (args.length < 1) return reply(`تشغيل للتمكين وإيقاف التعطيل`)
					if ((args[0]) === 'on') {
						if (isAnti) return reply('خاصية Anti Link نشطة')
						_antilink.push(from)
						fs.writeFileSync('./data/antilink.json', JSON.stringify(_antilink))
						reply(`قم بتنشيط ميزة منع الارتباط في المجموعة *${groupMetadata.subject}*`)
					} else if ((args[0]) === 'off') {
						if (!isAnti) return reply('Antilink off')
						_antilink.splice(from, 1)
						fs.writeFileSync('./data/antilink.json', JSON.stringify(_antilink))
						reply(`تعطيل ميزة منع الارتباط في المجموعة *${groupMetadata.subject}*`)
					} else {
						reply('تشغيل للتمكين وإيقاف التعطيل')
					}
					break

//--- add truth
case 'addtruth':
  if (!isOwner) return reply(ownerB())
  tru = value
  if (args.length < 1) return reply('أين النص؟')
  _truth.push(tru)
  fs.writeFileSync('./result/truth.json', JSON.stringify(_truth))
  reply(`Done`)
  break

//--- add truth
case 'adddare':
  if (!isOwner) return reply(ownerB())
  dar = value
  if (args.length < 1) return reply('أين النص؟')
  _dare.push(dar)
  fs.writeFileSync('./result/dare.json', JSON.stringify(_dare))
  reply(`Done`)
  break

//--- add truth
case 'addilham':
  if (!isOwner) return reply(ownerB())
  stat = value
  if (args.length < 1) return reply('أين النص؟')
  _ilham.push(stat)
  fs.writeFileSync('./result/ilham.json', JSON.stringify(_ilham))
  reply(`Done`)
  break

//--- add fakta
case 'addfakta':
  if (!isOwner) return reply(ownerB())
  stat = value
  if (args.length < 1) return reply('أين النص؟')
  _fakta.push(stat)
  fs.writeFileSync('./resutl/fakta.json', JSON.stringify(_fakta))
  reply(`Done`)
  break

//--- add gombla
case 'adddilan':
  if (!isOwner) return reply(ownerB())
  stat = value
  if (args.length < 1) return reply('أين النص؟')
  _dilan.push(stat)
  fs.writeFileSync('./result/dilan.json', JSON.stringify(_dilan))
  reply(`Done`)
  break

//--- add gombla
case 'addgombal':
  if (!isOwner) return reply(ownerB())
  stat = value
  if (args.length < 1) return reply('أين النص؟')
  _gombal.push(stat)
  fs.writeFileSync('./result/dilan.json', JSON.stringify(_gombal))
  reply(`Done`)
  break

//--- add gombla
case 'addhacker':
  if (!isOwner) return reply(ownerB())
  stat = value
  if (args.length < 1) return reply('أين النص؟')
  _hacker.push(stat)
  fs.writeFileSync('./result/hacker.json', JSON.stringify(_hacker))
  reply(`Done`)
  break

//--- teks to sound
case 'tts':
  if (!isVerify) return reply(userB())
				if (args.length < 1) return Naomi.sendMessage(from, `أدخل رمز اللغة والنص`, text, {quoted: mek})
				const gtts = require('./lib/gtts')(args[0])
				if (args.length < 2) return Naomi.sendMessage(from, 'أدخل رمز اللغة والنص', text, {quoted: mek})
				dtt = body.slice(8)
				ranm = getRandom('.mp3')
				rano = getRandom('.ogg')
				dtt.length > 300
				? reply('Teks melampaui batas')
				: gtts.save(ranm, dtt, function() {
				exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
				fs.unlinkSync(ranm)
				buff = fs.readFileSync(rano)
				if (err) return reply('● يفشل !!!')
				reply(wait())
				Naomi.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
				fs.unlinkSync(rano)
				})
				})
break

//--- What's anime is this
case 'wait':
  if (!isVerify) return reply(userB())
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(wait())
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await Lxa.downloadMediaMessage(encmedia)
						await _wait(media).then(res => {
							Lxa.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('Gunakan foto')
					}
					break


//-- Termux
case 'term':
  if (!isOwner) return reply(ownerB())
	const cmd = value
  if (args.length < 1) return reply(termux())
	exec(cmd, (err, stdout) => {
	if(err) return Lxa.sendMessage(from, `*شروط الجذر*\n ${err}`, text, { quoted: mek })
	if (stdout) {
	Lxa.sendMessage(from, stdout, text)
		}
	})
break

//-- 
case 'return':
  if (!isOwner) return reply(ownerB())
			return Lxa.sendMessage(from, JSON.stringify(eval(args.join(' ')), null, '\n'), text, { quoted: mek })
		break

//---- view web
	case 'view':
  case 'fetch':
  case 'result':
  if (!isOwner) return reply(ownerB())
teks = args.join(` `)
let res = await fetchText(teks)
reply(res)
break
				default:
}
	})
}
starts()

//-- More ? Tambahin sendiri
