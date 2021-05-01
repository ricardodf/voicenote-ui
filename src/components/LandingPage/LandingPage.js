import React from 'react'
import { Button, Navbar } from 'react-bootstrap'
import { LP } from './LandingPageConsts'
import LPModal from './LPModal/LPModal'
import './LandingPage.css'

class LandingPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showSignUpModal: false
    }
  }

  render () {
    return (
      <>
        <div className="lp__container">
          <Navbar className="lp__nav" expand="lg">
            <div className="lp__nav-main">
              <img
                className="lp__nav-img"
                src={'/images/navbar-icon.png'}
                alt=""
              />
              <Navbar.Brand className="lp__nav-title">
                {LP.NAV_TITLE} PROD
              </Navbar.Brand>
            </div>
          </Navbar>
          <div className="lp__main">
            <div className="lp__left">
              <div className="lp__text">{LP.LEFT_TEXT}</div>
              <div className="lp__btn-group">
                <Button
                  className="lp__btn btn-account"
                  onClick={() => this.setState({ showSignUpModal: true })}
                >
                  {LP.NEW_ACCOUNT}
                </Button>
                <hr className="lp__division" />
                <Button className="lp__btn btn-login">{LP.LOG_IN}</Button>
              </div>
            </div>
            <div className="lp__right">
              <img
                className="lp__back-svg"
                src="/images/topography.svg"
                alt=""
              />
              <div className="lp__front-svg-container">
                <img
                  className="lp__front-svg"
                  src="/images/front-img.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <LPModal
          show={this.state.showSignUpModal}
          onHide={() => this.setState({ showSignUpModal: false })}
          title="Sign Up"
          testfunc={() => this.setState({ showSignUpModal: false })}
        />
      </>
    )
  }
}

export default LandingPage
