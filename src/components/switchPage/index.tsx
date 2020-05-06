import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { routeConfigType } from '@config/router.config'
import { CurrentPath } from '@components/index'
import { GET_ROUTES_BY_AUTH } from '@config/api.config'
import { fetchData } from '@utils/index'

export interface SwitchPageProps {
  routes: routeConfigType[]
}

const SwitchPage: React.FC<SwitchPageProps> = (props) => {
  const { routes } = props

  const [routeKeys, setRouteKeys] = useState<string[]>([])

  // 渲染路由
  const renderRoute = (list: routeConfigType[] = []) => {
    let result = []
    list.map(item => {
      if (item.children) {
        result = result.concat(renderRoute(item.children))
      } else if (!item.redirect && routeKeys.includes(item.path)) {
        result.push(<Route
          key={item.path}
          path={item.path}
          exact={item.exact}
          render={
            () => (
              <div>
                {!item.noBread && <CurrentPath routePath={item.path} />}
                {React.createElement(item.template)}
              </div>
            )
          }
        />)
      } else {
        result.push(
          <Redirect key={item.path} to={item.redirect || '/404'} />
        )
      }
    })
    return result
  }
  // 根据权限获取是否有路由权限
  const getRouteByAuth = () => {
    fetchData({
      url: GET_ROUTES_BY_AUTH
    }).then(res => {
      setRouteKeys(res.result)
    })
  }

  useEffect(() => {
    getRouteByAuth()
  }, [])


  return (
    <Switch >
      {renderRoute(routes)}
    </Switch>
  )
}

export default SwitchPage 
