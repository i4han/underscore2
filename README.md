
## Underscore2
Underscore-like library that provide a set of useful functions for Meteor.

## Not Production Ready
Do not use this package for your serious project yet.

## Installation

    npm install underscore2 # not yet

## Dependency
Meteor 1.0 and coffee script 1.8
Lower version of coffee script may be ok.

## Underscore
Collections
- each:   use .forEach
- map:    use .map
- reduce: use .reduce
- reduceRight use .reduceRight
- find:   find all [object list]
- filter: use .filter
- where:  need?
- findWhere: find the first [object list]
- reject: use .filter
- every: write x.all
- some:  write x.any
- contains: use .indexOf
- invoke: [array of array]
- pluck:  extracting a list of property values. [object list]
- max: useful with [object list]
- min: same
- sortBy
- groupBy
- indexBy
- countBy
- shuffle: need?
- sample: need?
- toArray: arguments? x.array
- size: number of values. Why?
- partition: seperate an Array, true of false.
Arrays
- first [..n]
- initial Except the last element. [..-2]
- last [-1..]
- rest [1..]
- compact  false, null, 0, "", undefined and NaN are all falsy.
- flatten:
- without: array without arguments.
- union:
- intersection
- difference
- uniq
- zip
- unzip
- object
- indexOf
- lastIndexOf
- sortedIndex
- findIndex
- findLastIndex
- range
Functions
- bind  .bind
- bindAll forEach .bind
- partial .bind
- memoize
- delay: setTimeout
- defer
- throttle
- debounce
- once
- after: Function that will be run after first being called count times.
- before
- wrap
- negate
- compose
Objects
- keys
- allKeys
- values
- mapObject
- pairs
- invert
- create
- functions
- findKey
- extend
- extendOwn
- pick
- omit
- defaults
- clone
- tap
- has
- matcher
- property
- propertyOf
- isEqual
- isMatch
- isEmpty
- isElement
- isArray
- isObject
- isArguments
- isFunction
- isString
- isNumber
- isFinite
- isBoolean
- isDate
- isRegExp
- isNaN
- isNull
- isUndefined
Utility
- noConflict
- identity
- constant
- noop
- times
- random
- mixin
- iteratee
- uniqueId
- escape
- unescape
- result
- now
- template
Chaining
- chain
- value

## Resources
- meteor
- coffee-script
- underscore
