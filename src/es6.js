
__.sum     = (...args) => args.reduce(((a, v) => __.isNumber(v) ? a + v : a), 0)
__.count   = (...args) => args.reduce(((a, v) => __.isNumber(v) ? a + 1 : a), 0)
__.average = (...args) => {
    let count = __.count.apply({}, args)
    if (count > 0) return __.sum.apply({}, args) / count
    else return NaN  }
