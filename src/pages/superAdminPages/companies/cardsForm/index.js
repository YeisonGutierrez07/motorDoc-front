/* eslint-disable import/no-named-as-default */
import React from "react";
import { Helmet } from "react-helmet";
import Authorize from "components/LayoutComponents/Authorize";
import { Form, Card, Button, Popconfirm } from "antd";
import RegisterUser from "components/GobalComponents/Forms/registerUser";
import TabTitle from "components/GobalComponents/tabTitle";

import FormCompany from "./formCompany";
import { createCompany } from "../../../../services/companies";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};

class CardsForm extends React.Component {
  state = {
    activeKeyCard: "tab1",
    validTab1: false,
    companyData: {}
  };

  valdForm = () => {
    const { companyData, profilePic } = this.state;
    const { form } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        companyData.address = values.address;
        companyData.credential = values.credential;
        companyData.email = values.email;
        companyData.last_name = values.lastName;
        companyData.mobile_phone = values.mobile_phone;
        companyData.name = values.name;
        companyData.profile_pic = profilePic;

        this.setState({
          activeKeyCard: "tab2",
          validTab1: true,
          companyData
        });
      }
    });
  };

  handleSubmit = () => {
    const { companyData, imageCompany } = this.state;
    const { form, history } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        companyData.business_name = values.business_name;
        companyData.nit = values.nit;
        companyData.image_company = imageCompany;
        createCompany(companyData).then(() => {
          history.push(`/superAdmin/companies`);
        });
      }
    });
  };

  saveImage = base64 => {
    this.setState({
      profilePic: base64
    });
  };

  saveImageCompany = base64 => {
    this.setState({
      imageCompany: base64
    });
  };

  render() {
    const { activeKeyCard, validTab1 } = this.state;
    const { form } = this.props;

    const tabList = [
      {
        key: "tab1",
        tab: (
          <TabTitle title="Información de administrador" check={validTab1} />
        ),
        disabled: validTab1
      },
      {
        key: "tab2",
        tab: <TabTitle title="Información de la empresa" check={false} />,
        disabled: !validTab1
      }
    ];

    const contentList = {
      tab1: (
        <RegisterUser
          title="Información del Administrador de la empresa"
          formItemLayout={formItemLayout}
          form={form}
          saveImage={this.saveImage}
        />
      ),
      tab2: (
        <FormCompany
          formItemLayout={formItemLayout}
          form={form}
          saveImageCompany={this.saveImageCompany}
        />
      )
    };

    const onTabChange = key => {
      this.setState({ activeKeyCard: key });
    };

    const getOptionsButtons = () => {
      const { history } = this.props;
      if (activeKeyCard === "tab1") {
        return (
          <Button.Group size="big">
            <Popconfirm
              title="¿Esta seguro de descartar?"
              onConfirm={() => history.push(`/superAdmin/companies`)}
              okText="Si"
              cancelText="No"
            >
              <Button type="link" className="gray mr-3">
                <u>Descartar</u>
              </Button>
            </Popconfirm>
            <Button type="primary" onClick={() => this.valdForm()}>
              Continuar
            </Button>
          </Button.Group>
        );
      }
      return (
        <Button.Group size="big">
          <Popconfirm
            title="¿Esta seguro de descartar?"
            onConfirm={() => history.push(`/superAdmin/companies`)}
            okText="Si"
            cancelText="No"
          >
            <Button type="link" className="gray mr-3">
              <u>Descartar</u>
            </Button>
          </Popconfirm>

          <Popconfirm
            title="¿Esta seguro de crear la empresa?"
            onConfirm={() => this.handleSubmit()}
            okText="Si"
            cancelText="No"
          >
            <Button type="primary">Crear Empresa</Button>
          </Popconfirm>
        </Button.Group>
      );
    };

    return (
      <Authorize roles={["SUPERADMIN"]} redirect to="/404">
        <Helmet title="Crear Empresa" />
        <h2 align="center">Formulario de registro de empresas</h2>
        <Card
          style={{ width: "100%" }}
          tabList={tabList}
          activeTabKey={activeKeyCard}
          onTabChange={key => {
            onTabChange(key, "key");
          }}
        >
          <Form>{contentList[activeKeyCard]}</Form>
          <hr />
          <div className="text-right">{getOptionsButtons()}</div>
        </Card>
      </Authorize>
    );
  }
}

export default Form.create()(CardsForm);
