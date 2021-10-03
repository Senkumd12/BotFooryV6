// Function respon

//-- 
const wait = () => { 
return '◌ ارجوك انتظر'
}

//--
const stick = () => {
  return '● فشل ، يرجى المحاولة مرة أخرى بعد هذه الرسالة'
}

//--
const err = (prefix) => {
  return `● عذرًا ، يبدو أن الميزة بها خطأ ، اكتب .تبليغ`
}

//-- 
const group = () => {
  return '● هذه الميزة للمجموعات فقط'
}

//-- 
const ban = () => {
  return '● أنت مشمول في قائمة الحظر ، يرجى دفع 5 دولار لفتح الحظر'
}

//--
const ownerB = () => {
  return '● هذه الميزة فقط للمالك'
}

//--
const premi = () => {
  return '● هذه الميزة مخصصة فقط لمستخدمي Premium ، يرجى الدردشة مع المالك للاشتراك'
}

//--
const userB = (prefix) => {
  return `● لم تقم بالتحقق بعد ، اكتب *.اشتراك* لبدء استخدام برنامج bot`
}

//--
const admin = () => {
  return '● هذه الميزة مخصصة فقط لمسؤولي المجموعة'
}

//--
const Badmin = () => {
  return '● اعطني مشرف في القروب!'
}


module.exports =  { wait, stick, err, group, ban, ownerB, premi, userB, admin, Badmin } 