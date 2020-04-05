import { readFile } from 'fs'
import { promisify } from 'util'
import { resolve as r } from 'path'

import Decorator from './decorator'

async function init () {
  let data = await promisify(readFile)(r(__dirname, '../../package.json'))
  data = JSON.parse(data)
  console.log(data.name)
}

init()

Decorator.run('test')
const myClass = new Decorator('Shepherd', 'Young')
console.log(myClass.name())
// myClass.name = function () { alert(100) } // readonly重新赋值会报错
myClass.bar()
myClass.deprecate()
