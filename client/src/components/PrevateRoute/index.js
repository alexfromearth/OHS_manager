import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute({ children, ...rest }) {
  const isAuth = useSelector(state => state.auth.isAuth)
  return (
    <Route {...rest}>
      {
        isAuth
          ? children
          : <Redirect to='/' />
      }
    </Route>
  )
}
