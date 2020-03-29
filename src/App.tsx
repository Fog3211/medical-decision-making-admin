import React from "react"
import { HashRouter as Router } from "react-router-dom"
import { BasicLayout } from "@layouts/index"

export interface Props { }

export default (props: Props) => {
  return (
    <Router>
      <BasicLayout />
    </Router>
  )
}
