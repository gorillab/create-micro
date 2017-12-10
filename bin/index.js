#!/usr/bin/env node

// Natives
const path = require('path')

// Packages
const args = require('args')
const chalk = require('chalk')
const trash = require('trash')

const createDir = require('./create-dir')
const getTemplateFiles = require('./get-template-files')
const renderTemplate = require('./render-template')
const createFile = require('./create-file')
const { hasYarn, install } = require('./install-deps')

args
  .option('name', 'Name of the basic micro application', 'micro-service')
  .option('dockerfile', 'Include Dockerfile in the project using node:9-alpine', false)

const parameters = args.parse(process.argv)

const { name, dockerfile } = parameters

const templateFileOptions = {
  Dockerfile: dockerfile
}

createDir(name)
  .then(() => getTemplateFiles(templateFileOptions))
  .then(data => renderTemplate(data, parameters))
  .then(data => Promise.all(data.map(templateData => createFile(templateData, name))))
  .then(() => {
    console.log(chalk.green('Created!\n'))
    const projectPath = path.resolve(process.cwd(), name)
    const packageManager = hasYarn() ? 'yarn' : 'npm'

    console.log(chalk.green(`Installing packages using ${packageManager}...`))

    return install(projectPath)
  })
  .then(() => console.log(chalk.green('\nDone!')))
  .catch(err => {
    console.log(chalk.red(`ERROR`))
    console.error(err)

    trash(name)
  })
