"use strict";

var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var dts = require("dts-bundle");
var rimraf = require("rimraf");
var GenerateJsonPlugin = require("generate-json-webpack-plugin");
var packageJson = {  "version": "1.1.26",}
;
var fs = require("fs");
var replace = require("replace-in-file");

var banner = [
  "surveyjs - Survey JavaScript library v" + packageJson.version,
  "Copyright (c) 2015-2019 Devsoft Baltic OÃœ  - http://surveyjs.io/",
  "License: MIT (http://www.opensource.org/licenses/mit-license.php)"
].join("\n");

// TODO add to dts_bundler
var dts_banner = [
  "Type definitions for Survey JavaScript library v" + packageJson.version,
  "Copyright (c) 2015-2019 Devsoft Baltic OÃœ  - http://surveyjs.io/",
  "Definitions by: Devsoft Baltic OÃœ <https://github.com/surveyjs/>",
  ""
].join("\n");

var platformOptions = {
  vue: {
    externals: {
      vue: {
        root: "Vue",
        commonjs2: "vue",
        commonjs: "vue",
        amd: "vue"
      }
    },
    keywords: ["vue"],
    dependencies: { vue: "^2.1.10" }
  },
  core: {
    externals: {},
    keywords: ["survey", "library"],
    dependencies: {}
  }
};

var optionsFn = function(options) {
  //TODO
  options.platformPrefix =
    options.platform == "knockout" ? "ko" : options.platform;
  var packagePath = "./packages/survey-" + options.platform + "/";
  var mainThemeExtractCss = new ExtractTextPlugin({
    filename:
      packagePath +
      (options.buildType === "prod" ? "survey.min.css" : "survey.css")
  });

  var modernThemeExtractCss = new ExtractTextPlugin({
    filename:
      packagePath + (options.buildType === "prod" ? "modern.min.css" : "modern.css")
  });

  var percentage_handler = function handler(percentage, msg) {
    if (0 === percentage) {
      console.log("Build started... good luck!");
    } else if (1 === percentage) {
      if (options.buildType === "prod") {
        dts.bundle({
          name: "../../survey." + options.platformPrefix,
          main: packagePath + "typings/entries/" + options.platform + ".d.ts",
          outputAsModuleFolder: true,
          headerText: dts_banner
        });

        if (options.platform === "vue") {
          replace(
            {
              files: packagePath + "survey.vue.d.ts",
              from: /export default\s+\w+;/g,
              to: ""
            },
            (error, changes) => {
              if (error) {
                return console.error("Error occurred:", error);
              }
              console.log("Modified files:", changes.join(", "));
            }
          );

          fs
            .createReadStream(packagePath + "survey.vue.js")
            .pipe(fs.createWriteStream(packagePath + "survey-vue.js"));
          fs
            .createReadStream(packagePath + "survey.vue.min.js")
            .pipe(fs.createWriteStream(packagePath + "survey-vue.min.js"));
        }

        rimraf.sync(packagePath + "typings");
        fs
          .createReadStream("./npmREADME.md")
          .pipe(fs.createWriteStream(packagePath + "README.md"));
      }
    }
  };

  var mainFile =
    options.platform === "vue"
      ? "survey-vue.js"
      : "survey." + options.platformPrefix + ".js";
  var packagePlatformJson = {
    name: "survey-" + options.platform,
    version: packageJson.version,
    description:
      "survey-vue.js aouth:sunyy@zkey.cc",
    keywords: ["Survey", "JavaScript", "Bootstrap", "Library"].concat(
      platformOptions[options.platform].keywords
    ),
    homepage: "https://surveyjs.io/",
    license: "MIT",
    files: [
      "survey.css",
      "survey.min.css",
      "modern.css",
      "modern.min.css",
      "survey." + options.platformPrefix + ".d.ts",
      "survey." + options.platformPrefix + ".js",
      "survey." + options.platformPrefix + ".min.js"
    ],
    main: mainFile,
    repository: {
      type: "git",
      url: "https://github.com/surveyjs/surveyjs.git"
    },
    typings: "survey." + options.platformPrefix + ".d.ts"
  };

  if (!!platformOptions[options.platform].dependencies) {
    packagePlatformJson.dependencies =
      platformOptions[options.platform].dependencies;
  }
  if (!!platformOptions[options.platform].peerDependencies) {
    packagePlatformJson.peerDependencies =
      platformOptions[options.platform].peerDependencies;
  }

  var config = {
    entry: {},
    resolve: {
      extensions: [".ts", ".js", ".tsx", ".scss"],
      alias: {
        tslib: path.join(__dirname, "./surveyvue//src/entries/chunks/helpers.ts")
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                declaration: options.buildType === "prod",
                outDir: packagePath + "typings/"
              },
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        },
        {
          test: /\.vue$/,
          use: {
            loader: "vue-loader",
            options: {
              esModule: true
            }
          }
        },
        {
          test: /\.scss$/,
          include: [path.resolve(__dirname, "src/main.scss")],
          use: mainThemeExtractCss.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: options.buildType === "dev",
                  // minimize: options.buildType === "prod",
                  importLoaders: true
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: options.buildType === "dev"
                }
              }
            ]
          })
        },
        {
          test: /\.scss$/,
          include: [path.resolve(__dirname, "src/modern.scss")],
          use: modernThemeExtractCss.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: options.buildType === "dev",
                  // minimize: options.buildType === "prod",
                  importLoaders: true
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: options.buildType === "dev"
                }
              }
            ]
          })
        },
        {
          test: /\.svg/,
          use: { loader: "url-loader" }
        },
        {
          test: /\.html$/,
          use: { loader: "html-loader" }
        }
      ]
    },
    output: {
      filename:
        packagePath +
        "[name]" +
        (options.buildType === "prod" ? ".min" : "") +
        ".js",
      library: "Survey",
      libraryTarget: "umd",
      umdNamedDefine: true
    },
    externals: platformOptions[options.platform].externals,
    plugins: [
      new webpack.ProgressPlugin(percentage_handler),
      new webpack.DefinePlugin({
        "process.env.ENVIRONMENT": JSON.stringify(options.buildType),
        "process.env.VERSION": JSON.stringify(packageJson.version)
      }),
      new webpack.BannerPlugin({
        banner: banner
      }),
      mainThemeExtractCss,
      modernThemeExtractCss
    ],
    devtool: "inline-source-map"
  };

  if (options.buildType === "prod") {
    config.devtool = false;
    config.plugins = config.plugins.concat([
      new GenerateJsonPlugin(
        packagePath + "package.json",
        packagePlatformJson,
        undefined,
        2
      )
    ]);
  }

  if (options.buildType === "dev") {
    config.plugins = config.plugins.concat([
      new webpack.LoaderOptionsPlugin({ debug: true })
    ]);
  }

  config.entry[
    "survey." + (options.platform == "knockout" ? "ko" : options.platform)
  ] = path.resolve(__dirname, "./surveyvue/src/entries/" + options.platform);

  return config;
};
var options={
  //入口文件的配置项
entry:{
  //里面的entery是可以随便写的
  entry:'./surveyvue/examples/vue/index.js'
},
//出口文件的配置项
output:{
  //打包的路径
  path:path.resolve(__dirname,'/surveyvue/dist'),
  //打包的文件名称
  filename:'bundle.js'
  
},
}
module.exports = (api, projectOptions) => {
  api.registerCommand('survey', {
  	description: 'survey-vue build',
  	usage: 'vue-cli-service serve',
  	options: {}
  }, (args) => {
    // 输出传入的参数
    //  console.log( optionsFn({"platform":"vue","buildType":"prod"}))
     console.log(api.resolveChainableWebpackConfig().watch())
    // projectOptions 拿到的是 vue.config.js 文件暴露出来的配置
    //  console.log(projectOptions.pluginOptions)
  })
}
// module.exports = (api, projectOptions) => {
//   api.registerCommand('survey', args => {
//     const configA = api.resolveChainableWebpackConfig()
//     const configB = api.resolveChainableWebpackConfig()
//    console.log(args)
//     // 针对不同的目的链式修改 `configA` 和 `configB`...
  
//     const finalConfigA = configA.toConfig()
//     const finalConfigB = configB.toConfig()
//     return configA
//   },
//   (args) => {
//      // 输出传入的参数
//       console.log( optionsFn({"platform":"vue","buildType":"prod"}))
//      //  console.log(args)
//      // projectOptions 拿到的是 vue.config.js 文件暴露出来的配置
//      //  console.log(projectOptions.pluginOptions)
//    })
// }