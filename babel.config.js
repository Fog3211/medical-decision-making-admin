'use strict'

module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "corejs": 3
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-class-properties",
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": true
      }
    ],
    // [
    //   "babel-plugin-import",
    //   {
    //     "libraryName": "bizcharts",
    //     "customName": (name) => {
    //       const bizchartsTypedGeoms = [
    //         "Area",
    //         "Edge",
    //         "Heatmap",
    //         "Interval",
    //         "Line",
    //         "Path",
    //         "Point",
    //         "Polygon",
    //         "Schema",
    //         "Venn"
    //       ]
    //       if (bizchartsTypedGeoms.some(i => i === name)) {
    //         return `bizcharts/es6/components/TypedGeom/${name}`
    //       }
    //       return `bizcharts/es6/components/${name
    //       }`
    //     },
    //     "style": false,
    //     "camel2DashComponentName": false,
    //   },
    //   "import-for-bizcharts",
    // ],
  ]
}
