import React, { createContext, useReducer } from "react"
import { defaultAlfredGlobalState } from './store'
import reducer from './reducer'

export interface GlobalStateStoreProps {
    children: any
}
export const GlobalContext = createContext(null)

const GlobalStateStore: React.FC<GlobalStateStoreProps> = (props) => {
    const [globalState, dispatchGlobalState] = useReducer(reducer, defaultAlfredGlobalState)

    return (
        <GlobalContext.Provider value={{ globalState, dispatchGlobalState }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalStateStore

