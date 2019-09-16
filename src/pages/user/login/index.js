import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './style.module.scss'

@Form.create()
@connect(({ user }) => ({ user }))
class Login extends Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'user/LOGIN',
          payload: values,
        })
      }
    })
  }

  render() {
    const {
      form,
      user: { loading },
    } = this.props
    return (
      <div>
        <Helmet title="Login" />
        <div className={styles.login}>
          <div className={styles.block}>
            <div className="row">
              <div className="col-xl-12">
                <div className={`${styles.inner}`}>
                  <div className={`${styles.form} `}>
                    <div className="">
                      <h4 className="text-uppercase">
                        <div>
                          <img
                            src="resources/imagesMD/logo_claro.png"
                            className="img-fluid"
                            style={{
                              width: '70%',
                            }}
                            alt="DaviPay"
                          />
                        </div>
                      </h4>
                      <br />
                      <Form
                        layout="vertical"
                        className="mb-3"
                        hideRequiredMark
                        onSubmit={this.onSubmit}
                      >
                        <Form.Item label="Correo electrónico">
                          {form.getFieldDecorator('email', {
                            // initialValue: 'admin@mediatec.org',
                            rules: [
                              { required: true, message: 'Porfavor ingrese su correo electrónico' },
                            ],
                          })(<Input size="default" />)}
                        </Form.Item>
                        <Form.Item label="Contraseña">
                          {form.getFieldDecorator('password', {
                            // initialValue: 'cleanui',
                            rules: [{ required: true, message: 'Porfavor ingrese su contraseña' }],
                          })(<Input.Password placeholder="Porfavor ingrese su contraseña" />)}
                        </Form.Item>
                        <Form.Item>
                          {form.getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            // initialValue: true,
                          })(<Checkbox>Recordarme</Checkbox>)}
                          <Link to="/user/forgot" className="utils__link--underlined pull-right">
                            ¿Olvidó su contraseña?
                          </Link>
                        </Form.Item>
                        <Button
                          type="primary"
                          className="width-150 mr-4"
                          htmlType="submit"
                          loading={loading}
                        >
                          Ingresar
                        </Button>
                      </Form>
                      <div>
                        <small
                          style={{
                            display: 'inline-block',
                            lineHeight: 'normal',
                            textAlign: 'justify',
                            color: '#B6B5BB',
                          }}
                        >
                          Mostrando 1 a Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                          do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                          ea commodo consequat. 10 de 634 puntos de venta
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.sideForm}`}>
                    <div style={{ width: '100%' }} className="mb-5">
                      <strong className="text-left" style={{ fontSize: '1.35rem' }}>
                        Bienvenido a MotorDoc
                      </strong>
                    </div>
                    <div className="mb-4 ludwig ludwig--info">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </div>
                    <div className="ludwig ludwig--info">
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                      aliquip ex ea commodo consequat.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
