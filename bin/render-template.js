// Natives
const fs = require('fs')
const { sep } = require('path')

// Packages
const mustache = require('mustache')

module.exports = (templateData, data) => new Promise(resolve => {
  const { path, files } = templateData

  if (!files || files.length === 0) {
    return resolve([])
  }
 
  const renderedFiles = files.map(file => {
    const content = fs.readFileSync(file, { encoding: 'utf-8' })
    const rendered = mustache.render(content, data)
    const filePath = file.replace(`${path}${sep}`, '')

    return {
      path: filePath,
      content: Buffer.from(rendered)
    }
  })

  resolve(renderedFiles)
})
