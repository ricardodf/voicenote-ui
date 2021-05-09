import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { LPMODAL } from './LPModalConsts'
import { URL_LOGIN, URL_SIGNUP } from '../../constants/UsersAPI'

import './LPModal.css'

class LPModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formName: '',
      formEmail: '',
      formPassword: ''
    }
    this.backgroundStyle = {
      background: 'url(' + '/images/lpm_bgd.svg' + ')',
      width: '100%',
      margin: 0
    }
  }

  onSubmitLogin () {
    const options = {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.formEmail,
        password: this.state.formPassword
      })
    }
    fetch(URL_LOGIN, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          sessionStorage.setItem('user', JSON.stringify(data))
          this.props.history.push('/home')
        }
      })
  }

  async onSubmitSignup () {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.formName,
        email: this.state.formEmail,
        password: this.state.formPassword
      })
    }
    fetch(URL_SIGNUP, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          sessionStorage.setItem('user', JSON.stringify(data))
          this.props.history.push('/home')
        }
      })
  }

  render () {
    return (
      <>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          backdrop="static"
          centered
        >
          <Modal.Header className="lpm__header">
            <div style={this.backgroundStyle}>
              <Modal.Title
                className="lpm__title"
                id="contained-modal-title-vcenter"
              >
                {this.props.typeModal === 'SIGNUP'
                  ? LPMODAL.SIGNUP
                  : LPMODAL.LOGIN}
              </Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body className="lpm__body">
            <Form className="lpm__form">
              {this.props.typeModal === 'SIGNUP'
                ? (
                <>
                  <Form.Group
                    className="lpm__form-element"
                    controlId="formName"
                  >
                    <Form.Label>
                      {LPMODAL.NAME} {this.state.formName}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      value={this.state.formName}
                      onChange={(e) =>
                        this.setState({ formName: e.target.value })
                      }
                    />
                  </Form.Group>
                </>
                  )
                : null}
              <Form.Group className="lpm__form-element" controlId="formEmail">
                <Form.Label>{LPMODAL.EMAIL}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={this.state.formEmail}
                  onChange={(e) => this.setState({ formEmail: e.target.value })}
                />
              </Form.Group>
              <Form.Group
                className="lpm__form-element"
                controlId="formBasicPassword"
              >
                <Form.Label>{LPMODAL.PASSWORD}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={this.state.formPassword}
                  onChange={(e) =>
                    this.setState({ formPassword: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="lpm__header">
            <div style={this.backgroundStyle}>
              <div className="lpm__footer-btn-group">
                <Button
                  className="lpm__footer-btn"
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault()
                    this.setState({
                      formName: '',
                      formEmail: '',
                      formPassword: ''
                    })
                    this.props.testfunc()
                  }}
                >
                  {LPMODAL.CLOSE}
                </Button>
                {this.props.typeModal === 'SIGNUP'
                  ? (
                  <>
                    <Button
                      className="lpm__footer-btn"
                      variant="success"
                      onClick={(e) => {
                        e.preventDefault()
                        this.onSubmitSignup()
                      }}
                    >
                      {LPMODAL.SUBMIT}
                    </Button>
                  </>
                    )
                  : (
                  <>
                    <Button
                      className="lpm__footer-btn"
                      variant="success"
                      onClick={(e) => {
                        e.preventDefault()
                        this.onSubmitLogin()
                      }}
                    >
                      {LPMODAL.SUBMIT}
                    </Button>
                  </>
                    )}
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

LPModal.propTypes = {
  testfunc: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  typeModal: PropTypes.string.isRequired,
  history: PropTypes.object
}

export default withRouter(LPModal)
