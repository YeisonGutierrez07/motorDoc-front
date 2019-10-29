/* eslint-disable import/no-named-as-default */
import React from "react";
import { Helmet } from "react-helmet";
import Authorize from "components/LayoutComponents/Authorize";
import { Form, Card, Button, Popconfirm } from "antd";
import RegisterUser from "components/GobalComponents/Forms/registerUser";
import TabTitle from "components/GobalComponents/tabTitle";
// import {createWorkShopService} from '../../../../services/companies'
import FormWorkShop from "./formWorkShop";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};

class CardsForm extends React.Component {
  state = {
    activeKeyCard: "tab1",
    validTab1: false,
    workShopData: {}
  };

  handleSubmit = () => {
    const { workShopData, imageWorkshop } = this.state;
    const { form } = this.props;
    form.validateFields((err, values) => {
      console.log(values);

      if (!err) {
        workShopData.address_workshop = values.addressWorkshop;
        workShopData.name_workshop = values.nameWorkshop;
        workShopData.imageWorkshop = imageWorkshop;
        // createCompany(workShopData)
        // .then(() => {
        //   history.push(`/superAdmin/companies`)
        // })
        console.log(workShopData);
      }
    });
  };

  saveImageWorkshop = base64 => {
    this.setState({
      imageWorkshop: base64
    });
  };

  valdForm = () => {
    const { workShopData, profilePic } = this.state;
    const { form } = this.props;

    form.validateFields((err, values) => {
      console.log(values);

      if (!err) {
        workShopData.address = values.address;
        workShopData.credential = values.credential;
        workShopData.email = values.email;
        workShopData.last_name = values.lastName;
        workShopData.mobile_phone = values.mobilePhone;
        workShopData.name = values.name;
        workShopData.profile_pic = profilePic;

        this.setState({
          activeKeyCard: "tab2",
          validTab1: true,
          workShopData
        });
      }
    });
  };

  saveImage = base64 => {
    this.setState({
      profilePic: base64
    });
  };

  render() {
    const { form } = this.props;
    const { activeKeyCard, validTab1 } = this.state;

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
        tab: <TabTitle title="Información del taller" check={false} />,
        disabled: !validTab1
      }
    ];

    const contentList = {
      tab1: (
        <RegisterUser
          title="Información del administrador"
          formItemLayout={formItemLayout}
          form={form}
          saveImage={this.saveImage}
        />
      ),
      tab2: (
        <FormWorkShop
          formItemLayout={formItemLayout}
          form={form}
          saveImageWorkshop={this.saveImageWorkshop}
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
            title="¿Esta seguro de crear el taller?"
            onConfirm={() => this.handleSubmit()}
            okText="Si"
            cancelText="No"
          >
            <Button type="primary">Crear Taller</Button>
          </Popconfirm>
        </Button.Group>
      );
    };

    return (
      <Authorize roles={["COMPANY"]} redirect to="/404">
        <Helmet title="Crear Empresa" />
        <h2 align="center">Formulario de registro de talleres</h2>
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
        <Helmet title="Principal" />
      </Authorize>
    );
  }
}

export default Form.create()(CardsForm);
