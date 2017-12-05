// Natives
const {writeFileSync, existsSync, mkdirSync} = require('fs')
const path = require('path')

module.exports = (data, dirname) => {
  return new Promise((resolve, reject) => {
    const currentPath = process.cwd()
    const distPath = path.resolve(currentPath, dirname, data.path)
    try {
      const {dir} = path.parse(distPath)
      if (!existsSync(dir)) {
        mkdirSync(dir)
      }
      const refactorPath = distPath.replace('{{name}}', dirname);
      writeFileSync(refactorPath.replace('.tmpl', ''), data.content)
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}
