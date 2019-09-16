import React, { Component } from 'react'
import { connect } from 'react-redux'

@connect(({ user }) => ({ user }))
class Login extends Component {
  logout = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'user/LOGOUT',
    })
  }

  render() {
    return <div>Logout {this.logout()}</div>
  }
}

export default Login
