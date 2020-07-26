const path = require("path");
const cdnDependencies = require("./dependencies-cdn");
const BuildAppJSPlugin = require("./buildAppJSPlugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const { set } = require("lodash");

function resolve(dir) {
  return path.join(__dirname, dir);
}

//environment variables
process.env.VUE_APP_VERSION = require("./package.json").version;
process.env.VUE_APP_G2INDEX_VERSION = require("./package.json").g2index;

process.env.VUE_APP_CDN_PATH =
  process.env.VUE_APP_CDN_PATH.replace(
    "@master",
    "@v" + process.env.VUE_APP_VERSION
  ) || "/";

// Basic path Note that you must modify this before publishing
let publicPath = process.env.VUE_APP_CDN_PATH || "/";
let cdnPath = process.env.VUE_APP_CDN_PATH;
const isProd = process.env.NODE_ENV === "production";

// Set up libraries not involved in the build
let externals = {};
cdnDependencies.forEach((item) => {
  externals[item.name] = item.library;
});

// CDN link to import file
const cdn = {
  css: cdnDependencies.map((e) => e.css).filter((e) => e),
  js: cdnDependencies.map((e) => e.js).filter((e) => e),
};
module.exports = {
  publicPath,
  lintOnSave: true,
  css: {
    loaderOptions: {
      // Set scss public variable file
      sass: {
        prependData: `$cdnPath: "${isProd ? cdnPath : "/"}";`,
      },
    },
  },
  configureWebpack: (config) => {
    const configNew = {};
    if (isProd) {
      configNew.externals = externals;
      configNew.plugins = [
        // gzip
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false,
        }),
      ];
    }
    return configNew;
  },

  chainWebpack: (config) => {
    config.plugin("BuildAppJSPlugin").use(BuildAppJSPlugin);
    /**
     * // Solve vue cli3 hot update failure https://github.com/vuejs/vue-cli/issues/1559
     */
    config.plugin("html").tap((options) => {
      if (isProd) {
        set(options, "[0].cdn", cdn);
      } else {
        set(options, "[0].cdn", {
          js: cdnDependencies.filter((e) => e.name === "").map((e) => e.js),
          css: cdnDependencies.filter((e) => e.name === "").map((e) => e.css),
        });
      }
      set(options, "[0].inject", false);
      return options;
    });
    /**
     * Delete the prefetch preload of the lazy loading module to reduce bandwidth pressure
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * And the prefetch tag generated during pre-rendering is the modern version, which is not needed for lower version browsers
     */
    if (isProd) {
      config.plugins.delete("prefetch").delete("preload");
    }
    // Solve cli3 hot update failure https://github.com/vuejs/vue-cli/issues/1559
    config.resolve.symlinks(true);
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@utils", resolve("src/utils"))
      .set("@api", resolve("src/api"))
      .set("@node_modules", resolve("node_modules"));

    // analyzing tool
    if (process.env.npm_config_report) {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
  },

// Do not output map files
  productionSourceMap: false,

  devServer: {
    publicPath,
    proxy: {
      "/api": {
        target: "https://ossdev.achirou.workers.dev/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },

  pluginOptions: {
    i18n: {
      locale: "hn",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
    },
  },
};
