import React, { Component } from "react";
import { Form, Row, Button, Col, Popconfirm, Input, Icon } from "antd";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import RegisterUser from "components/GobalComponents/Forms/registerUser";
import styles from "./style.module.scss";
import { createNewUser } from "../../../services/user";
import { referenciaFirebase } from "../../../services/firebase";

const FormItem = Form.Item;

@Form.create()
@connect(({ user }) => ({ user }))
class CreateUser extends Component {
  state = {
    profilePic: "",
    user: {},
    valuesOK: false
  };

  saveData = () => {
    const { form } = this.props;
    const { profilePic, user } = this.state;
    form.validateFields((error, values) => {
      if (!error) {
        user.address = values.address;
        user.credential = values.credential;
        user.email = values.email;
        user.last_name = values.lastName;
        user.mobile_phone = values.mobile_phone;
        user.name = values.name;
        user.profile_pic = profilePic;
        this.setState({
          valuesOK: true,
          user
        });
      }
    });
  };

  sendToServer = () => {
    const { form, history } = this.props;
    const { user } = this.state;
    form.validateFields((error, values) => {
      if (!error) {
        user.password = values.newPassword;
        user.role = "CLIENT";
        createNewUser(user).then(response => {
          referenciaFirebase.ref(`clients/`).push({
            id_user: response.id,
            name: user.name,
            photo: user.profile_pic
          });
          history.push("/user/login");
        });
      }
    });
  };

  saveImage = base64 => {
    this.setState({
      profilePic: base64
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("newPassword")) {
      callback("¡Las dos contraseñas que ingresas son inconsistentes!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { form } = this.props;
    const { valuesOK } = this.state;
    const pedirContraseña = () => {
      if (valuesOK) {
        return (
          <>
            <h4 className="text-uppercase">
              <strong>Crear contraseña</strong>
            </h4>
            <Row gutter={20}>
              <Col md={12} xs={24}>
                <FormItem label="Contraseña">
                  {form.getFieldDecorator("newPassword", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor ingrese una contraseña"
                      },
                      {
                        validator: this.validateToNextPassword
                      }
                    ]
                  })(
                    <Input
                      size="default"
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                    />
                  )}
                </FormItem>
              </Col>
              <Col md={12} xs={24}>
                <FormItem label="Repita la Contraseña">
                  {form.getFieldDecorator("RepeatPassword", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor repita la contraseña"
                      },
                      { validator: this.compareToFirstPassword }
                    ]
                  })(
                    <Input
                      size="default"
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </>
        );
      }
      return (
        <Row gutter={20}>
          <Col xs={24}>
            <div className="card">
              <div className="card-body">
                <RegisterUser
                  title="Hola, bienvenido a motorDoc."
                  formItemLayout={{}}
                  form={form}
                  saveImage={this.saveImage}
                />
              </div>
            </div>
          </Col>
        </Row>
      );
    };
    const buttonReturn = () => {
      if (valuesOK) {
        return (
          <>
            <Button
              onClick={() => this.setState({ valuesOK: false })}
              className="utils__link--underlined"
            >
              Volver
            </Button>
            &nbsp;&nbsp;
            <Popconfirm
              title="¿Esta seguro de registrase?"
              onConfirm={() => this.sendToServer()}
              okText="Si"
              cancelText="No"
            >
              <Button type="primary">
                {valuesOK ? "Registrarse" : "Continuar"}
              </Button>
            </Popconfirm>
          </>
        );
      }
      return (
        <div align="center">
          <Popconfirm
            title="¿Esta seguro de que los datos son reales?"
            onConfirm={() => this.saveData()}
            okText="Si"
            cancelText="No"
          >
            <Button type="primary">
              {valuesOK ? "Registrarse" : "Continuar"}
            </Button>
          </Popconfirm>
        </div>
      );
    };
    return (
      <div>
        <Helmet title="Crear Cuenta" />
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              <div className={styles.inner}>
                <div className={styles.form}>
                  <p className={styles.titleLogo}>MotorDoc</p>
                  <h4 className="text-uppercase">
                    <strong>Crear Cuenta</strong>
                  </h4>
                  <br />
                  <section>
                    <div className="card">
                      <div className="card-body">
                        {pedirContraseña()}
                        <div align="center">{buttonReturn()}</div>
                      </div>
                    </div>
                  </section>
                  <br />
                  <Link to="/user/login" className="utils__link--underlined">
                    Regresar a login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUser;
