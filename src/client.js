
// __.isCollectionReady = (c, t, f) => __.isIt(c,
//     __.isCollection(c) &&
//     __._db[c].handle   && __._db[c].handle.ready(), t, f)
// __.allCollectionsReady  = (...c) => {
//     let [t, f] = c.slice(-2)
//     return __.isIt(c, c.length === c.filter(cc => __.isCollectionReady(cc)).length, t, f) }
// __.whenCollectionsReady = (...c) => {
//     let [m, fn] = c.slice(-2)
//     c.length ===
//     c.filter(cc => __.isCollection(cc)).filter(cc => __.isCollectionReady(cc, null, () => __._db[cc].subscribes.push(fn) )).length && fn(m) }
