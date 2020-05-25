/* eslint-disable import/named */
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Authorize from "components/LayoutComponents/Authorize";
import UserCard from "components/GobalComponents/UserCard";
import { Row, Col, Button, Spin } from "antd";
import { ChangeStatusRoutine, getMisMechanicsService } from "../../../services/mechanic";
import { getMyWorkShopData } from "../../../services/workshops";
import { getAllRoutinesByWorkShop } from "../../../services/routines";
import ModalAddRoutine from "./modalAddRoutine"

export class list extends Component {
  state = {
    listMechanics: [],
    loading: true,
    visible:false,
    mechanicData:{},
    routines:[],
    routinesMechanic:[],
    mechanicID:0,
    yesChanges:false
  };

  componentDidMount() {
    this.getAllData()
  }

  getAllData = () => {
    this.setState({loading: true, listMechanics:[]});

    getMisMechanicsService().then(listMechanics => {
      this.setState({
        listMechanics: listMechanics || [],
        loading: false
      });
      return getMyWorkShopData()
    })
    .then(data => {
      return getAllRoutinesByWorkShop(data.id)
    })
    .then(routines =>{
      this.setState({ routines })
    });
  }

  changeStatus = data => {
    const { mechanicID } = this.state;
    const objService = {
      idroutine: data.id,
      idmechanic: mechanicID,
    }
    ChangeStatusRoutine(objService)
    .then(() => {})
    this.setState({yesChanges: true})
  }

  changeVisible = (status, user) => {
    const newRoutines = [];
    let selectMechanic = [{id:0}];
    const { yesChanges } = this.state;
    
    if (status === true) {
      const { routines, listMechanics } = this.state;
      selectMechanic = listMechanics.filter(mechanics => mechanics.user_id === user.id);

      if (selectMechanic.length > 0) {
        routines.forEach((r, i) => {
          let statusTable = false;
  
          selectMechanic[0].routinemechanic.forEach(rm => {
            if (!statusTable) {
              if (r.idRoutine === rm.idroutine) {
                statusTable= true;
              }
            }
          })
  
          newRoutines.push({
            key: i,
            name: r.name,
            id:r.idRoutine,
            status:statusTable,
          })
        });
      }
    } else if (yesChanges) {
      this.getAllData()
    }

    this.setState({
      visible: newRoutines.length> 0 && status || false,
      mechanicData:user || {}, 
      mechanicID: selectMechanic[0].id,
      routinesMechanic: newRoutines,
    });
  };

  render() {
    const { listMechanics, loading, visible, mechanicData, routinesMechanic } = this.state;
    const { history } = this.props;

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
      <Authorize roles={["WORKSHOP"]} redirect to="/404">
        <Helmet title="Principal" />
        <ModalAddRoutine 
          visible={visible}
          changeVisible={this.changeVisible}
          mechanicData={mechanicData} 
          routinesMechanic={routinesMechanic}
          changeStatus={this.changeStatus}
        />
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
                            <b>Listado de mecanicos de su taller</b>
                          </h2>
                        </div>
                        <div className="utils__titleDescription">
                          En esta sección vas a encontrar el listado de los mecanicos de su taller
                        </div>
                      </div>
                      <div className="col-lg-6" align="right">
                        <Button
                          type="primary"
                          onClick={() =>
                            history.push("/workshopPages/formMechanics/0")
                          }
                        >
                          Agregar Mecanico
                        </Button>
                      </div>
                    </div>
                  </div>
                  {loadingData()}
                  <div className="card-body">
                    <div className="card-body">
                      <div className="row">
                        {Object.keys(listMechanics).map(c => (
                          <div key={c} className="col-md-3">
                            <UserCard
                              key={c}
                              type={Number(c) % 2 ? "primary" : ""}
                              info={listMechanics[c].user}
                              buttonAction={this.changeVisible}
                            />
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

export default list;
