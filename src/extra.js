

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
