import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { requestResetPassword } from '../../../services/user'

import styles from './style.module.scss'

@Form.create()
@connect(({ user }) => ({ user }))
class Forgot extends Component {
  state = {
    sendForm: false,
    email: '',
  }

  onSubmit = event => {
    event.preventDefault()
    const { form } = this.props

    form.validateFields((error, values) => {
      if (!error) {
        requestResetPassword(values.email)
          .then(() => {
            console.log('email')
            this.setState({
              sendForm: true,
              email: values.email,
            })
          })
          .catch(() => {
            console.log('ERROR')
          })
      }
    })
  }

  render() {
    const { form } = this.props
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
              Hemos enviado un enlace de recuperación de contraseña a tu correo electronico <br />
              <br />
              <p style={{ color: 'silver' }}>{email}</p>
              El mensaje puede tardar unos minutos en llegar a tu bandeja de entrada; recuerda
              revisar en bandeja de correos no deseados.
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
            className="mb-8"
          >
            Ingresa a continuación el correo electrónico registrado en el motorDoc
            para recuperar tu contraseña.
          </small>
          <br />
          <br />
          <Form layout="vertical" onSubmit={this.onSubmit}>
            <Form.Item label="Correo electrónico">
              {form.getFieldDecorator('email', {
                initialValue: '',
                rules: [{ required: true, message: 'Por favor ingrese el correo electrónico' }],
              })(<Input size="default" placeholder="Correo electrónico" />)}
            </Form.Item>
            <div className="">
              <Button type="primary" className="width-150 mr-4" htmlType="submit" loading={false}>
                Enviar
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
                  <p className={styles.titleLogo}>MotorDoc</p>
                  <h4 className="text-uppercase">
                    <strong>OLVIDÉ MI CONTRASEÑA</strong>
                  </h4>
                  <br />
                  {formResetPassword()}
                  <br />
                  <Link to="/user/login" className="utils__link--underlined">
                    Volver
                  </Link>
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
