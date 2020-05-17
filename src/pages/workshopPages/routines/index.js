/* eslint-disable import/no-named-as-default */
import React from "react";
import { Helmet } from "react-helmet";
import Authorize from "components/LayoutComponents/Authorize";
import {
  Row,
  Col,
  Button,
  Modal,
  Table,
  Select,
  notification,
  InputNumber,
  Input,
  Icon,
  Popconfirm,
} from "antd";
import {
  getAllRoutinesByWorkShop,
  addRoutineToWorkShop,
  deleteRoutine
} from "../../../services/routines";
import { GetAllBrands, GetReferencesBrands } from "../../../services/brands";
import { getMyWorkShopData } from "../../../services/workshops";


const { confirm } = Modal;
const { Option } = Select;

class ViewRoutines extends React.Component {
  state = {
    workshopID: 0,
    misRoutines: [],
    newRoutines: [],
    routinesTable: [],
    visible: false,
    estimatedTime: null,
    selectReference: null,
    estimatedCost: null,
    loading: true,
    nameRoutine: "",
    brands:[],
    references:[]
  };

  componentDidMount() {
    GetAllBrands().then(brands => this.setState({ brands }));
    this.getMyWorkShopData();
  }

  getMyWorkShopData = () => {
    getMyWorkShopData()
    .then(data => {
      this.setState({workshopID:data.id });
      this.stategetAllRoutinesByWorkShop(data.id);
    })
  }

  stategetAllRoutinesByWorkShop = (workshopID) => {
    getAllRoutinesByWorkShop(workshopID).then(misRoutines => {
      this.setState({ misRoutines, loading: false });
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
      routinesTable: []
    });
  };

  getReferenceByIDBrand = brandID => {
    GetReferencesBrands(brandID)
    .then(references => this.setState({ references }));
  };

  handleSubmit = () => {
    const { newRoutines, nameRoutine, workshopID } = this.state;
    if (newRoutines.length === 0) {
      notification.error({
        message: "Error",
        description:
          "Usted no ha agregado ninguna opción, para salir oprima cancelar."
      });
      return;
    }
    const sendData = () => {
      const dataSend = {
        "name": nameRoutine,
        "routineBrand": newRoutines,
        "workshopsid": workshopID
      }

      addRoutineToWorkShop(dataSend)
      .then(() => {
        this.setState({
          visible: false,
          newRoutines: [],
          routinesTable: [],
          estimatedTime: null,
          selectReference: null,
          estimatedCost: null,
          nameRoutine: "",
          references:[]
        });
        notification.success({
          message: "Exito",
          description: "Se han agregado las rutinas con exito"
        });
        this.setState({loading: true})
        this.stategetAllRoutinesByWorkShop();
      });
    };

    confirm({
      title: "¿Seguro de agregar estas rutinas a su listado?",
      content: "Recuerde que seran vistas desde el perfil de sus clientes",
      onOk() {
        sendData();
      },
      onCancel() {
        this.handleCancel();
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  deleteRoutine = idRoutine => {
    deleteRoutine(idRoutine)
    .then(() => {
      notification.success({
        message: "Exito",
        description: "Se ha eliminado la rutina con exito"
      });
      this.setState({loading: true})
      this.stategetAllRoutinesByWorkShop();
    })
  }

  onChangeNameRoutine = e => this.setState({nameRoutine: e.target.value})

  render() {
    const {
      misRoutines,
      visible,
      routinesTable,
      estimatedTime,
      selectReference,
      estimatedCost,
      loading,
      brands,
      references,
      nameRoutine
    } = this.state;

    const columnsRegister = [
      {
        title: "Nombre de la rutina",
        dataIndex: "reference.nameReference",
        key: "name",
      },
      {
        title: "Tiempo estimado",
        key: "estimated_time",
        render: data => data.routineBrand

      },
      {
        title: "Costo estimado",
        dataIndex: "estimated_cost",
        render: cost => `$ ${cost}`,
        key: "estimated_cost"
      }
    ];


    const columns = [
      {
        title: "Nombre de la rutina",
        key: "name",
        render: data => data.reference ? data.reference.nameReference : data.name
      },
      {
        title: "Tiempo estimado",
        dataIndex: "routineBrand",
        render: data => data.length > 0 ? `${data[0].estimatedTime  }  Minutos`: 0,
        key: "estimated_time",

      },
      {
        title: "Costo estimado",
        dataIndex: "routineBrand",
        render: data => data.length > 0 ? `$${  data[0].cost}`  : 0,
        key: "cost"
      },
      {
        title: "Eliminar Rutina",
        key: "delete",
        render: data => (
          <>
            <Button icon="edit">Editar</Button>&nbsp;&nbsp;
            <Popconfirm title="¿Seguro de eliminar esta rutina?" okText="Si" cancelText="No" onConfirm={() => this.deleteRoutine(data.idRoutine)}>
              <Button type="primary" icon="delete">Eliminar</Button>
            </Popconfirm>
          </>
        )
      },
    ];


    const addRoutine = () => {
      const { newRoutines, nameReference } = this.state;
      const newRoutinesObj = {
        idreferencebrand: selectReference,
        estimated_time: estimatedTime,
        estimated_cost: estimatedCost
      };
      if (!selectReference || !estimatedTime || !estimatedCost || nameReference) {
        notification.error({
          message: "Error",
          description: "Debe agregar información en todos los campos"
        });
        return;
      }

      const validRoutines = routinesTable.filter(r => r.reference.idReferenceBrand === selectReference);

      if (validRoutines.length > 0) {
        notification.error({
          message: "Error",
          description: "No puede agregar la rutina 2 veces para la misma referencia"
        });
        return;
      }

      const referenceData = references.filter(r => r.idReferenceBrand === selectReference)[0];
      const routinesTableObj = {
        reference: referenceData,
        estimated_time: estimatedTime,
        estimated_cost: estimatedCost
      };
      newRoutines.push(newRoutinesObj);
      routinesTable.push(routinesTableObj);

      this.setState({
        newRoutines,
        routinesTable,
      });
    };

    const onChangeSelect = val => {
      this.setState({
        selectReference: val
      });
    };

    const onChangeHours = (val) => {
      this.setState({
        estimatedTime: val
      });
    };

    const onChangeCost = val => {
      this.setState({
        estimatedCost: val.toString()
      });
    };

    const returnList = () => {
      if (routinesTable.length >= 1) {
        return (
          <>
            <br />
            <h3>
              <p style={{ color: "red" }}>Nuevas rutinas</p>
            </h3>
            <Table
              dataSource={routinesTable}
              columns={columnsRegister}
              pagination={routinesTable.length >= 11}
              rowKey="id"
            />
          </>
        );
      }
      return null;
    };
    return (
      <Authorize roles={["WORKSHOP"]} redirect to="/404">
        <Helmet title="Principal" />
        <Modal
          title="Agregar rutinas"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <>
            <b>Nombre de la rutina</b>
            <Input value={nameRoutine} onChange={this.onChangeNameRoutine} />
            {
              <>
                <br />
                <br />
                <div className="row">
                  <div className="col-6">
                    <b>Seleccione las marca</b>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Seleccione el taller"
                      optionFilterProp="children"
                      onChange={this.getReferenceByIDBrand}
                    >
                      {Object.keys(brands).map(c => (
                        <Option key={c} value={brands[c].id}>
                          {brands[c].name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-6">
                    <b>Seleccione las referencias</b>
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Seleccione la Referencia"
                      optionFilterProp="children"
                      onChange={onChangeSelect}
                      disabled={references.length === 0}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {Object.keys(references).map(c => (
                        <Option key={references[c].idReferenceBrand} value={references[c].idReferenceBrand}>
                          {references[c].nameReference}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
                <br />
                <br />
                <div className="row">
                  <div className="col-6">
                    <b>Tiempo estimado</b>(en Minutos)<b>:</b>
                    <InputNumber
                      min={1}
                      key="estimated_time"
                      onChange={onChangeHours}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="col-6">
                    <b>Valor</b>(en dinero)<b>:</b>
                    <InputNumber
                      min={1}
                      onChange={onChangeCost}
                      value={estimatedCost}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <br />
                <br />
                <div align="center">
                  <Button onClick={() => addRoutine()}>
                    <Icon type="plus" />
                    Agregar al listado
                  </Button>
                  <br />
                  <br />
                </div>
                {returnList()}
              </>
            }
          </>
        </Modal>
        <div className="card">
          <div className="card-body">
            <Row gutter={20}>
              <Col xs={24}>
                <div className="card">
                  <div className="card-header">
                    <div className="utils__title">
                      <h2 style={{ color: "red" }}>
                        <b>Listado de rutinas que ofrece su taller</b>
                      </h2>
                    </div>
                    <div className="utils__titleDescription">
                      En esta sección puedes agregar todas las rutinas que tu taller ofrece a los clientes de motorDOC
                    </div>
                  </div>
                  <div className="card-body">
                    <div align="right">
                      <Button type="primary" onClick={this.showModal}>
                        Agregar rutina
                      </Button>
                    </div>
                    <Table
                      dataSource={misRoutines}
                      columns={columns}
                      loading={loading}
                      pagination={misRoutines.length >= 11}
                      rowKey="id"
                    />
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

export default ViewRoutines;
