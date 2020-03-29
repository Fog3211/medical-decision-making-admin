import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { ConfigProvider } from "antd"
import "normalize.css"
import "antd/dist/antd.less"
import "./index.less"
import zhCN from "antd/es/locale/zh_CN"
import "@config/global.config"

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById("root"))