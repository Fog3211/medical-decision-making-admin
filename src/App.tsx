import React, { useEffect } from "react"
// import { BrowserRouter as Router } from "react-router-dom"
import { HashRouter as Router } from "react-router-dom"
import { BasicLayout } from "@layouts/index"
import { Switch, Route } from 'react-router-dom'
import { Login } from "@pages/index"


export interface Props { }

export default (props: Props) => {
  const checkUserAuth = () => {

  }
  useEffect(() => {
    checkUserAuth()
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path='/' component={BasicLayout} />
      </Switch>
    </Router>
  )
}
