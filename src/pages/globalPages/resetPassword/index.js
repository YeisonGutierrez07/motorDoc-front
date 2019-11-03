/* eslint-disable no-control-regex */

import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { resetPasswordService } from "../../../services/user";

import styles from "./style.module.scss";

@Form.create()
@connect(({ user }) => ({ user }))
class Forgot extends Component {
  state = {
    sendForm: false,
    email: "",
    confirmDirty: "",
    loading: false
  };

  onSubmit = event => {
    event.preventDefault();
    const { form } = this.props;

    form.validateFields((error, values) => {
      if (!error) {
        this.setState({
          loading: true
        });
        const data = {
          actual_password: values.actualPassword,
          password: values.newPassword
        };
        resetPasswordService(data)
          .then(() => {
            this.setState({
              sendForm: true
            });
          })
          .catch(() => {
            form.resetFields();
            this.setState({
              loading: false
            });
          });
      }
    });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("newPassword")) {
      callback("¡Las dos contraseñas que ingresas son inconsistentes!");
    } else {
      callback();
    }
  };

  render() {
    const { form } = this.props;
    const { loading } = this.state;
    const formResetPassword = () => {
      const { sendForm, email } = this.state;
      if (sendForm) {
        return (
          <section>
            <small
              style={{
                display: "inline-block",
                lineHeight: "normal",
                textAlign: "justify",
                fontSize: "unset"
              }}
              className="mb-8"
            >
              <p style={{ color: "silver" }}>{email}</p>
              Tu contraseña ha sido actualizada con éxito...
            </small>
          </section>
        );
      }
      return (
        <section>
          <small
            style={{
              display: "inline-block",
              lineHeight: "normal",
              textAlign: "justify",
              fontSize: "unset"
            }}
            className="mb-12"
          >
            Crea tu nueva contraseña a continuación: <br />
          </small>
          <br />
          <br />
          <Form layout="vertical" onSubmit={this.onSubmit}>
            <Form.Item label="Contraseña actual">
              {form.getFieldDecorator("actualPassword", {
                initialValue: "",
                rules: [
                  {
                    required: true,
                    message: "¡Por favor ingrese la contraseña actual!"
                  }
                ]
              })(
                <Input.Password
                  size="default"
                  placeholder="Contraseña Actual"
                />
              )}
            </Form.Item>
            <Form.Item label="Nueva contraseña">
              {form.getFieldDecorator("newPassword", {
                initialValue: "",
                rules: [
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(
                <Input.Password size="default" placeholder="Nueva contraseña" />
              )}
            </Form.Item>
            <Form.Item label="Confirmar contraseña">
              {form.getFieldDecorator("repeatPassword", {
                initialValue: "",
                rules: [
                  {
                    required: true,
                    message: "Por favor confirme la contraseña correctamente"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input.Password
                  size="default"
                  placeholder="Confirmar contraseña"
                />
              )}
            </Form.Item>
            <div className="">
              <Button
                type="primary"
                className="width-150 mr-4"
                htmlType="submit"
                loading={loading}
              >
                Continuar
              </Button>
            </div>
          </Form>
        </section>
      );
    };
    return (
      <div>
        <Helmet title="Forgot" />
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              <div className={styles.inner}>
                <div className={styles.form}>
                  <h4 className="text-uppercase">
                    <strong>ACTUALIZAR CONTRASEÑA</strong>
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
    );
  }
}

export default Forgot;
