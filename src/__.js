'use strict'
'undefined' === typeof __ && 'undefined' !== typeof window ? window.__ = window.__ || {} : global.__ = global.__ || {}
__ = __ || {} // I need to put his because meteor server __ is undefined. why?

__.keys        = o => Object.keys(o)
__.t     = (v, t) => 'function' === typeof t ? (v === t ? t() : t(v)) : 'undefined' === typeof t ? true  : t
__.f     = (v, f) => 'function' === typeof f ? (v === f ? f() : f(v)) : 'undefined' === typeof f ? false : f
__.isTrue  = (v, t) => { v && __.t(v, t); return !!v === true  }
__.isFalse = (v, f) => { v || __.f(v, f); return !!v === false }
__.isIt  = (v, it, t, f) => it ? (__.t(v, t) || true) : (__.f(v, f) && false)
__.isFunction   = (v, t, f) => __.isIt(v, 'function'  === typeof v, t, f)
__.isUndefined  = (v, t, f) => __.isIt(v, 'undefined' === typeof v, t, f)
__.isString     = (v, t, f) => __.isIt(v, 'string'    === typeof v, t, f)
__.isNumber     = (v, t, f) => __.isIt(v, ! isNaN(v) && 'number' === typeof v, t, f)
__.isBoolean    = (v, t, f) => __.isIt(v, 'boolean'   === typeof v, t, f)
__.isDate       = (v, t, f) => __.isIt(v, v instanceof Date, t, f)
__.isNaN        = (v, t, f) => __.isIt(v, isNaN(v) && 'number'   === typeof v, t, f)
__.isScalar     = (v, t, f) => __.isIt(v, __.isNumber(v) || __.isString(v) || __.isBoolean(v), t, f)
__.__isNull     = v => o === null // Do you need this? No
__.isArray      = (v, t, f) => __.isIt(v, '[object Array]'     === Object.prototype.toString.call(v), t, f)
__.isObject     = (v, t, f) => __.isIt(v, '[object Object]'    === Object.prototype.toString.call(v), t, f)
__.isArguments  = (v, t, f) => __.isIt(v, '[object Arguments]' === Object.prototype.toString.call(v), t, f)
__.isArrayLike  = (v, t, f) => __.isIt(v, __.isArray(v) || __.isArguments(v), t, f)

__.isLower      = (v, t, f) => __.isIt(v, __.isString(v) && v.toLowerCase() === v, t, f)
__.isUpper      = (v, t, f) => __.isIt(v, __.isString(v) && v.toUpperCase() === v, t, f)



__.isClient        = (t, f) => __.isIt(void 0, 'object'   === typeof window, t, f)
__.isClient() && (() => {
    __.hasJQueryLoaded =    (t, f) => __.isIt(void 0, 'function' === typeof $ && $() instanceof jQuery, t, f)
    __.hasDOMLoaded    =    (t, f) => __.isIt(void 0, document.readyState === 'complete' || document.readyState === 'interactive', t, f)
    __.isJQuery        = (v, t, f) => __.isIt(v, 'undefined' !== typeof $ && (v === undefined || v instanceof $), t, f)
    __.on              = (e, f)    => document.addEventListener(e, f)
})()

__.isMeteor        = (t, f) => __.isIt(void 0, 'undefined' !== typeof Meteor, t, f)
__.isMeteorServer  = (t, f) => __.isIt(void 0, __.isMeteor() && Meteor.isServer, t, f)
__.isMeteorClient  = (t, f) => __.isIt(void 0, __.isMeteor() && Meteor.isClient, t, f)

__.isMeteor() && (() => {
    __.isElement    = (v, t, f) => __.isIt(v, 'undefined' !== typeof HTMLElement && v instanceof HTMLElement, t, f)
    __.isHTMLTag    = (v, t, f) => __.isIt(v, 'undefined' !== typeof HTML.Tag    && v instanceof HTML.Tag,    t, f)
    __.isStyleDeclaration = (v, t, f) => __.isIt(v, 'undefined' !== typeof CSSStyleDeclaration && v instanceof CSSStyleDeclaration, t, f)
    __.isArrayLike  = (v, t, f) => __.isIt(v, __.isArray(v) || __.isArguments(v) || __.isStyleDeclaration(v), t, f)

    __.meteorStartup = f => __.isUndefined(__._meteor_startup, (() => __._meteor_startup = [f]), () => __._meteor_startup.push(f))
    __.runMeteorStartup = () => __._meteor_startup && __._meteor_startup.forEach(f => f())

    __.isBlazeView       = o => 'undefined' !== typeof Blaze.View && o instanceof Blaze.View
    __.isBlazeElement    = o => __.isHTMLTag(o) || __.isBlazeView(o) || __.isString(o)
    __.isBlazeTemplateInstance = o =>
      'undefined' !== typeof Blaze.TemplateInstance && o instanceof Blaze.TemplateInstance
    __.isLookup          = o => __.isObject(o) && __.isString(o.name) && o.name.slice(0, 7) === 'lookup:'
    __.isBlazeAttr       = o => __.isObject(o) && !__.isLookup(o) && !__.isBlazeElement(o)
    __.nameBlazeView     = o => __.isBlazeView(o) && 'name' in o && o.name.slice(9)

    __.currentRoute = () => Router.current().route.getName()
    __.render       = n  => Template[n].renderFunction().value
})()

__.insertTemplate = (page, id, data) => {
    data = data || {}
    $('#' + id).empty()
    return Blaze.renderWithData(Template[page], __.isEmpty(data) ? Template[page].helpers : data, document.getElementById(id)) }

__.isAttrPartKey     = k => __.isString(k) && '$' === k[0]
__.isFunctionPartKey = k => __.isString(k) && __.check('alpha', k[0])


__.isEnclosedBy      = (v, a, b) => { // __.isEnclosedBy(v, '{', '}'), __.isEnclosedBy(v, '&#', ';')
    let ai, bi
    if (__.isString(v) &&
        (ai = v.indexOf(a)) !== -1 &&
        (bi = v.indexOf(b)) !== -1 && ai < bi )
        return true
    else
        return false }

__.isEmptyArray      = a => a.length === 0
__.isEmptyObject     = o => __.isEmptyArray(__.keys(o))
__.isEmpty           = o =>
    ! o            ? true :
    __.isArrayLike(o)  ? __.isEmptyArray(o)  :
    __.isObject(o) ? __.isEmptyObject(o) : false

__.classOf = Function.prototype.call.bind(Object.prototype.toString)

__.indexOf = (a, f) => { // __.indexOf(a, (v,i) => v.time === '..time..')
    if (!__.isArrayLike(a)) return -1
    for (let i = 0; i < a.length; i++)
        if (f(a[i], i, a)) return i
    return -1 }

// __.uniqueArray(a, (a) => (v, i) => v.time === a.time)

__.cleanArray = (a, v) => {
    for (let i = 0; i < a.length; i++)
        if (a[i] === v)
            a.splice(i--, 1)
    return a }

const default_f = v => w => v === w

__.chopArray = (a, chop, f) => {
    f = f || default_f
    // console.log('a', a, 'chop', chop, 'f', f)
    return chop.reduce((aa, v, i) => {
        let item = aa.pop()
        let index = __.indexOf(item, f(v, i))
        if (index === -1) return aa.concat([item])
        else return aa.concat([item.slice(0, index), item.slice(index)]) }, [a]) }

__.__maxArray = (a, f) => Math.max.apply(null, a.map(f))
__.__minArray = (a, f) => Math.min.apply(null, a.map(f))

__.lastN  = (a, n, f) => {
    f = f || (() => true)
    return a.filter((v, i, a) => f(v, i, a)).slice(-n) }
__.coMap = (x, y, f) => x.reduce((a, v, i) => {
    a[i] = f(v, y[i])
    return a }, [])
__.productArray = __.coMap
__.nReduce  = (x, n, f) => x.reduce((a, v, i) => {
    a[i] = f.apply({}, x.slice((i > n - 1) ? i - n + 1 : 0, i + 1))
    return a }, [])
__.linearArray = __.nReduce
__._linearArray = (x, n, f, fcon, novalue) => x.reduce((a, v, i) => {
        fcon = fcon || (v => true)
        //if (i === 0) return fcon(v) ? a.concat(v) : a.concat(novalue)
        if (fcon(v)) return a.concat(f.apply({}, __.lastN(a, n, fcon).concat(v)))
        else return a.concat(novalue) }, [])


__.inflextion = x => x.reduce((a, v, i) => {
    if (i === 0 || i === x.length - 1) return a.concat(0)
    return ((x[i - 1] >= v && v >= x[i + 1]) ||
    (x[i - 1] <= v && v <= x[i + 1])) ? a.concat(0) : a.concat(v)}, [])



__.uniqueArray  = (a, f) => {
    f = f || default_f
    return a.filter((v, i) => __.indexOf(a, f(v, i)) === i) }

__.intersectionArray = (x, y, f) => {
    f = f || default_f
    return __.uniqueArray( x.filter((v, i) => __.indexOf(y, f(v, i)) !== -1) ) }

__.unionArray = (x, y, f) => {
    f = f || default_f
    return __.intersectionArray(x, y, f)
        .concat(__.subtractionArray(x, y, f))
        .concat(__.subtractionArray(y, x, f))
        .sort((a,b) => f(a) - f(b)) }

__.subtractionArray = (x, y, f) => {
    f = f || default_f
    return __.uniqueArray( x.filter((v, i) => __.indexOf(y, f(v, i)) === -1) ) }



// __.flattenArr = arr => arr.reduce(  // es6 function
//     (a, v) => a.concat(__.isArray(v) ?  : v), [] )

__.flattenArray = arr => arr.reduce(  // es6 function
    (a, v) => a.concat(__.isArray(v) ? __.flattenArray(v) : v), [] )

__.__equalValues = (x, y) => {
  if (__.isNaN(x) && __.isNaN(y)) return true
  if (x === y)                    return true
  if ((__.isFunction(x)    && __.isFunction(y))    ||
      (x instanceof Date   && y instanceof Date)   ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)) {
      return x.toString() === y.toString() }

  // At last checking prototypes as good as we can
  if (!(x instanceof Object && y instanceof Object)) return false
  if (x.isPrototypeOf(y) || y.isPrototypeOf(x))      return false // what is this?
  if (x.constructor !== y.constructor)               return false
  if (x.prototype   !== y.prototype)                 return false
 // if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
 //    return false }

  // Quick checking of one object being a subset of another.
  // todo: cache the structure of arguments[0] for performance
  let p
  for (p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
          return false;
      }
      else if (typeof y[p] !== typeof x[p]) {
          return false;
      }
  }
  let leftChain, rightChain
  for (p in x) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
          return false;
      }
      else if (typeof y[p] !== typeof x[p]) {
          return false;
      }
      switch (typeof (x[p])) {
          case 'object':
          case 'function':

              leftChain.push(x);
              rightChain.push(y);

              if (!__.equalValues (x[p], y[p])) {
                  return false;
              }
              leftChain.pop();
              rightChain.pop();
              break;
          default:
              if (x[p] !== y[p]) {
                  return false;
              }
              break;
      }
  }
  return true
}

__.__equalObjects = (x, y) => {
    if ( x.constructor !== y.constructor ) return false
    for (let p in x) {
        if ( !x.hasOwnProperty(p) ) continue
        if ( !y.hasOwnProperty(p) ) return false
        if ( x[p] === y[p] ) continue
        if ( __.isObject(x[p]) && __.isObject(y[p]) )
            return __.equalObjects(x[p], y[p])
        else return false  }

    for (let p in y )
        if ( y.hasOwnProperty(p) && ! x.hasOwnProperty(p) ) return false
    return true }
/*
__.equalObjects = (...args) => {
  if (args.length < 1) {
    return true //Die silently? Don't know how to handle such case, please help...
    // throw "Need two or more arguments to compare";
  }
  let i, l, leftChain, rightChain
  for (i = 1, l = args.length; i < l; i++) {

      leftChain  = [] //Todo: this can be cached
      rightChain = []

      if (!__.equalValues(args[0], args[i])) {
          return false;
      }
  }
  return true
}

*/
__.error = check => {
    check || console.log('error')
//    check || throw new Meteor.error()
}

// misc

__.require = f => {
    delete require.cache[f] // find full path
    return require(f) }

__.__isVisible = v => __.isFunction(v) ? v() : false === v ? false : true // need to rethink

__.delay = (time, func) =>         // __.isMeteor(t, f)
  typeof Meteor === "undefined" ? setTimeout(func, time) : Meteor.setTimeout(func, time)
__.setTimeout = (func, time) => __.isMeteor(() => Meteor.setTimeout(func, time), () => setTimeout(func, time))


// mongo db
__._db = __._db || {}
__._db_stack = __._db_stack || []

__.isCollection      = (c, t, f) => __.isIt(c,
    __._db[c]   &&
    'undefined' !== typeof Mongo            &&
    'undefined' !== typeof Mongo.Collection && __._db[c] instanceof Mongo.Collection, t, f)

__.isCollectionReady = (c, t, f) => __.isIt(c,
    __.isCollection(c) &&
    __._db[c].handle   && __._db[c].handle.ready(), t, f)
__.allCollectionsReady  = (...c) => {
    let [t, f] = c.slice(-2)
    return __.isIt(c, c.length === c.filter(cc => __.isCollectionReady(cc)).length, t, f) }
__.whenCollectionsReady = (...c) => {
    let [m, fn] = c.slice(-2)
    c.length === c.filter(v => __.isCollection(v)).filter(v => __.isCollectionReady(v, null, () => __._db[v].subscribes.push(fn) )).length && fn(m) }

// remove?
__.db = (collection, data, fn) => // wrong way
  __._db[collection] ? fn(__._db[collection], data) : __._db_stack.push({collection, data, fn})

// end of mongo

__.reduce     = (a, o, f)   => a.reduce(f, o)
__.reduceKeys = (obj, o, f) =>  __.keys(obj).reduce(f, o)
__.eachKeys   = (obj, f)    => __.keys(obj).forEach(f)

__.xmap = (a1, a2, f) => __.flattenArray(a1.map(k => a2.map(j => f(k, j))))


__.module  = v =>
    __.isBlazeTemplateInstance(v) ? __._Modules[__.nameBlazeView(v.view)] :
    __.isBlazeView(v)             ? __._Modules[__.nameBlazeView(v)] : '?' // what to do? v _?

__.getLocal = v => v.slice(6)
__.checkEventKey = (e, code) => code === (e.KeyCode || e.which)



// string functions
__.capitalize = s => __.isString(s) && s[0].toUpperCase() + s.slice(1)
__.camelize   = s => __.isString(s) && s.replace(/-([a-z])/g, (_, $1) => $1.toUpperCase()).replace(/\-/g, '$')
__.dasherize  = s => __.isString(s) && s.replace(/\$/g, '-').replace(/([A-Z])/g, $1 => '-' + $1.toLowerCase())
__.padLeft  = (pad, s) =>  // trimStart pad: pading space ' ' _number_ like 6 or pad _string_ like '****'
  (__.toString(s) + (__.isNumber(pad) ? Array(pad + 1).join(' ') : pad)).slice(0, (__.isNumber(pad) ? pad : pad.length))
__.padRight = (pad, s) => // trimEnd
  ((__.isNumber(pad) ? Array(pad + 1).join(' ') : pad) + __.toString(s)).slice(  -(__.isNumber(pad) ? pad : pad.length))

__.return = function(func, self) {
  self = self || this
  return __.isFunction(func) ? func.call(self, self) : func }

__.fnValue = (obj, self) => {
    __.keys(obj).forEach(  v => obj[v] =
        __.isFunction(obj[v]) ? obj[v](self) :
        __.isObject(obj[v])   ? __.fnValue(obj[v], self) : obj[v]  )
    return obj }

__.__toArray = s =>
  __.isArray(s)  ? s :
  __.isString(s) ? s.split(' ') :
  __.isEmpty(s)  ? [] : s

__.toString = v =>
  __.isString(v) ? v :
  __.isObject(v) ? JSON.stringify(v) :
  __.isScalar(v) || __.isArray(v) ? v.toString() : void 0


/*/ next work
__.assign = (obj) ->
   (args = [].slice.call arguments).length > 1 and args[1..].forEach (o) -> obj[k] = v for k, v of o
   obj
   combining two objects.

function copy(obj) {
  var copy = Object.create(Object.getPrototypeOf(obj));
  var propNames = Object.getOwnPropertyNames(obj);

  propNames.forEach(function(name) {
    var desc = Object.getOwnPropertyDescriptor(obj, name);
    Object.defineProperty(copy, name, desc);
  });

  return copy;
} */
__.assign = function(obj) {
  var args
  (args = [].slice.call(arguments)).length > 1 && args.slice(1).forEach(function(o) {
    var k
    for (k in o)
        if (__.isObject(obj[k])) __.assign(obj[k], o[k])
        else obj[k] = o[k]  })
  return obj  }

__.uniqueProperties = (obj, properties) =>  // find unique properties that doesn't have in obj key: value.
    __.reduceKeys(properties, {}, (o, k) => // it is like a = a || []
        __.isObject(obj[k]) && __.isObject(properties[k]) ?
            __.object(o, k, __.uniqueProperties(obj[k], properties[k]))     :
            obj[k] !== properties[k]) ? __.object(o, k, properties[k]) : o

__.compare = __.uniqueProperties
__.extend = __.assign

__.remove = (obj, key) => {
    //if(__.isArray(key)) key.forEach(v => delete obj[v])
    delete obj[key]
    return obj  }

__.pop = (obj, key) => {
  let ret = obj[key]
  delete obj[key]
  return ret }

__.array = function(a, v) {
  var args, isHeadArray;
  args = [].slice.call(arguments);
  a = __.isArray(a) ? a : __.isArguments(a) || __.isStyleDeclaration(a) ? [].slice.call(a) : (console.log('.array error', a)) || [a];
  if (v) {
    a = a.concat((function() {
      switch (false) {
        case !__.isArray(v):
          return (isHeadArray = true) && v;
        case !(__.isArguments(v) || __.isStyleDeclaration(v)):
          return (isHeadArray = true) && [].slice.call(v);
        default:
          return (isHeadArray = false) || [v];
      }
    })());
    if (args.length > 2) {
      return args.slice(2).reduce((function(o, v) {
        if (isHeadArray) {
          return o.concat(v);
        } else {
          return o.concat([v]);
        }
      }), a);
    } else {
      return a;
    }
  } else {
    return a;
  }
};


// __.__function = (o, ...a) => __.isFunction(o) ? o : a => o  // a is an array of args! don't need it.

__.object = (o, k, v) => { // if . is in the middle of key?
    if (__.isString(k) && k.includes('.') && k.indexOf('.') && k[k.length -1] !== '.') {
        let re = k.match(/^([^.]+)\.(.*$)/)
        let key      = re[1]
        let key_rest = re[2]
        o[key] = o[key] || {}
        __.object(o[key], key_rest, v)
        return o
    }
    __.isObject(k) ? o = __.assign(o, k, v) :
    __.isScalar(k) ? o[k] = v :
    __.isArray(k)  ? __.isArray(v) ? k.map((vv, ii) => o[vv] = v[ii]) : o[k[0]] = k[1] : o
    return o }

__.theKey = o => __.keys(o)[0]


__.fixup = function(v) {
  var r;
  switch (false) {
    case !(v == null):
      return {};
    case !__.isString(v):
      return __.object({}, v, '');
    case !__.isFunction(v):
      if (__.isScalar(r = __["return"].call(this, v))) {
        return r;
      } else {
        return __.fixup.call(this, r);
      }
    case !__.isArray(v):
      return v.reduce((function(o, w) {
        return __.assign(o, __.fixup.call(this, w));
      }), {});
    case !__.isObject(v):
      return __.reduceKeys(v, {}, (function(_this) {
        return function(o, k) {
          if (_this.part && '$' === k[0] && k in _this.part) {
            return __.assign(o, __.fixup.call(_this, _this.part[k].call(_this, v[k])));
          } else {
            return __.object(o, k, (__.isScalar(r = v[k]) ? r : __.fixup.call(_this, r)));
          }
        };
      })(this));
  }
};

__.hash = () =>
  ((Iron.Location.get().hash.slice(1).split('&')).map(a => a.split('='))).reduce(((p, c) => p[c[0]] = c[1], p), {})
__.indentString = Array(3 + 1).join(' ')

__.indent = (b, i, str) => {
  i == null && (i = 1)
  return i ? b.replace(/^/gm, Array(i + 1).join(str || __.indentString)) : b }


__.repeatString = (s, times) => Array(times + 1).join(s)


__.reKey = (o, old, n) => {
    if (o.hasOwnProperty(old)) {
        o[n] = o[old]
        delete o[old] }
    return this }

__.rekey = __.reKey

__.flatten = function(obj, chained_keys) {
  var flatObject, i, j, toReturn, _i, _j, _len, _len1;
  toReturn = {};
  for (_i = 0, _len = obj.length; _i < _len; _i++) {
    i = obj[_i];
    if (typeof obj[i] === 'object') {
      flatObject = __.flatten(obj[i]);
      for (_j = 0, _len1 = flatObject.length; _j < _len1; _j++) {
        j = flatObject[_j];
        if (chained_keys) {
          toReturn[i + '_' + j] = flatObject[j];
        } else {
          toReturn[j] = flatObject[j];
        }
      }
    } else {
      toReturn[i] = obj[i];
    }
  }
  return toReturn;
};


__.flattenObj = function(obj, chained_keys) {
  if (chained_keys == null) {
    chained_keys = '';
  }
  return __.reduceKeys(obj, {}, function(o, k) {
    k = chained_key + k;
    return __.object(o, k, __.isObject(o[k]) ? __.flattenObj(o[k], k) : o[k]);
  });
};


__.__position = function(obj) {
  return Meteor.setTimeout(function() {
    return $('#' + obj.parentId + ' .' + obj["class"]).css({
      top: obj.top,
      left: obj.left,
      position: 'absolute'
    });
  }, 200);
};

// __.isMeteorClient( () => require('./client.js') )
__.isMeteorServer( null, () => require('./es6.js') )
require('./extra.js')

if ('undefined' === typeof Meteor)  {
    module.exports = __  }
