import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

import './NoteModal.css'

class NoteModal extends React.Component {
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
          backdrop="static"
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
          <Modal.Body className="lpm__body">{this.props.text}</Modal.Body>
          <Modal.Footer className="lpm__header">
            <div style={this.backgroundStyle}>
              <div className="lpm__footer-btn-group">
                <Button
                  className="lpm__footer-btn"
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault()
                    this.props.closing()
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

NoteModal.propTypes = {
  closing: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default NoteModal
