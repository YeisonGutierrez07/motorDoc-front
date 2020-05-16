/* eslint-disable import/no-named-as-default */
import React from "react";
import { Helmet } from "react-helmet";
import Authorize from "components/LayoutComponents/Authorize";
import { Form, Card, Button, Popconfirm } from "antd";
import RegisterUser from "components/GobalComponents/Forms/registerUser";
import TabTitle from "components/GobalComponents/tabTitle";
import { createWorkshopService } from "../../../../services/workshops";
import { referenciaFirebase } from "../../../../services/firebase";
import FormWorkShop from "./formWorkShop";
import SimpleMap from "./googleMaps";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};

class CardsForm extends React.Component {
  state = {
    activeKeyCard: "tab1",
    validTab1: false,
    validTab2: false,
    workShopData: {},
    ltyLg: {}
  };

  handleSubmit = () => {
    const { workShopData, ltyLg } = this.state;
    const { history } = this.props;
    workShopData.latitude = ltyLg.latitude;
    workShopData.longitude = ltyLg.longitude;
    createWorkshopService(workShopData).then(response => {
      referenciaFirebase.ref(`workshops/`).push({
        id_user: response.id,
        name: workShopData.name_workshop,
        photo: workShopData.imageWorkshop
      });
      history.push(`/company/list`);
    });
  };

  saveltylg = data => {
    this.setState({
      ltyLg: data
    });
  };

  valdForm2 = () => {
    const { workShopData, imageWorkshop } = this.state;
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        workShopData.address_workshop = values.addressWorkshop;
        workShopData.name_workshop = values.nameWorkshop;
        workShopData.description = values.description;
        workShopData.imageWorkshop = imageWorkshop;

        this.setState({
          activeKeyCard: "tab3",
          validTab2: true,
          workShopData
        });
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
      if (!err) {
        workShopData.address = values.address;
        workShopData.credential = values.credential;
        workShopData.email = values.email;
        workShopData.last_name = values.lastName;
        workShopData.mobile_phone = values.mobile_phone;
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
    const { activeKeyCard, validTab1, validTab2 } = this.state;
    const { form, history } = this.props;

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
        tab: <TabTitle title="Información del taller" check={validTab2} />,
        disabled: !validTab1
      },
      {
        key: "tab3",
        tab: <TabTitle title="Buscar en el mapa" check={false} />,
        disabled: !validTab2
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
      ),
      tab3: <SimpleMap saveltylg={this.saveltylg} />
    };

    const onTabChange = key => {
      this.setState({ activeKeyCard: key });
    };

    const getOptionsButtons = () => {
      if (activeKeyCard === "tab1" || activeKeyCard === "tab2") {
        return (
          <Button.Group size="big">
            <Popconfirm
              title="¿Esta seguro de descartar?"
              onConfirm={() => history.goBack()}
              okText="Si"
              cancelText="No"
            >
              <Button type="link" className="gray mr-3">
                <u>Descartar</u>
              </Button>
            </Popconfirm>
            <Button
              type="primary"
              onClick={() =>
                activeKeyCard === "tab1" ? this.valdForm() : this.valdForm2()
              }
            >
              Continuar
            </Button>
          </Button.Group>
        );
      }

      return (
        <Button.Group size="big">
          <Popconfirm
            title="¿Esta seguro de descartar?"
            onConfirm={() => history.goBack()}
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
        <div align="center">
          <h1 style={{ color: "red" }}>
            <b>Formulario de registro de talleres</b>
          </h1>
          <div className="utils__titleDescription">
            LLene el formulario para agregar un nuevo taller
          </div>
        </div>
        <br />
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
