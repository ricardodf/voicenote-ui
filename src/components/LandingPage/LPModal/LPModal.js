import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form } from 'react-bootstrap'
import { LPMODAL } from './LPModalConsts'

import './LPModal.css'

class LPModal extends React.Component {
  constructor (props) {
    super(props)
    this.backgroundStyle = {
      background: 'url(' + '/images/lpm_bgd.svg' + ')',
      width: '100%',
      margin: 0
    }
  }

  render () {
    return (
      <>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
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
                    <Form.Label>{LPMODAL.NAME}</Form.Label>
                    <Form.Control type="text" placeholder="Name" />
                  </Form.Group>
                </>
                  )
                : null}
              <Form.Group className="lpm__form-element" controlId="formEmail">
                <Form.Label>{LPMODAL.EMAIL}</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group
                className="lpm__form-element"
                controlId="formBasicPassword"
              >
                <Form.Label>{LPMODAL.PASSWORD}</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="lpm__header">
            <div style={this.backgroundStyle}>
              <div className="lpm__footer-btn-group">
                <Button
                  className="lpm__footer-btn"
                  variant="secondary"
                  onClick={this.props.testfunc}
                >
                  {LPMODAL.CLOSE}
                </Button>
                <Button
                  className="lpm__footer-btn"
                  variant="success"
                  onClick={this.props.testfunc}
                >
                  {LPMODAL.SUBMIT}
                </Button>
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
  typeModal: PropTypes.string.isRequired
}

export default LPModal
