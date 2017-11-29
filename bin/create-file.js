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
      console.log('@dirname: ', dirname);
      console.log('@distPath: ', distPath);
      const refactorPath = distPath.replace('{{name}}', dirname);
      console.log('@distPath-refact: ', refactorPath);
      writeFileSync(refactorPath.replace('.tmpl', ''), data.content)
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}
