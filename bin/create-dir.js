// Natives
const path = require('path')
const fs = require('fs')

module.exports = dirname => new Promise((resolve, reject) => {
  const currentPath = process.cwd()

  fs.access(currentPath, fs.constants.W_OK, err => {
    if (err) {
      reject(err)
    } else {
      const pathToCreate = path.resolve(currentPath, dirname)

      fs.mkdir(pathToCreate, createDirErr => {
        if (createDirErr) {
          reject(createDirErr)
        } else {
          resolve()
        }
      })
    }
  })
})
