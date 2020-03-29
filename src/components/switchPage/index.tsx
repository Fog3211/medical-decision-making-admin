import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { routeConfigType } from '@config/router.config'
import { CurrentPath } from '@components/index'

export interface SwitchPageProps {
  routes: routeConfigType[]
}

const SwitchPage: React.FC<SwitchPageProps> = (props: SwitchPageProps) => {
  const { routes } = props
  // 渲染路由
  const renderRoute = (list: routeConfigType[] = []) => {
    let result = []
    list.map(item => {
      if (item.redirect) {
        result.push(
          <Redirect key={item.path} to={item.redirect} />
        )
      } else if (item.children) {
        result = result.concat(renderRoute(item.children))
      } else {
        result.push(<Route
          key={item.path}
          path={item.path}
          exact={item.exact}
          render={
            () => (
              <div>
                <CurrentPath routePath={item.path} />
                {/* 组件转UI标签 React.createElement(component, props, ...children) */}
                {React.createElement(item.template)}
              </div>
            )
          }
        />)
      }
    })
    return result
  }

  return (
    <Switch>
      {renderRoute(routes)}
    </Switch>
  )
}

export default SwitchPage 
