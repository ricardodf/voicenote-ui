import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form } from 'react-bootstrap'

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
                {this.props.title}
              </Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body className="lpm__body">
            <Form className="lpm__form">
              <Form.Group
                className="lpm__form-element"
                controlId="formBasicEmail"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" />
              </Form.Group>
              <Form.Group className="lpm__form-element" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group
                className="lpm__form-element"
                controlId="formBasicPassword"
              >
                <Form.Label>Password</Form.Label>
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
                  Close
                </Button>
                <Button
                  className="lpm__footer-btn"
                  variant="success"
                  onClick={this.props.testfunc}
                >
                  Submit
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
  title: PropTypes.string.isRequired
}

export default LPModal
