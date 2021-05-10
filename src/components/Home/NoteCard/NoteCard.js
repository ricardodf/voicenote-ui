import React from 'react'
import PropTypes from 'prop-types'

import './NoteCard.css'
import NoteModal from '../NoteModal/NoteModal'

class NoteCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showNoteModal: false
    }
  }

  render () {
    const { title, text } = this.props
    return (
      <>
        <div
          className="nc__container"
          onClick={() => this.setState({ showNoteModal: true })}
        >
          <div className="nc__title">{title}</div>
          <div className="nc__preview">{text}</div>
        </div>
        <NoteModal
          title={title}
          text={text}
          closing={() => this.setState({ showNoteModal: false })}
          onHide={() => this.setState({ showNoteModal: false })}
          show={this.state.showNoteModal}
        />
      </>
    )
  }
}

NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default NoteCard
