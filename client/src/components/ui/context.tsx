import React, { FC, useMemo, useReducer } from 'react'
import { OverlayProvider } from 'react-aria'

export interface UIState {
  displayModal: boolean
  displayAlert: boolean
  alertText: string
}

const intialState: UIState = {
  displayModal: false,
  displayAlert: false,
  alertText: '',
}

type Action =
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'OPEN_ALERT' }
  | { type: 'CLOSE_ALERT' }
  | { type: 'SET_ALERT_TEXT'; text: string }

export const UIContext = React.createContext<UIState | any>(intialState)

UIContext.displayName = 'UIContext'

const uiReducer = (state: UIState, action: Action) => {
  switch (action.type) {
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
      }
    }
    case 'OPEN_ALERT': {
      return {
        ...state,
        displayAlert: true,
      }
    }
    case 'CLOSE_ALERT': {
      return {
        ...state,
        displayAlert: false,
      }
    }
    case 'SET_ALERT_TEXT': {
      return {
        ...state,
        alertText: action.text,
      }
    }
  }
}

export const UIProvider: FC = (props) => {
  const [state, dispatch] = useReducer(uiReducer, intialState)

  const openModal = () => dispatch({ type: 'OPEN_MODAL' })
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' })

  const openAlert = () => dispatch({ type: 'OPEN_ALERT' })
  const closeAlert = () => dispatch({ type: 'CLOSE_ALERT' })

  const value = useMemo(
    () => ({ ...state, openModal, closeModal, openAlert, closeAlert }),
    [state]
  )

  return (
    <OverlayProvider>
      <UIContext.Provider value={value} {...props}></UIContext.Provider>
    </OverlayProvider>
  )
}

export const useUI = () => {
  const context = React.useContext(UIContext)

  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider')
  }

  return context
}
