import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import Authorize from 'components/LayoutComponents/Authorize'
import UserCard from 'components/GobalComponents/UserCard'
import { Row, Col, Button} from 'antd';
import {getMisMechanicsService} from '../../../services/mechanic'

export class list extends Component {

  state = {
    listMechanics: []
  }

  componentDidMount() {
    getMisMechanicsService()
    .then(listMechanics => {
      this.setState({
        listMechanics
      })
    })
  }

  render() {
    const {history} = this.props
    const {listMechanics} = this.state
    return (
      <Authorize roles={['WORKSHOP']} redirect to="/404">
        <Helmet title="Principal" />
        <div className="card">
          <div className="card-body">
            <Row gutter={20}>
              <Col xs={24}>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="utils__title">
                          <h2 style={{color:'red'}}>Listado de mecanicos de su taller</h2>
                        </div>
                      </div>
                      <div className="col-lg-6" align="right">
                        <Button type="primary" onClick={() => history.push("/workshopPages/formMechanics/0")}>Agregar Mecanico</Button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-body">
                      <div className="row">
                        {Object.keys(listMechanics).map(c => (
                          <div key={c} className="col-md-3">
                            <UserCard key={c} type={Number(c)%2? "primary" : ''} info={listMechanics[c].user} />
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
