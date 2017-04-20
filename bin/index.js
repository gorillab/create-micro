#!/usr/bin/env node

// Natives
const path = require('path')

// Packages
const args = require('args')
const chalk = require('chalk')

const createDir = require('./create-dir')
const getTemplateFiles = require('./get-template-files')
const renderTemplate = require('./render-template')
const createFile = require('./create-file')
const {hasYarn, install} = require('./install-deps')

args
  .option('name', 'Name of the basic micro application', 'micro-service')

const parameters = args.parse(process.argv)

const {name} = parameters

createDir(name)
  .then(getTemplateFiles)
  .then(data => renderTemplate(data, parameters))
  .then(data => {
    const promises = data.map(templateData => createFile(templateData, name))
    return Promise.all(promises)
  })
  .then(() => {
    console.log(chalk.green('Created!\n'))
    const projectPath = path.resolve(process.cwd(), name)
    const packageManager = hasYarn() ? 'yarn' : 'npm'

    console.log(chalk.green(`\nInstalling packages using ${packageManager}...`))

    return install(projectPath)
  })
  .then(() => console.log(chalk.green('\nDone!')))
  .catch(err => {
    console.log(chalk.red(`ERROR`))
    console.error(err)
  })
