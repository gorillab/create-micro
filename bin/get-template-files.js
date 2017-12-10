// Natives
const path = require('path')

// Packages
const recursive = require('recursive-readdir')

// Constants
const templatePath = path.resolve(__dirname, '..', 'templates')

module.exports = options => {
  const ignoreFiles = file => {
    const basenameFile = path.basename(file)

    for (const key in options) {
      if (basenameFile.startsWith(key)) {
        return !options[key]
      }
    }
  }

  return new Promise((resolve, reject) => recursive(templatePath, [ignoreFiles], (err, files) => err ? reject(err) : resolve({
    path: templatePath,
    files
  })))
}
