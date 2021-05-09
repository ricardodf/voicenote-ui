/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Button, Navbar, Form, Alert, Dropdown } from 'react-bootstrap'
import {
  BsFillFolderFill,
  BsFileText,
  BsBoxArrowInUp,
  BsFillChatDotsFill
} from 'react-icons/bs'

import NoteCard from './NoteCard/NoteCard'

import './Home.css'
import { HM, LANGUAGES } from './HomeConsts'
import {
  URL_GET_USER_NOTES,
  URL_NEW_NOTES,
  URL_TRANSLATE
} from '../constants/UsersAPI'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      userNotes: [],
      menuView: HM.ALL_NOTES,
      newNoteTitle: '',
      newNoteText: '',
      translateInputNote: null,
      translateInputLang: null,
      translateOutputTitle: null,
      translateOutputText: null,
      alertNewNoteSuccess: false,
      alertNewTranslateNoteSuccess: false
    }
  }

  onLogout () {
    sessionStorage.removeItem('user')
    this.props.history.push('/')
  }

  onMenuClick (e, menuView) {
    switch (menuView) {
      case HM.ALL_NOTES:
        this.setState({ menuView: HM.ALL_NOTES })
        break
      case HM.NEW_NOTE:
        this.setState({ menuView: HM.NEW_NOTE })
        break
      case HM.IMPORT_AUDIO:
        this.setState({ menuView: HM.IMPORT_AUDIO })
        break
      case HM.TRANSLATE:
        this.setState({ menuView: HM.TRANSLATE })
        break
      default:
        this.setState({ menuView: HM.ALL_NOTES })
    }
  }

  onSubmitNewNote () {
    const options = {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.state.user.id,
        title: this.state.newNoteTitle,
        text: this.state.newNoteText
      })
    }
    fetch(URL_NEW_NOTES, options)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ alertNewNoteSuccess: true })
        this.getUserNotes(this.state.user.id)
      })
  }

  onSubmitTranslateNewNote () {
    const options = {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.state.user.id,
        title: this.state.translateOutputTitle,
        text: this.state.translateOutputText
      })
    }
    fetch(URL_NEW_NOTES, options)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          translateOutputTitle: null,
          translateOutputText: null,
          alertNewTranslateNoteSuccess: true
        })
        this.getUserNotes(this.state.user.id)
      })
  }

  getUserNotes (userId) {
    const options = {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId
      })
    }
    fetch(URL_GET_USER_NOTES, options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data)
          this.setState({ userNotes: data })
        } else this.setState({ menuView: HM.ERROR })
      })
  }

  translateTitle () {
    const { translateInputNote, translateInputLang } = this.state
    const options = {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: translateInputNote.title,
        target: translateInputLang.value
      })
    }
    fetch(URL_TRANSLATE, options)
      .then((res) => res.text())
      .then((data) => {
        this.setState({ translateOutputTitle: data })
        this.translateText()
      })
  }

  translateText () {
    const { translateInputNote, translateInputLang } = this.state
    const options = {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: translateInputNote.text,
        target: translateInputLang.value
      })
    }
    fetch(URL_TRANSLATE, options)
      .then((res) => res.text())
      .then((data) => {
        this.setState({ translateOutputText: data })
      })
  }

  componentDidMount () {
    if (!sessionStorage.getItem('user')) {
      this.props.history.push('/')
    } else {
      const jsonData = JSON.parse(sessionStorage.getItem('user'))
      const user = {
        id: jsonData.id,
        name: jsonData.name,
        audios: jsonData.audios
      }
      this.setState({ user })
      this.getUserNotes(jsonData.id)
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
          <div className="hm__left">
            <div className="hm__left-container">
              <div
                className="hm__left-item"
                onClick={(e) => {
                  e.preventDefault()
                  this.onMenuClick(e, HM.ALL_NOTES)
                }}
              >
                <BsFillFolderFill size={30} />
                <div className="hm__left-item-text">{HM.ALL_NOTES}</div>
              </div>
              <div
                className="hm__left-item"
                onClick={(e) => {
                  e.preventDefault()
                  this.onMenuClick(e, HM.NEW_NOTE)
                }}
              >
                <BsFileText size={30} />
                <div className="hm__left-item-text">{HM.NEW_NOTE}</div>
              </div>
              <div
                className="hm__left-item"
                onClick={(e) => {
                  e.preventDefault()
                  this.onMenuClick(e, HM.IMPORT_AUDIO)
                }}
              >
                <BsBoxArrowInUp size={30} />
                <div className="hm__left-item-text">{HM.IMPORT_AUDIO}</div>
              </div>
              <div
                className="hm__left-item"
                onClick={(e) => {
                  e.preventDefault()
                  this.onMenuClick(e, HM.TRANSLATE)
                }}
              >
                <BsFillChatDotsFill size={30} />
                <div className="hm__left-item-text">{HM.TRANSLATE}</div>
              </div>
            </div>
          </div>
          <div className="hm__right">
            <div className="hm__right-container">
              <div className="hm__right-menuView">
                {this.state.menuView === HM.ALL_NOTES ? (
                  <div className="hm__all-notes">
                    <div className="hm__menuView-title">{HM.ALL_NOTES}</div>
                    <div className="hm__all-notes-main">
                      {this.state.userNotes.map((note, index) => {
                        return (
                          <NoteCard
                            key={index}
                            title={note.title}
                            text={note.text}
                          />
                        )
                      })}
                    </div>
                  </div>
                ) : this.state.menuView === HM.NEW_NOTE ? (
                  <div className="hm__new-note">
                    <div className="hm__menuView-title">{HM.NEW_NOTE}</div>
                    <div className="hm__form">
                      <Form>
                        <Form.Group
                          className="hm__form-item"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Title"
                            value={this.state.newNoteTitle}
                            onChange={(e) =>
                              this.setState({ newNoteTitle: e.target.value })
                            }
                          />
                        </Form.Group>
                        <Form.Group
                          className="hm__form-item"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Content</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={6}
                            value={this.state.newNoteText}
                            onChange={(e) =>
                              this.setState({ newNoteText: e.target.value })
                            }
                          />
                        </Form.Group>
                      </Form>
                      <div className="hm__form-btn">
                        <Button
                          variant="outline-success"
                          onClick={(e) => {
                            e.preventDefault()
                            this.setState({
                              newNoteTitle: '',
                              newNoteText: ''
                            })
                            this.onSubmitNewNote()
                          }}
                        >
                          Create Note
                        </Button>
                      </div>
                      <Alert
                        show={this.state.alertNewNoteSuccess}
                        variant="success"
                      >
                        <Alert.Heading>
                          <div className="hm__form-alert">
                            <p>Success!</p>
                            <Button
                              variant="success"
                              onClick={() =>
                                this.setState({ alertNewNoteSuccess: false })
                              }
                            >
                              Close
                            </Button>
                          </div>
                        </Alert.Heading>
                        <p>The note was created succesfully</p>
                      </Alert>
                    </div>
                  </div>
                ) : this.state.menuView === HM.IMPORT_AUDIO ? (
                  <div>
                    <div className="hm__menuView-title">{HM.IMPORT_AUDIO}</div>
                    <div>
                      <Form>
                        <Form.Group>
                          <Form.File
                            id="exampleFormControlFile1"
                            label="Example file input"
                            onInput={(e) => {
                              console.log(e)
                            }}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                  </div>
                ) : this.state.menuView === HM.TRANSLATE ? (
                  <div className="hm__trans">
                    <div className="hm__menuView-title">{HM.TRANSLATE}</div>
                    <div className="hm__trans-container">
                      <div className="hm__trans-note">
                        <div className="hm__title">
                          Select a note to translate
                        </div>
                        <Dropdown>
                          <Dropdown.Toggle
                            className="hm__dropdown"
                            id="dropdown-basic"
                          >
                            {this.state.translateInputNote
                              ? this.state.translateInputNote.title
                              : 'Notes'}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {this.state.userNotes.map((note, index) => {
                              return (
                                <Dropdown.Item
                                  key={index}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    this.setState({ translateInputNote: note })
                                  }}
                                >
                                  {note.title}
                                </Dropdown.Item>
                              )
                            })}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="hm__trans-note">
                        <div className="hm__title">Select a language</div>
                        <Dropdown>
                          <Dropdown.Toggle
                            className="hm__dropdown"
                            id="dropdown-basic"
                          >
                            {this.state.translateInputLang
                              ? this.state.translateInputLang.name
                              : 'Languages'}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {LANGUAGES.map((language, index) => {
                              return (
                                <Dropdown.Item
                                  key={index}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    this.setState({
                                      translateInputLang: language
                                    })
                                  }}
                                >
                                  {language.name}
                                </Dropdown.Item>
                              )
                            })}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="hm__trans-btn">
                        <Button
                          className="hm__trans-btn-text"
                          variant="success"
                          disabled={
                            !this.state.translateInputLang &&
                            !this.setState.translateInputNote
                          }
                          onClick={(e) => {
                            e.preventDefault()
                            this.translateTitle()
                          }}
                        >
                          Translate
                        </Button>
                      </div>
                    </div>
                    {this.state.translateOutputTitle &&
                    this.state.translateOutputText ? (
                      <div className="hm__new-note">
                        <div className="hm__form">
                          <Form>
                            <Form.Group
                              className="hm__form-item"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Label>Title</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Title"
                                value={this.state.translateOutputTitle}
                                onChange={(e) =>
                                  this.setState({
                                    translateOutputTitle: e.target.value
                                  })
                                }
                                disabled
                              />
                            </Form.Group>
                            <Form.Group
                              className="hm__form-item"
                              controlId="exampleForm.ControlTextarea1"
                            >
                              <Form.Label>Content</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={6}
                                value={this.state.translateOutputText}
                                onChange={(e) =>
                                  this.setState({
                                    translateOutputText: e.target.value
                                  })
                                }
                                disabled
                              />
                            </Form.Group>
                          </Form>
                          <div className="hm__form-btn">
                            <Button
                              variant="outline-success"
                              onClick={(e) => {
                                e.preventDefault()
                                this.setState({
                                  translateInputNote: null,
                                  translateInputLang: null
                                })
                                this.onSubmitTranslateNewNote()
                              }}
                            >
                              Create Note
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <Alert
                      show={this.state.alertNewTranslateNoteSuccess}
                      variant="success"
                    >
                      <Alert.Heading>
                        <div className="hm__form-alert">
                          <p>Success!</p>
                          <Button
                            variant="success"
                            onClick={() =>
                              this.setState({
                                alertNewTranslateNoteSuccess: false
                              })
                            }
                          >
                            Close
                          </Button>
                        </div>
                      </Alert.Heading>
                      <p>The note was created succesfully</p>
                    </Alert>
                  </div>
                ) : this.state.menuView === HM.NO_NOTES ? (
                  <div>{HM.NO_NOTES}</div>
                ) : (
                  <div>{HM.ERROR}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object
}

export default withRouter(Home)
