import React from "react"
import { HashRouter as Router } from "react-router-dom"
import { BasicLayout } from "@layouts/index"
import { NotFound, Login } from "@pages/index"
import { Switch, Route } from 'react-router-dom'

export interface Props { }

export default (props: Props) => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={BasicLayout} />
        <Route path="/login" component={Login} />
        <Route path="/" component={NotFound} />
      </Switch>
    </Router>
  )
}
