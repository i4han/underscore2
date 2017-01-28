'use strict'
'undefined' === typeof __ && 'undefined' !== typeof window ? window.__ = window.__ || {} : global.__ = global.__ || {}
__ = __ || {} // I need to put his because meteor server __ is undefined. why?

__.keys        = o => Object.keys(o)
__.t     = (v, t) => 'function' === typeof t ? (v === t ? t() : t(v)) : 'undefined' === typeof t ? true  : t
__.f     = (v, f) => 'function' === typeof f ? (v === f ? f() : f(v)) : 'undefined' === typeof f ? false : f
__.true  = (v, t) => v && __.t(v, t)
__.false = (v, f) => v || __.f(v, f)
__.isIt  = (v, it, t, f) => it ? __.t(v, t) : __.f(v, f)
__.isFunction   = (v, t, f) => __.isIt(v, 'function'  === typeof v, t, f)
__.isUndefined  = (v, t, f) => __.isIt(v, 'undefined' === typeof v, t, f)
__.isString     = (v, t, f) => __.isIt(v, 'string'    === typeof v, t, f)
__.isNumber     = (v, t, f) => __.isIt(v, 'number'    === typeof v, t, f)
__.isBoolean    = (v, t, f) => __.isIt(v, 'boolean'   === typeof v, t, f)
__.isScalar     = (v, t, f) => __.isIt(v, __.isNumber(v) || __.isString(v) || __.isBoolean(v), t, f)
__.__isNull     = v => o === null // Do you need this? No
__.isArray      = (v, t, f) => __.isIt(v, '[object Array]'     === Object.prototype.toString.call(v), t, f)
__.isObject     = (v, t, f) => __.isIt(v, '[object Object]'    === Object.prototype.toString.call(v), t, f)
__.isArguments  = (v, t, f) => __.isIt(v, '[object Arguments]' === Object.prototype.toString.call(v), t, f)
__.isClient        = (t, f) => __.isIt(void 0, 'object'   === typeof window, t, f)
__.hasJQueryLoaded = (t, f) => __.isIt(void 0, 'function' === typeof $ && $() instanceof jQuery, t, f)
__.hasDOMLoaded    = (t, f) => __.isIt(void 0, document.readyState === 'complete' || document.readyState === 'interactive', t, f)

__.isLower      = (v, t, f) => __.isIt(v, __.isString(v) && v.toLowerCase() === v, t, f)
__.isUpper      = (v, t, f) => __.isIt(v, __.isString(v) && v.toUpperCase() === v, t, f)
__.isJQuery     = (v, t, f) => __.isIt(v, __.isClient() && 'undefined' !== typeof $ && v instanceof $,    t, f)
__.isElement    = (v, t, f) => __.isIt(v, 'undefined' !== typeof HTMLElement && v instanceof HTMLElement, t, f)
__.isHTMLTag    = (v, t, f) => __.isIt(v, 'undefined' !== typeof HTML.Tag    && v instanceof HTML.Tag,    t, f)
__.isStyleDeclaration = (v, t, f) => __.isIt(v, 'undefined' !== typeof CSSStyleDeclaration && v instanceof CSSStyleDeclaration, t, f)
__.isArrayLike  = (v, t, f) => __.isIt(v, __.isArray(v) || __.isArguments(v) || __.isStyleDeclaration(v), t, f)
__.isMeteor        = (t, f) => __.isIt(void 0, 'undefined' !== typeof Meteor,    t, f)
__.isMeteorServer  = (t, f) => __.isIt(void 0, __.isMeteor() && Meteor.isServer, t, f)
__.isMeteorClient  = (t, f) => __.isIt(void 0, __.isMeteor() && Meteor.isClient, t, f)

__.meteorStartup = f => __.isUndefined(__._meteor_startup, (() => __._meteor_startup = [f]), () => __._meteor_startup.push(f))
__.runMeteorStartup = () => __._meteor_startup && __._meteor_startup.forEach(f => f())
__._db = __._db || {}
__._db_stack = __._db_stack || []
__.db = (collection, data, fn) =>
  __._db[collection] ? fn(__._db[collection], data) : __._db_stack.push({collection, data, fn})

__.isBlazeView       = o => 'undefined' !== typeof Blaze.View && o instanceof Blaze.View
__.isBlazeElement    = o => __.isHTMLTag(o) || __.isBlazeView(o) || __.isString(o)
__.isBlazeTemplateInstance = o =>
  'undefined' !== typeof Blaze.TemplateInstance && o instanceof Blaze.TemplateInstance
__.isLookup          = o => __.isObject(o) && __.isString(o.name) && o.name.slice(0, 7) === 'lookup:'
__.isBlazeAttr       = o => __.isObject(o) && !__.isLookup(o) && !__.isBlazeElement(o)
__.isAttrPartKey     = k => __.isString(k) && '$' === k[0]
__.isFunctionPartKey = k => __.isString(k) && __.check('alpha', k[0])
__.maybeMustache     = v => __.isString(v) && v.indexOf('{') !== -1 && v.indexOf('}') !== -1 // includes
__.maybeHtmlEntity   = v => __.isString(v) && v.indexOf('&#' > -1 && v.indexOf(';' > -1))
__.isEmptyArray      = a => a.length === 0
__.isEmptyObject     = o => __.isEmptyArray(__.keys(o))
__.isEmpty           = o =>
    ! o            ? true :
    __.isJQuery(o) ? __.isEmptyArray(o)  :
    __.isArray(o)  ? __.isEmptyArray(o)  :
    __.isObject(o) ? __.isEmptyObject(o) : false

__.nameBlazeView     = o => __.isBlazeView(o) && 'name' in o && o.name.slice(9)
__.classOf = Function.prototype.call.bind(Object.prototype.toString)

__.on = (e, f) => document.addEventListener(e, f)

__.__isVisible = v => __.isFunction(v) ? v() : false === v ? false : true // need to rethink

__.delay = (time, func) =>         // __.isMeteor(t, f)
  typeof Meteor === "undefined" ? setTimeout(func, time) : Meteor.setTimeout(func, time)
__.setTimeout = (func, time) => __.isMeteor(() => Meteor.setTimeout(func, time), () => setTimeout(func, time))
__.__timeout = __.delay;

__.reduce     = (a, o, f) => a.reduce(f, o)
__.reduceKeys = (obj, o, f) => __.keys(obj).reduce(f, o)
__.eachKeys   = (obj, f)    => __.keys(obj).forEach(f)

__.module  = v =>
    __.isBlazeTemplateInstance(v) ? Sat.module[__.nameBlazeView(v.view)] :
    __.isBlazeView(v)             ? Sat.module[__.nameBlazeView(v)] : '?' // what to do? v _?

__.getLocal = v => v.slice(6)

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

__.checkEventKey = (e, code) => code === (e.KeyCode || e.which)
__.capitalize = s => __.isString(s) && s[0].toUpperCase() + s.slice(1)
__.camelize   = s => __.isString(s) && s.replace(/-([a-z])/g, (_, $1) => $1.toUpperCase()).replace(/\-/g, '$')
__.dasherize  = s => __.isString(s) && s.replace(/\$/g, '-').replace(/([A-Z])/g, $1 => '-' + $1.toLowerCase())

__.return = function(func, self) {
  self = self || this
  return __.isFunction(func) ? func.call(self, self) : func }

__.toArray = s =>
  __.isArray(s)  ? s :
  __.isString(s) ? s.split(' ') :
  __.isEmpty(s)  ? [] : s

__.toString = v =>
  __.isString(v) ? v :
  __.isObject(v) ? JSON.stringify(v) :
  __.isScalar(v) || __.isArray(v) ? v.toString() : void 0

__.padLeft  = (pad, s) =>  // pad: pading space ' ' _number_ like 6 or pad _string_ like '****'
  (__.toString(s) + (__.isNumber(pad) ? Array(pad + 1).join(' ') : pad)).slice(0, (__.isNumber(pad) ? pad : pad.length))
__.padRight = (pad, s) =>
  ((__.isNumber(pad) ? Array(pad + 1).join(' ') : pad) + __.toString(s)).slice(  -(__.isNumber(pad) ? pad : pad.length))

/*/ next work
__.assign = (obj) ->
   (args = [].slice.call arguments).length > 1 and args[1..].forEach (o) -> obj[k] = v for k, v of o
   obj
   combining two objects.
*/
__.assign = function(obj) {
  var args;
  (args = [].slice.call(arguments)).length > 1 && args.slice(1).forEach(function(o) {
    var k, v, _results;
    _results = [];
    for (k in o) {
      v = o[k];
      _results.push(obj[k] = v);
    }
    return _results;
  });
  return obj;
};

__.compare = function(obj, properties, except) {
  return __.reduceKeys(properties, {}, function(o, k) {
    if (except && (except.indexOf(k) > -1)) {
      return o;
    } else {
      if (__.isObject(obj[k]) && __.isObject(properties[k])) {
        return __.object(o, k, __.compare(obj[k], properties[k], except));
      } else {
        if (obj[k] !== properties[k]) {
          return __.object(o, k, properties[k]);
        } else {
          return o;
        }
      }
    }
  });
};

__.extend = __.assign

__.remove = (obj, key) => {
  delete obj[key]
  return obj }

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


__.function = o => __.isFunction(o) ? o : () => o
__.object = (o, k, v) => {
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

__.repeat = function(str, times) {
  return Array(times + 1).join(str);
};

__.insertTemplate = function(page, id, data) {
  if (data == null) {
    data = {};
  }
  $('#' + id).empty();
  return Blaze.renderWithData(Template[page], __.isEmpty(data) ? Template[page].helpers : data, document.getElementById(id));
};

__.currentRoute = function() {
  return Router.current().route.getName();
};

__.render = function(page) {
  return Template[page].renderFunction().value;
};

__.rekey = function(obj, oldName, newName) {
  if (obj.hasOwnProperty(oldName)) {
    obj[newName] = obj[oldName];
    delete obj[oldName];
  }
  return this;
};

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

__.flattenArray = function(a) {
  return __.reduce(a, [], function(o, v) {
    return __.array(o, v, __.isArray(v) ? void 0 : v);
  });
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

__.position = function(obj) {
  return Meteor.setTimeout(function() {
    return $('#' + obj.parentId + ' .' + obj["class"]).css({
      top: obj.top,
      left: obj.left,
      position: 'absolute'
    });
  }, 200);
};

__.scrollSpy = function(obj) {
  var $$;
  $$ = $('.scrollspy');
  $$.scrollSpy();
  return ['enter', 'exit'].forEach(function(a) {
    return $$.on('scrollSpy:' + a, function() {
      if (obj[a] != null) {
        return obj[a][$(this).attr('id')]();
      }
    });
  });
};


__.windowFit = function(options) {
  var window_height, window_width;
  if (options.style && (window_width = $(window).width()) / (window_height = $(window).height()) > options.ratio) {
    options.style.remove('height').set('width', '100%');
    return options.selector.css('margin-left', '').css('margin-top', px((window_height - options.selector.height()) / 2));
  } else if (options.style) {
    options.style.remove('width').set('height', '100%');
    return options.selector.css('margin-top', '').css('margin-left', px((window_width - options.selector.width()) / 2));
  }
};

__.query = function() {
  return Iron.Location.get().queryObject;
};

__.addQuery = function(obj) {
  var result;
  if ((obj == null) || __.isEmpty(obj)) {
    return '';
  }
  if ((result = __.queryString(obj)).length > 0) {
    return '?' + result;
  } else {
    return '';
  }
};

__.queryString = function(obj, delimeter) {
  var i;
  if (delimeter == null) {
    delimeter = '&';
  }
  return ((function() {
    var _results;
    _results = [];
    for (i in obj) {
      _results.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
    }
    return _results;
  })()).join(delimeter);
};

__.decode = function(str, code, repeat) {
  var decode;
  decode = encodeURIComponent(code);
  return str.replace(new RegExp("(?:" + decode + "){" + repeat + "}(?!" + decode + ")", 'g'), __.repeat(code, repeat));
};

__.urlWithQuery = function(obj) {
  return obj.url + __.addQuery(obj.options.query);
};

__.oauth = function(obj) {
  __.isString(obj) && (obj = Settings[obj].oauth);
  return __.urlWithQuery(obj);
};

__.__list = function(what) {
  return ((what = 'string' === typeof what ? what.split(' ') : Array.isArray(what) ? what : []).map(function(a) {
    return "." + a + " {{" + a + "}}";
  })).join('\n');
};

__.sidebar = function(list, id) {
  if (id == null) {
    id = 'sidebar_menu';
  }
  return {
    list: list,
    jade: {
      'each items': {
        '+menu_list': ''
      }
    },
    helpers: {
      items: function() {
        return list.map(function(a) {
          return {
            name: a,
            id: id
          };
        });
      }
    }
  };
};

__.assignPopover = function(o, v) {
  return __.assign(o, 'focus input#' + v, function() {
    return $('input#' + v).attr('data-content', __.render('popover_' + v)).popover('show');
  });
};

__.popover = function(list) {
  return list.reduce((function(o, v) {
    return __.assignPopover(o, v);
  }), {});
};

__.log = function() {
  return (arguments !== null) && ([].slice.call(arguments)).concat(['\n']).map(function(str) {
    if (Meteor.isServer) {
      return fs.appendFileSync(Config.log_file, str + ' ');
    } else {
      return console.log(str);
    }
  });
};

let __idClassKey = function(key, fid, seperator) {
  var r;
  while ((r = new RegExp(/\[(#?[a-z_]+[0-9]+)\]/)).test(key)) {
    key = key.replace(r, function(m, $1) {
      return fid($1);
    });
  }
  if (!(/^[a-zA-Z0-9_$]+$/.test(key) && /[0-9_$]+/.test(key))) {
    return key;
  }
  return key.split('_').map(function(a, i) {
    switch (false) {
      case '' !== a:
        return null;
      case !/^[a-z_]+[0-9]+$/.test(a):
        return '#' + fid(a);
      case 0 !== i:
        return a;
      default:
        return '.' + __.dasherize(a);
    }
  }).filter(function(f) {
    return f;
  }).join(seperator);
};

let __tideEventKey = function(key, fid) {
  var re;
  while ((re = new RegExp(/(\s+)_\[(#[a-z_]+[0-9]+)\](,|\s+|$)/)).test(key)) {
    key = key.replace(re, function(m, $1, $2, $3) {
      return $1 + fid($2) + $3;
    });
  }
  return key;
};

__.tideEventKey = function(obj, fid) {
  return __.reduceKeys(obj, {}, function(o, k) {
    return __.object(o, k.replace(/(\s+)\{\s*local\s+(#?)([a-z_]+[0-9]+)\s*\}(,|\s+|$)/g, function(m, $1, $2, $3, $4) {
      return $1 + $2 + fid($3) + $4;
    }), obj[k]);
  });
};

const __NotPxDefaultProperties = 'zIndex fontWeight'.split(' ');


let __localTags = function(f, m) {
  var tags;
  return (tags = f.toString().match(/(this\.H[1-6]|this\.[A-Z]+)[^\w]/g)) && tags.map(function(tag) {
    return tag.match(/[A-Z]+[1-6]?/)[0];
  }).forEach(function(tag) {
    return m[tag] = global[tag].bind(m);
  });
};

__.parseValue = function(str) {
  if (!__.isString(str)) {
    return str;
  }
  return str.replace(/(^|[^{])\{([^{}]+)\}($|[^}])/g, function(m, $1, $2, $3) {
    return $1 + '{{' + $2 + '}}' + $3;
  });
};

__.key2class = function(k) {
  return __.dasherize(k.slice(1));
};

__.key2id = function(k) {
  if (k && 'local' in this) {
    return this.local(k);
  } else {
    return '';
  }
};

__.key2attribute = function(k) {
  return __.dasherize(k);
};


__.isModule = function(m) {
  return __.isObject(m) && 'local' in m && 'label' in m;
};

const baseUnits = {
  zIndex: '',
  fontWeight: '' }

__.cssValue = function(k, v) {
  switch (false) {
    case 0 !== v:
      return '0';
    case !__.isNumber(v):
      return String(v) + (v in baseUnits ? baseUnits[k] : 'px');
    default:
      return v;
  }
};


__.removeRule = function(selector, property) {
  var sheets, _i, _ref, _results;
  return (function() {
    _results = [];
    for (var _i = 0, _ref = (sheets = document.styleSheets).length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this).forEach(function(i) {
    var rules, _i, _ref, _ref1, _results;
    return ((typeof sheets !== "undefined" && sheets !== null ? (_ref = sheets[i]) != null ? _ref.cssRules : void 0 : void 0) != null) && (function() {
      _results = [];
      for (var _i = 0, _ref1 = (rules = sheets[i].cssRules).length - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; 0 <= _ref1 ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this).forEach(function(j) {
      if (rules[j] && rules[j].selectorText === selector) {
        if (__.isArray(property)) {
          return property.map(function(p) {
            return rules[j].style.removeProperty(p);
          });
        } else {
          return rules[j].style.removeProperty(property);
        }
      }
    });
  });
};

__.insertRule = function(rule, index) {
  if (index == null) {
    index = 0;
  }
  console.log(window.cube.stylesheet);
  if (window.cube.stylesheet.insertRule) {
    return window.cube.stylesheet.insertRule(rule, index);
  } else {
    return window.cube.stylesheet.addRule(rule);
  }
};

__.removeMultipleRules = function(obj) {
  return __.isObject(obj) && __.keys(obj).forEach(function(k) {
    if (__.isArray(obj[k])) {
      return obj[k].forEach(function(p) {
        return __.removeRule(k, p);
      });
    } else {
      return __.removeRule(k, obj[k]);
    }
  });
};

'undefined' === typeof Meteor && (module.exports = __)
