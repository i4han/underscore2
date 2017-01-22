'use strict'

__ = {}
typeof Meteor === "undefined" && (exports.__ = __)

var baseUnits, checkTable, __NotPxDefaultProperties, __idClassKey, __localTags, __tideEventKey,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };


__.keys = function(obj) {
  return Object.keys(obj);
};

__.isUndefined = function(v) {
  return 'undefined' === typeof v;
};

__.isFunction = function(v) {
  return 'function' === typeof v;
};

__.isString = function(v) {
  return 'string' === typeof v;
};

__.isNumber = function(v) {
  return 'number' === typeof v;
};

__.isBoolean = function(v) {
  return 'boolean' === typeof v;
};

__.isScalar = function(v) {
  return __.isNumber(v) || __.isString(v) || __.isBoolean(v);
};

__.isNull = function(o) {
  return o === null;
};

__.isArray = function(o) {
  return '[object Array]' === Object.prototype.toString.call(o);
};

__.isObject = function(o) {
  return '[object Object]' === Object.prototype.toString.call(o);
};

__.isArguments = function(o) {
  return '[object Arguments]' === Object.prototype.toString.call(o);
};

__.isClient = function() {
  return 'object' === typeof window;
};

__.hasJQueryLoaded = function() {
  return 'function' === typeof $ && $() instanceof jQuery;
};

__.hasDOMLoaded = function(o) {
  return document.readyState === 'complete' || document.readyState === 'interactive';
};

__.isLower = function(v) {
  return __.isString(v) && __.check('lower', v);
};

__.isUpper = function(v) {
  return __.isString(v) && __.check('upper', v);
};

__.isJQuery = function(o) {
  return __.isClient() && 'undefined' !== typeof $ && o instanceof $;
};

__.isElement = function(o) {
  return 'undefined' !== typeof HTMLElement && o instanceof HTMLElement;
};

__.isHTMLTag = function(o) {
  return 'undefined' !== typeof HTML.Tag && o instanceof HTML.Tag;
};

__.isStyleDeclaration = function(o) {
  return 'undefined' !== typeof CSSStyleDeclaration && o instanceof CSSStyleDeclaration;
};

__.__isDeclaration = __.isStyleDeclaration;

__.isMeteor = function() {
  return 'undefined' !== typeof Meteor;
};

__.isMeteorServer = function() {
  return __.isMeteor() && Meteor.isServer;
};

__.isMeteorServer = function() {
  return __.isMeteor() && Meteor.isClient;
};

__.isBlazeView = function(o) {
  return 'undefined' !== typeof Blaze.View && o instanceof Blaze.View;
};

__.isBlazeElement = function(o) {
  return __.isHTMLTag(o) || __.isBlazeView(o) || __.isString(o);
};

__.isBlazeTemplateInstance = function(o) {
  return 'undefined' !== typeof Blaze.TemplateInstance && o instanceof Blaze.TemplateInstance;
};

__.isLookup = function(o) {
  return __.isObject(o) && __.isString(o.name) && o.name.slice(0, 7) === 'lookup:';
};

__.isBlazeAttr = function(o) {
  return __.isObject(o) && !__.isLookup(o) && !__.isBlazeElement(o);
};

__.isAttrPartKey = function(k) {
  return __.isString(k) && '$' === k[0];
};

__.isFunctionPartKey = function(k) {
  return __.isString(k) && __.check('alpha', k[0]);
};

__.maybeMustache = function(v) {
  return __.isString(v) && v.indexOf('{') !== -1 && v.indexOf('}') !== -1;
};

__.maybeHtmlEntity = function(v) {
  return __.isString(v) && v.indexOf('&#' > -1 && v.indexOf(';' > -1));
};

__.nameBlazeView = function(o) {
  return __.isBlazeView(o) && 'name' in o && o.name.slice(9);
};

__.classOf = Function.prototype.call.bind(Object.prototype.toString);

__.isEmptyArray = function(a) {
  return a.length === 0;
};

__.isEmptyObject = function(obj) {
  return __.isEmptyArray(__.keys(obj));
};

__.isEmpty = function(obj) {
  switch (false) {
    case !!obj:
      return true;
    case !__.isJQuery(obj):
      return __.isEmptyArray(obj);
    case !__.isArray(obj):
      return __.isEmptyArray(obj);
    case !__.isObject(obj):
      return __.isEmptyObject(obj);
    default:
      return false;
  }
};

__.on = function(e, f) {
  return document.addEventListener(e, f);
};

__.isVisible = function(v) {
  if ('function' === typeof v) {
    return v();
  } else if (false === v) {
    return false;
  } else {
    return true;
  }
};

__.delay = function(time, func) {
  if (typeof Meteor !== "undefined" && Meteor !== null) {
    return Meteor.setTimeout(func, time);
  } else {
    return setTimeout(func, time);
  }
};

__.timeout = __.delay;

__.reduce = function(a, o, f) {
  return a.reduce(f, o);
};

__.reduceKeys = function(obj, o, f) {
  return __.keys(obj).reduce(f, o);
};

__.eachKeys = function(obj, f) {
  return __.keys(obj).forEach(f);
};

__.__isPortableKey = function(v) {
  return /^[a-z]+$/i.test(v);
};

__.__isValue = function(v) {
  if (__.isScalar(v)) {
    return v;
  } else {
    return false;
  }
};

__.module = function(_) {
  switch (false) {
    case !__.isBlazeTemplateInstance(_):
      return Sat.module[__.nameBlazeView(_.view)];
    case !__.isBlazeView(_):
      return Sat.module[__.nameBlazeView(_)];
  }
};

__.getLocal = function(v) {
  return v.slice(6);
};

checkTable = {
  alpha: function(v) {
    return /^[a-zA-Z]+$/.test(v);
  },
  lower: function(v) {
    return /^[a-z]+$/.test(v);
  },
  upper: function(v) {
    return /^[A-Z]+$/.test(v);
  },
  name: function(v) {
    return /^[a-zA-Z0-9._-]+$/.test(v);
  },
  email: function(v) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(v);
  },
  attribute: function(v) {
    return /^[a-zA-Z]+$/.test(v);
  },
  id: function(v) {
    return /^[a-z]+[0-9]+$/.test(v) && !/^h[1-6]$/.test(v);
  },
  "class": function(v) {
    return /^_[a-z]+[a-zA-Z0-9$]*$/.test(v);
  },
  'id&class': function(v) {
    return /^[a-zA-Z0-9_$]+$/.test(v) && /_/.test(v);
  },
  digit: function(v) {
    return /^[0-9]+$/.test(v);
  },
  local: function(v) {
    return /^local_/.test(v);
  }
};

__.check = function() {
  var args, i;
  args = [].slice.call(arguments);
  i = 0;
  while (i < args.length - 1) {
    if (checkTable[args[i++]](args.slice(-1)[0])) {
      return args[i - 1];
    }
  }
  return false;
};

__.checkEventKey = function(e, code) {
  return code === (e.KeyCode || e.which);
};

__.capitalize = function(str) {
  return __.isString(str) && str[0].toUpperCase() + str.slice(1);
};

__.camelize = function(str) {
  return __.isString(str) && str.replace(/-([a-z])/g, function(_, $1) {
    return $1.toUpperCase();
  }).replace(/\-/g, '$');
};

__.dasherize = function(str) {
  return __.isString(str) && str.replace(/\$/g, '-').replace(/([A-Z])/g, function($1) {
    return '-' + $1.toLowerCase();
  });
};

__.__dasherize = function(str) {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
};

__.__toObject = function(a) {
  var v;
  if (void 0 === a) {
    return {};
  } else if (__.isObject(a)) {
    return a;
  } else if (__.isString(a)) {
    return ((v = {})[a] = '') || v;
  } else if (__.isArray(a)) {
    return a.reduce((function(o, v) {
      o[v[0]] = v[1];
      return o;
    }), {});
  } else {
    return {};
  }
};

__.toArray = function(str) {
  if (__.isArray(str)) {
    return str;
  } else if (__.isString(str)) {
    return str.split(' ');
  } else if (void 0 === str) {
    return [];
  } else {
    return str;
  }
};

__.__interpolate = function(str, o) {
  return str.replace(/{([^{}]*)}/g, function(a, b) {
    return __.isValue(o[b]) || a;
  });
};

__.__interpolateObj = function(o, data) {
  __.keys(o).map(function(k) {
    return o[k] = __.interpolate(o[k], data);
  });
  return o;
};

__.__interpolateOO = function(options, data) {
  __.isEmpty(data) || __.keys(options).map(function(m) {
    return options[m] = __.interpolateObj(options[m], data);
  });
  return options;
};

__["return"] = function(func, _this) {
  _this = _this || this;
  if (__.isFunction(func)) {
    return func.call(_this);
  } else {
    return func;
  }
};

__.__assign = function(obj, properties) {
  var key, val;
  for (key in properties) {
    val = properties[key];
    obj[key] = val;
  }
  return obj;
};

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
    if (except && (__indexOf.call(except, k) >= 0)) {
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

__.extend = __.assign;

__.remove = function(obj, key) {
  delete obj[key];
  return obj;
};

__.pop = function(obj, key) {
  var ret;
  ret = obj[key];
  delete obj[key];
  return ret;
};

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

__.object = function(obj) {
  var args;
  args = [].slice.call(arguments);
  switch (false) {
    case !(__.isObject(obj) && __.isString(args[1])):
      obj[args[1]] = args[2];
      return obj;
    case !(__.isObject(obj) && __.isArray(args[1])):
      args.slice(1).forEach(function(a) {
        return obj[a[0]] = a[1];
      });
      return obj;
    case !__.isArray(obj):
      return obj.reduce((function(o, a) {
        o[a[0]] = a[1];
        return o;
      }), {});
  }
};

__.theKey = function(obj) {
  return __.keys(obj)[0];
};

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

__.__addProperty = function(obj, key, value) {
  return __.object(obj, key, value);
};

__.__value = function(value) {
  if ('number' === typeof value) {
    return value.toString() + 'px';
  } else if ('string' === typeof value) {
    return value;
  } else if ('function' === typeof value) {
    return value();
  } else {
    return value;
  }
};

__.__indentStyle = function(obj, depth) {
  if (depth == null) {
    depth = 1;
  }
  if (!__.isObject(obj)) {
    return obj;
  }
  return __.keys(obj).map(function(key) {
    var value;
    value = obj[key];
    key = __.isPortableKey(key) ? __.dasherize(key) : key;
    return (Array(depth).join('    ')) + (function() {
      switch (false) {
        case !__.isObject(value):
          return [key, __.indentStyle(value, depth + 1)].join('\n');
        case '' !== value:
          return key;
        case '' !== key:
          return __.__value(value);
        default:
          return key + ' ' + __.__value(value);
      }
    })();
  }).join('\n');
};

__.hash = function() {
  return ((Iron.Location.get().hash.slice(1).split('&')).map(function(a) {
    return a.split('=');
  })).reduce((function(p, c) {
    p[c[0]] = c[1];
    return p;
  }), {});
};

__.indentString = Array(3 + 1).join(' ');

__.indent = function(b, i, str) {
  if (i == null) {
    i = 1;
  }
  if (i) {
    return b.replace(/^/gm, Array(i + 1).join(str || __.indentString));
  } else {
    return b;
  }
};

__.repeat = function(str, times) {
  return Array(times + 1).join(str);
};

__.__saveMustache = function(str) {
  return __.decode(__.decode(str, '{', 2), '}', 2);
};

__.__trim = function(str) {
  if (str != null) {
    return str.trim();
  } else {
    return null;
  }
};

__.__prettyJSON = function(obj) {
  return JSON.stringify(obj, null, 4);
};

__.__getValue = function(id) {
  var element;
  if (element = document.getElementById(id)) {
    return element.value;
  } else {
    return null;
  }
};

__.__trimmedValue = function(id) {
  var element;
  if (element = document.getElementById(id)) {
    return element.value.trim();
  } else {
    return null;
  }
};

__["__slice"] = function(str, tab, indent) {
  if (tab == null) {
    tab = 1;
  }
  if (indent == null) {
    indent = '    ';
  }
  return (((str.replace(/~\s+/g, '')).split('|')).map(function(s) {
    return s = 0 === s.search(/^(<+)/) ? s.replace(/^(<+)/, Array(tab = Math.max(tab - RegExp.$1.length, 1)).join(indent)) : 0 === s.search(/^>/) ? s.replace(/^>/, Array(++tab).join(indent)) : s.replace(/^/, Array(tab).join(indent));
  })).join('\n');
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

__.__renameKeys = function(obj, keyObject) {
  return _.each(_.keys(keyObject, function(key) {
    return __.reKey(obj, key, keyObject[key]);
  }));
};

__.rekey = function(obj, oldName, newName) {
  if (obj.hasOwnProperty(oldName)) {
    obj[newName] = obj[oldName];
    delete obj[oldName];
  }
  return this;
};

__.__repeat = function(pattern, count) {
  var result;
  if (count < 1) {
    return '';
  }
  result = '';
  while (count > 0) {
    if (count & 1) {
      result += pattern;
    }
    count >>= 1;
    pattern += pattern;
  }
  return result;
};

__.__deepExtend = function(target, source) {
  var prop;
  for (prop in source) {
    if (prop in target) {
      __.deepExtend(target[prop], source[prop]);
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
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

__.calendar = function(fym, id_ym, items, top, bottom) {
  var $id, action, moment_ym, _i, _j, _ref, _ref1, _results, _results1;
  action = moment().format(fym) > id_ym ? 'prepend' : 'append';
  $(items)[action](DIV({
    "class": 'month',
    id: id_ym
  }));
  moment_ym = moment(id_ym, fym);
  top = $(window).scrollTop();
  ($id = $('#' + id_ym)).append(H2({
    id: id_ym
  }, moment_ym.format('MMMM YYYY')));
  (function() {
    _results = [];
    for (var _i = 1, _ref = parseInt(moment_ym.startOf('month').format('d')); 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this).forEach(function(i) {
    return $id.append(DIV({
      "class": 'everyday empty',
      style: 'visibility:hidden'
    }));
  });
  (function() {
    _results1 = [];
    for (var _j = 1, _ref1 = parseInt(moment_ym.endOf('month').format('D')); 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; 1 <= _ref1 ? _j++ : _j--){ _results1.push(_j); }
    return _results1;
  }).apply(this).forEach(function(i) {
    var id;
    $id.append(DIV({
      "class": 'everyday',
      id: id = id_ym + ('0' + i).slice(-2)
    }));
    __.insertTemplate('day', id, {
      id: id
    });
    return __.contentEditable(id, function(_id) {
      var content, doc;
      id = $(_id).parent().attr('id');
      content = $(_id).html();
      switch ($(_id).attr('class')) {
        case 'title':
          console.log('title', id, content);
          if (doc = db.Calendar.findOne({
            id: id
          })) {
            return db.Calendar.update({
              _id: doc._id,
              $set: {
                title: content,
                event: doc.event
              }
            });
          } else {
            return db.Calendar.insert({
              id: id,
              title: content
            });
          }
          break;
        case 'event':
          console.log('event', id, content);
          if (doc = db.Calendar.findOne({
            id: id
          })) {
            return db.Calendar.update({
              _id: doc._id,
              $set: {
                title: doc.title,
                event: content
              }
            });
          } else {
            return db.Calendar.insert({
              id: id,
              event: content
            });
          }
      }
    });
  });
  if ('prepend' === action) {
    __.timeout(10, function() {
      return $(window).scrollTop(top + $id.outerHeight());
    });
    return $(top).data({
      id: id_ym
    });
  } else {
    return $(bottom).data({
      id: id_ym
    });
  }
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

__idClassKey = function(key, fid, seperator) {
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

__.__tideKey = function(obj, fid, seperator) {
  if (!__.isObject(obj)) {
    return obj;
  }
  return __.keys(obj).reduce((function(o, k) {
    var ok;
    switch (false) {
      case '$' !== k[0]:
        return commandKey(o, k);
      case !(/^[A-Z]+$/.test(k) || /^H[1-6]$/.test(k)):
        return htmlKey(o, k);
      default:
        o[idClassKey(k, fid, seperator)] = __.isObject(ok = obj[k]) ? __.tideKey(ok, fid, seperator) : ok;
        return o;
    }
  }), {});
};

__tideEventKey = function(key, fid) {
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

__NotPxDefaultProperties = 'zIndex fontWeight'.split(' ');

__.__tideValue = function(obj) {
  if (!__.isObject(obj)) {
    return obj;
  }
  return __.keys(obj).reduce((function(o, k) {
    var ok;
    o[k] = (function() {
      switch (false) {
        case !__.isObject(ok = obj[k]):
          return __.tideValue(ok);
        case 0 !== ok:
          return '0';
        case 'number' !== typeof ok:
          return String(ok) + (__indexOf.call(NotPxDefaultProperties, k) >= 0 ? '' : 'px');
        default:
          return ok;
      }
    })();
    return o;
  }), {});
};

"class __.Module\n   constructor: (name) ->\n      @name = name\n   id: (str) ->\n      if str.indexOf(' ') > -1 then str.split(' ').map (s) =>\n         '#' + window.Module[@name].block + '-' + @name + '-' + s\n      else '#' + window.Module[@name].block + '-' + @name + '-' + str\n   _instance: (i) -> @instance = i";

__localTags = function(f, m) {
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

__.__module = function(name, m) {
  m.name = name;
  m.title = m.label = m.label || m.title || __.capitalize(name);
  m.block = m.block || 'x';
  (m.fn = __["return"](m.fn, m)) && __.keys(m.fn).forEach(function(f) {
    return m[f] = m.fn[f];
  });
  return m.local = m.fn && m.fn.local || function(id) {
    var uniqueName;
    uniqueName = name + (m.hash ? '-' + m.hash : '');
    if (id[0] === '#') {
      return '#' + uniqueName + '-' + id.slice(1);
    } else {
      return uniqueName + '-' + id;
    }
  };
};

__.isModule = function(m) {
  return __.isObject(m) && 'local' in m && 'label' in m;
};

baseUnits = {
  zIndex: '',
  fontWeight: ''
};

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


/*
class __.Style
   constructor: (selector) ->
      @selector = selector
      @rules = @style = null
      [0..(sheets = document.styleSheets).length - 1].forEach (i) =>
         sheets?[i]?.cssRules? and [0..(rules = sheets[i].cssRules).length - 1].forEach (j) =>
            if rules[j] and rules[j].selectorText == selector
               @rules = rules[j]
               @style = rules[j].style
   get: (property)        -> @style[property]
   set: (property, value) ->
      if __.isObject property then __.eachKeys property, (k) => @set k, property[k]
      else
         console.log property, value
         value = __.cssValue property, value
         if value is '' then (@style[property] and @style.removeProperty property)
         else @style.setProperty(property, value)
      @
 */

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
