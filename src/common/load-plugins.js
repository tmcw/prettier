"use strict";

const resolve = require("resolve");
const readPkgUp = require("read-pkg-up");

function loadPlugins(plugins, internalPlugins) {
  plugins = plugins || [];

  const externalPlugins = plugins
    .concat(
      getPluginsFromPackage(
        readPkgUp.sync({
          normalize: false
        }).pkg
      )
    )
    .map(plugin => {
      if (typeof plugin !== "string") {
        return plugin;
      }

      const pluginPath = resolve.sync(plugin, { basedir: process.cwd() });
      return Object.assign({ name: plugin }, eval("require")(pluginPath));
    });

  return deduplicate(internalPlugins.concat(externalPlugins));
}

function getPluginsFromPackage(pkg) {
  if (!pkg) {
    return [];
  }
  const deps = Object.assign({}, pkg.dependencies, pkg.devDependencies);
  return Object.keys(deps).filter(
    dep =>
      dep.startsWith("prettier-plugin-") || dep.startsWith("@prettier/plugin-")
  );
}

function deduplicate(items) {
  const uniqItems = [];
  for (const item of items) {
    if (uniqItems.indexOf(item) < 0) {
      uniqItems.push(item);
    }
  }
  return uniqItems;
}

module.exports = loadPlugins;
