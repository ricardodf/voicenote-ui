import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'

function App () {
  return (
    <>
      <Router basename={process.env.REACT_APP_FILE_ROOT}>
        <Switch>
          <Route component={LandingPage} exact path="/" />
          <Route component={Home} exact path="/home" />
        </Switch>
      </Router>
    </>
  )
}

export default App
