import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute({ children, ...rest }) {
  // const isAutenticated = useSelector(state => state.isAutenticated)
  return (
    <Route {...rest}>
      {
        // isAutenticated
        //   ? children
        //   : <Redirect to='/' />
      }
    </Route>
  )
}
