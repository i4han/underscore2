
__.sum     = (...args) => args.reduce(((a, v) => __.isNumber(v) ? a + v : a), 0)
__.count   = (...args) => args.reduce(((a, v) => __.isNumber(v) ? a + 1 : a), 0)
__.average = (...args) => {
    let count = __.count.apply({}, args)
    if (count > 0) return __.sum.apply({}, args) / count
    else return NaN  }

const checkTable = {
   alpha:      (v) => /^[a-zA-Z]+$/.test(v),
   lower:      (v) => /^[a-z]+$/.test(v),
   upper:      (v) => /^[A-Z]+$/.test(v),
   name:       (v) => /^[a-zA-Z0-9._-]+$/.test(v),
   email:      (v) => /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(v),
   attribute:  (v) => /^[a-zA-Z]+$/.test(v),
   id:         (v) => /^[a-z]+[0-9]+$/.test(v) && ! /^h[1-6]$/.test(v),
   class:      (v) => /^_[a-z]+[a-zA-Z0-9$]*$/.test(v),
   'id&class': (v) => /^[a-zA-Z0-9_$]+$/.test(v) && /_/.test(v),
   digit:      (v) => /^[0-9]+$/.test(v),
   local:      (v) => /^local_/.test(v)
}

__.check = (...args) => {
  let i = 0
  while (i < args.length - 1)
    if (checkTable[args[i++]](args.slice(-1)[0]))
      return args[i - 1]
  return false }
