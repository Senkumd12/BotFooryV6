// penghitung aktif bot
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

const menu = (tanggal, jam, pushname, sender, prem_, Lxa, prefix, user, uptime, isGroupAdmins, groupMetadata, groupAdmins, Welcome_, AntiLink_, isGroup, process) => { 
  if (isGroupAdmins){
    admin = "Admin Group"
  } else if (!isGroupAdmins){
    admin = "Member Group"
  }
		if (isGroup) return `▢ ${tanggal()}
▢ Jam ${jam} (Asia/Saudi Arabia)

  ≡ *الاوامر*
┐───⊷ *حسابي* ⊶
├✿ الاسم : *${pushname}*
├✿ الرقم : *${sender.split("@")[0]}*
├✿ بريميوم : ${prem_}
──────────────
┐───⊷ *المجموعات* ⊶
├✿ ${groupMetadata.subject}
├✿ Status User : *${admin}*
├✿ ${groupMetadata.participants.length} Member Group
├✿ ${groupAdmins.length} Admin Group
├✿ Welcome : *${Welcome_}*
├✿ Antilink : *${AntiLink_}*
──────────────
  ≡ *الاوامر*
┐───⊷ *القوائم* ⊶
├✿ *${prefix}اوامر 1*
├✿ *${prefix}اوامر 2*
├✿ *${prefix}اوامرالمالك*
├✿ *${prefix}اوامر القروب*
┘──────────────
┐───⊷ *التبليغ* ⊶
├✿ *${prefix}المالك*
├✿ *${prefix}تبليغ*
┘──────────────

Made With ❤️
© *Foory*`

else if (!isGroup) return`▢ ${tanggal()}
▢ Jam ${jam} (Asia/Saudi Arabia)

  ≡ *معلومات*
┐───⊷ *حسابي* ⊶
├✿ الاسم : *${pushname}*
├✿ الرقم : *${sender.split("@")[0]}*
├✿ بريميوم : ${prem_}
┘──────────────
┐───⊷ *البوت* ⊶
├✿ الاسم : *${Lxa.user.name}*
├✿ اصدار : 0.2.6
├✿ السرعة : ${process.uptime()}
├✿ وقت التشغيل : *${kyun(uptime)}*
┘──────────────
  ≡ *LET'S BEGIN MENU*
┐───⊷ *LIST* ⊶
├✿ *${prefix}اوامر 1*
├✿ *${prefix}اوامر 2*
├✿ *${prefix}اوامر 3*
├✿ *${prefix}اوامرالمالك*
├✿ *${prefix}اوامر القروب*
┘──────────────
┐───⊷ *التبليغ* ⊶
├✿ *${prefix}المالك*
├✿ *${prefix}تبليغ*
┘──────────────

Made With ❤️
© *Foory*`
}

//---
const menu1 = (prefix, tanggal, jam) => {
  return `▢ ${tanggal()}
▢ Jam ${jam} (Asia/Saudi Arabia)

  ≡ *اوامر*
┐───⊷ *مرح* ⊶
├✿ *${prefix}فارس*
├✿ *${prefix}معلومات*
├✿ *${prefix}وسيم*
├✿ *${prefix}الاجمل*
├✿ *${prefix}قبيح*
├✿ *${prefix}كرر*
┘──────────────
┐───⊷ *العاب* ⊶
├✿ *${prefix}حوم (مقص/حجر/ورق)*
┘──────────────`
}

const menu2 = (prefix, tanggal, jam) => {
  return `▢ ${tanggal()}
▢ Jam ${jam} (Asia/Saudi Arabia)

  ≡ *الاوامر*
┐───⊷ *الملصقات* ⊶
├✿ *${prefix}ملصق*
├✿ *${prefix}تحويلصورة*
┘──────────────
┐───⊷ *ادوات* ⊶
├✿ *${prefix}تواصل*
├✿ *${prefix}تحويلصوة*
├✿ *${prefix}tts*
┘──────────────


`

}

/*onstt menu3 = (prefix, tanggal, jam) => {
  return `▢ ${tanggal()}
▢ Jam ${jam} (Asia/Saudi Arabia)

  ≡ *MENU*
┐───⊷ *GAME* ⊶
├✿
┘──────────────`
}

const menuPrem = (prefix, tanggal, jam) => {
  return ` ▢ ${tanggal()}
▢ Jam ${jam} (Asia/Saudi Arabia)

  ≡ *MENU PREMIUM*
┐───⊷ *PREMIUM* ⊶
├✿ 
┘──────────────`
}
*/

const menuOwner = (prefix, tanggal, jam) => {
  return `▢ ${tanggal()}
▢ Jam ${jam} (Asia/Saudi Arabia)

  ≡ *للاونر فقط*
┐───⊷ *اونر* ⊶
├✿ *${prefix}Clone (Tag target)*
├✿ *${prefix}Clearchat*
├✿ *${prefix}Totaluser*
├✿ *${prefix}Listrequest*
├✿ *${prefix}Listlapor*
├✿ *${prefix}Addstik (Reply stiker)*
├✿ *${prefix}Addvn (Reply audio)*
├✿ *${prefix}Addimg (Reply foto)*
├✿ *${prefix}Addvid (Reply video)*
├✿ *${prefix}Addtruth (Teks)*
├✿ *${prefix}Adddare (Teks)*
├✿ *${prefix}Addfakta (Teks)*
├✿ *${prefix}Addilham (Teks)*
├✿ *${prefix}Adddilan (Teks)*
├✿ *${prefix}Addgombal (Teks)*
├✿ *${prefix}Addhacker (Teks)*
├✿ *${prefix}Bc (Teks)*
├✿ *${prefix}Leave*
├✿ *${prefix}Term*
├✿ *${prefix}Return*
├✿ *${prefix}View (url)*
┘──────────────`
}

const menuGrup = (prefix, tanggal, jam) => {
  return `▢ ${tanggal()}
▢ Jam ${jam} (Asia/Saudi Arabia)

  ≡ *اوامر القروب*
┐───⊷ *القروبات* ⊶
├✿ *${prefix}الادمنية*
├✿ *${prefix}المتصلين*
├✿ *${prefix}ادمن*
├✿ *${prefix}سحب*
├✿ *${prefix}تغيير الصورة*
├✿ *${prefix}افريون*
├✿ *${prefix}رابط القروب*
├✿ *${prefix}اشعارات*
├✿ *${prefix}طرد*
├✿ *${prefix}اضافة*
├✿ *${prefix}حذف*
├✿ *${prefix}قروب (فتح/اغلاق)*
├✿ *${prefix}Welcome (on/off)*
├✿ *${prefix}Antilink (on/off)*
┘──────────────`
}

module.exports = { menu, menu1, menu2, menuOwner, menuGrup}