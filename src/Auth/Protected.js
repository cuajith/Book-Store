import React from 'react'
import {Route} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
 
const ProtectedRouter = ({ component,...rest})=> {
   
let RenderComponents = component;
  return (
      <Route 
      {...rest}
      render = {props => {
          return true ? (
              <RenderComponents {...props} />
          ) : (
              <Redirect to = {{
                  pathname : './login'
              }} />
          )
            }
      }
      />
  )
}

export default ProtectedRouter