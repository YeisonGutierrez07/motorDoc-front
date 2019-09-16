/* eslint-disable no-control-regex */

import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { resetPassword } from '../../../services/user'

import styles from '../forgot/style.module.scss'

@Form.create()
@connect(({ user }) => ({ user }))
class Forgot extends Component {
  state = {
    sendForm: false,
    email: '',
    confirmDirty: '',
    tokenUser: '',
    loading: false,
  }

  componentDidMount() {
    const { match } = this.props
    this.setState({
      tokenUser: match.params.token,
    })
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props

    const { tokenUser } = this.state
    form.validateFields((error, values) => {
      if (!error) {
        this.setState({
          loading: true,
        })
        const bodyFormData = new FormData()
        bodyFormData.set('identifier', tokenUser)
        bodyFormData.set('password', values.newPassword)
        resetPassword(bodyFormData).then(response => {
          const dataLogin = {
            email: response.data.data.email,
            password: values.newPassword,
          }

          this.setState({
            sendForm: true,
            email: values.email,
            loading: true,
          })

          setTimeout(() => {
            dispatch({
              type: 'user/LOGIN',
              payload: dataLogin,
            })
          }, 3000)
        })
      }
    })
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    const { confirmDirty } = this.state

    const expreg = new RegExp(
      '(?=^.{6,}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[1-9])(?=.*[a-z]).*$',
    )
    if (!expreg.test(value))
      callback(
        '¡Debe tener minimo 6 caracteres, incluida 1 mayúscula, 1 minúscula, 1 número y un carácter especial!',
      )

    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('¡Las dos contraseñas que ingresas son inconsistentes!')
    } else {
      callback()
    }
  }

  render() {
    const { form } = this.props
    const { loading } = this.state
    const formResetPassword = () => {
      const { sendForm, email } = this.state
      if (sendForm) {
        return (
          <section>
            <small
              style={{
                display: 'inline-block',
                lineHeight: 'normal',
                textAlign: 'justify',
                fontSize: 'unset',
              }}
              className="mb-8"
            >
              <img
                style={{ position: 'relative', left: '50%' }}
                src="resources/images/check.png"
                alt="check"
              />{' '}
              <br />
              <br />
              <p style={{ color: 'silver' }}>{email}</p>
              Tu contraseña ha sido actualizada con éxito, en breve te redireccionaremos al
              administrador...
            </small>
          </section>
        )
      }
      return (
        <section>
          <small
            style={{
              display: 'inline-block',
              lineHeight: 'normal',
              textAlign: 'justify',
              fontSize: 'unset',
            }}
            className="mb-12"
          >
            Crea tu nueva contraseña a continuación: <br />
          </small>
          <br />
          <br />
          <Form layout="vertical" onSubmit={this.onSubmit}>
            <Form.Item label="Nueva contraseña">
              {form.getFieldDecorator('newPassword', {
                initialValue: '',
                rules: [
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password size="default" placeholder="Nueva contraseña" />)}
            </Form.Item>
            <Form.Item label="Confirmar contraseña">
              {form.getFieldDecorator('repeatPassword', {
                initialValue: '',
                rules: [
                  { required: true, message: 'Por favor confirme la contraseña correctamente' },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password size="default" placeholder="Confirmar contraseña" />)}
            </Form.Item>
            <div className="">
              <Button type="primary" className="width-150 mr-4" htmlType="submit" loading={loading}>
                Continuar
              </Button>
            </div>
          </Form>
        </section>
      )
    }
    return (
      <div>
        <Helmet title="Forgot" />
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              <div className={styles.inner}>
                <div className={styles.form}>
                  <h4 className="text-uppercase">
                    <div>
                      <img
                        src="resources/images/logo-site.png"
                        className="img-fluid"
                        style={{
                          width: '70%',
                        }}
                        alt="MotorDoc"
                      />
                    </div>
                    <strong>NUEVA CONTRASEÑA</strong>
                  </h4>
                  <br />
                  {formResetPassword()}
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Forgot
