// Packages
const { cd, exec, which } = require('shelljs')

const hasYarn = () => Boolean(which('yarn'))

module.exports = {
  hasYarn,
  install: path => new Promise((resolve, reject) => {
    cd(path)
    const installCmd = hasYarn() ? 'yarn' : 'npm install'

    exec(installCmd, (code, stdout, stderr) => {
      if (code === 0) {
        resolve()
      } else {
        reject(stderr)
      }
    })
  })
}
