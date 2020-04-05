import { readFile } from 'fs'
import { promisify } from 'util'
import { resolve as r } from 'path'

async function init () {
  let data = await promisify(readFile)(r(__dirname, '../../package.json'))
  data = JSON.parse(data)
  console.log(data.name)
}

init()
