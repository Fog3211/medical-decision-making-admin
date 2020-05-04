import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { ConfigProvider } from "antd"
import zhCN from "antd/es/locale/zh_CN"
import GlobalStateProvider from '@store/index'
import "@config/global.config"
import "normalize.css"
import "antd/dist/antd.less"
import "./index.less"

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </ConfigProvider>,
  document.getElementById("root"))