import React, { useEffect, useContext } from "react"
import { HashRouter as Router } from "react-router-dom"
import { BasicLayout } from "@layouts/index"
import { Switch, Route, Redirect } from 'react-router-dom'
import { GlobalContext } from '@store/index'
import { Login } from "@pages/index"

export interface Props { }

export default (props: Props) => {
  const { globalState } = useContext(GlobalContext)
  const { isLogin } = globalState

  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        {
          isLogin && <Route path='/' component={BasicLayout} />
        }
        <Redirect to='/login' />
      </Switch>
    </Router>
  )
}
