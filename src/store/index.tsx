import React, { createContext, useReducer } from "react"
import { defaultAlfredGlobalState } from './store'
import reducer from './reducer'

export interface GlobalStateProviderProps {
    children: any
}
export const GlobalContext = createContext(null)

const GlobalStateProvider: React.FC<GlobalStateProviderProps> = (props) => {
    const [globalState, dispatchGlobalState] = useReducer(reducer, defaultAlfredGlobalState)

    return (
        <GlobalContext.Provider value={{ globalState, dispatchGlobalState }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalStateProvider

