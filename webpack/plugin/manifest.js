const path = require("path")
const { WebpackManifestPlugin } = require("webpack-manifest-plugin")

const utils = require("./utils")
const config = utils.getConfig()

const getManifestPath = name => {
  return path.resolve(path.join(config.manifestDir, `one-click-manifest.${name}.json`))
}

const getPlugin = theme => {
  return new WebpackManifestPlugin({
    fileName: getManifestPath(theme),
    filter: fd => /\.(js|css)$/.test(fd.path),
    generate: (seed, files) => {
      const widgetConfig = files.reduce((manifest, fd) => {
        const ext = path.extname(fd.name)
        const type = ext.substr(1)
        return { ...manifest, [type]: fd.path }
      }, {})

      return { ...seed, "one-click": widgetConfig }
    },
  })
}

module.exports = theme => [getPlugin(theme)]
