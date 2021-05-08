import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import './Home.css'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      name: ''
    }
  }

  componentDidMount () {
    if (!localStorage.getItem('user')) {
      this.props.history.push('/')
    } else {
      const jsonData = JSON.parse(localStorage.getItem('user'))
      this.setState({
        id: jsonData.id,
        name: jsonData.name
      })
    }
  }

  render () {
    return (
      <div className="hm__container">
        <h1>This is Home {this.state.name}</h1>
      </div>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object
}

export default withRouter(Home)
