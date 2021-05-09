import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Button, Navbar } from 'react-bootstrap'

import './Home.css'
import { HM } from './HomeConsts'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      audios: 0
    }
  }

  onLogout () {
    localStorage.removeItem('user')
    this.props.history.push('/')
  }

  componentDidMount () {
    if (!localStorage.getItem('user')) {
      this.props.history.push('/')
    } else {
      const jsonData = JSON.parse(localStorage.getItem('user'))
      this.setState({
        id: jsonData.id,
        name: jsonData.name,
        audios: jsonData.audios
      })
    }
  }

  render () {
    return (
      <div className="hm__container">
        <Navbar className="hm__nav" expand="lg">
          <div className="hm__nav-main">
            <img
              className="hm__nav-img"
              src={'/images/navbar-icon.png'}
              alt=""
            />
            <Navbar.Brand className="hm__nav-title">
              {HM.NAV_TITLE}
            </Navbar.Brand>
          </div>
          <div className="hm__nav-logout">
            <Button
              variant="outline-dark"
              onClick={(e) => {
                e.preventDefault()
                this.onLogout()
              }}
            >
              {HM.NAV_LOGOUT}
            </Button>
          </div>
        </Navbar>
        <div className="hm__main">
          <div className="hm__left">SIDE MENU</div>
          <div className="hm__right">CONTENT VIEW</div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object
}

export default withRouter(Home)
