import React from 'react'
import PropTypes from 'prop-types'

import './NoteCard.css'

class NoteCard extends React.Component {
  render () {
    const { title, text } = this.props
    return (
      <>
        <div className="nc__container">
          <div className="nc__title">{title}</div>
          <div className="nc__preview">{text}</div>
        </div>
      </>
    )
  }
}

NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default NoteCard
