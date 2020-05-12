import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Authorize from "components/LayoutComponents/Authorize";
import {
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Icon,
  Spin
} from "antd";
import { GetAllBrands } from "../../../services/brands";
import { GetAllVehicles, CreateVehicle } from "../../../services/vehicles";
import VehicleDetail from "./vehicleDetail";

const { Dragger } = Upload;
const { Option } = Select;
const { TextArea } = Input;

@Form.create()
export class VehiclesList extends Component {
  state = {
    visible: false,
    brands: [],
    vehicles: [],
    image: "",
    loading: true
  };

  componentDidMount() {
    GetAllBrands().then(brands => this.setState({ brands }));
    GetAllVehicles().then(vehicles =>
      this.setState({ vehicles, loading: false })
    );
  }

  createVehicle = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    const { form } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        const { image } = this.state;
        const data = {
          model: values.model,
          estado: values.estado,
          idreferencebrand: values.idreferencebrand,
          placa: values.placa,
          image
        };

        CreateVehicle(data)
          .then(() => {
            return GetAllVehicles();
          })
          .then(vehicles => {
            this.setState({ vehicles });
            this.setState({
              visible: false
            });
          });
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, brands, vehicles, loading } = this.state;
    const saveImage = base64 => {
      this.setState({
        image: base64
      });
    };
    const props = {
      onChange(e) {
        const file = e.fileList[0].originFileObj;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader.result) {
            saveImage(reader.result);
          }
        };
      }
    };

    const { form } = this.props;

    const loadingData = () => {
      if (loading) {
        return (
          <div align="center">
            <Spin />
          </div>
        );
      }
      return null;
    };

    return (
      <Authorize roles={["CLIENT"]} redirect to="/404">
        <Helmet title="Vehiculos" />
        <Modal
          title="Agendar cita con este taller"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <>
            <Form layout="vertical" onSubmit={this.onSubmit}>
              <Row gutter={20}>
                <Col md={12} xs={24}>
                  <Form.Item label="Marca">
                    {form.getFieldDecorator("brand_id", {
                      initialValue: "",
                      rules: [
                        {
                          required: true,
                          message: "¡Por favor seleccione la marca!"
                        }
                      ]
                    })(
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Seleccione el taller"
                        optionFilterProp="children"
                      >
                        {Object.keys(brands).map(c => (
                          <Option key={c} value={brands[c].id}>
                            {brands[c].name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col md={12} xs={24}>
                  <Form.Item label="Referencia">
                    {form.getFieldDecorator("idreferencebrand", {
                      initialValue: "",
                      rules: [
                        {
                          required: true,
                          message: "¡Por favor ingrese la referencia!"
                        }
                      ]
                    })(
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Seleccione el taller"
                        optionFilterProp="children"
                      >
                        <Option value={1}>Referencia 1</Option>
                        <Option value={2} disabled>
                          Referencia 2
                        </Option>
                        <Option value={3} disabled>
                          Referencia 3
                        </Option>
                        <Option value={4} disabled>
                          Referencia 4
                        </Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={20}>
                <Col md={12} xs={24}>
                  <Form.Item label="Placa">
                    {form.getFieldDecorator("placa", {
                      initialValue: "",
                      rules: [
                        {
                          required: true,
                          message: "¡Por favor ingrese la placa!"
                        }
                      ]
                    })(<Input size="default" placeholder="Placa" />)}
                  </Form.Item>
                </Col>
                <Col md={12} xs={24}>
                  <Form.Item label="Modelo">
                    {form.getFieldDecorator("model", {
                      initialValue: "",
                      rules: [
                        {
                          required: true,
                          message: "¡Por favor ingrese el modelo!"
                        }
                      ]
                    })(
                      <Input size="default" placeholder="Modelo del vehiculo" />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Estado-Descripción">
                {form.getFieldDecorator("estado", {
                  initialValue: "",
                  rules: [
                    {
                      required: true,
                      message: "¡Por favor ingrese una descripción!"
                    }
                  ]
                })(<TextArea rows={4} />)}
              </Form.Item>
              <Form.Item label="Foto del vehiculo: ">
                {form.getFieldDecorator("image", {
                  rules: [
                    {
                      required: true,
                      message: "¡Por favor ingrese una foto del vehiculo!"
                    }
                  ]
                })(
                  <Dragger {...props} accept>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">
                      Haga clic o arrastre el archivo a esta área para cargar
                    </p>
                    <p className="ant-upload-hint">
                      Agregar la foto del vehiculo
                    </p>
                  </Dragger>
                )}
              </Form.Item>
            </Form>
          </>
        </Modal>
        <div className="card">
          <div className="card-body">
            <Row gutter={20}>
              <Col xs={24}>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="utils__title">
                          <h2 style={{ color: "red" }}>
                            LISTADO DE MIS VEHICULOS
                          </h2>
                        </div>
                      </div>
                      <div className="col-lg-6" align="right">
                        <Button
                          type="primary"
                          onClick={() => this.createVehicle()}
                        >
                          Agregar vehiculo
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-body">
                      {loadingData()}
                      <div className="row">
                        {Object.keys(vehicles).map(c => (
                          <div key={c} className="col-md-3">
                            <VehicleDetail VehicleData={vehicles[c]} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Authorize>
    );
  }
}

export default VehiclesList;
