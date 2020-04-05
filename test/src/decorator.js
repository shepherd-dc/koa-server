import { readonly, deprecate } from 'core-decorators'

function isTestable (value) {
  return function decorator (target) {
    target.isTestable = value
  }
}

function mixins (...args) {
  return function decorator (target) {
    Object.assign(target.prototype, ...args)
  }
}

// function readonly (target, key, descriptor) {
//   descriptor.writable = false
//   return descriptor
// }

function log (target, key, descriptor) {
  const value = descriptor.value
  descriptor.value = function (...args) { // 注意这里需要保留原this作用域，不能使用箭头函数
    console.log(`Calling function ${key} with ${args.length ? args : 'no args'}`) // 打印日志
    return value.apply(this, args)
  }
}

const foo = {
  bar () {
    console.log('function bar')
  }
}

@isTestable(false)
@mixins(foo)
class MyClass {
  constructor (last, first) {
    this.firstName = first
    this.lastName = last
  }

  @readonly
  name () {
    return `${this.lastName} ${this.firstName}`
  }

  @deprecate('This function will be removed in future versions.', { url: 'www.shepherdnet.top' })
  deprecate () {
    console.log('deprecate test')
  }

  @log
  static run (...args) {
    console.log(`Decrator is working with ${args}`)
  }
}

export default MyClass
