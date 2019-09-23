import React, { Component } from 'react';
import { Card, Icon, Skeleton, Switch, Popconfirm } from 'antd';
import {changeStatusService, deleteCompanyService} from '../../../services/companies'

export class CardCompany extends Component {

  changeStatus = () => {
    const {company} = this.props
    let newStatus = 0
    if (!company.status) {
      newStatus = 1
    }
    changeStatusService(company.id, newStatus)
  }

  deleteCompany = () => {
    const {company, rechargeCompanies} = this.props
    deleteCompanyService(company.id)
    .then(() => {
      rechargeCompanies('')
    })
  }

  render() {
    const {company} = this.props
    return (
      <Card
        style={{ width: 600, marginTop: 16 }}
        actions={[
          <Popconfirm
            title="¿Esta seguro de eliminar esta empresa?"
            onConfirm={() => this.deleteCompany()}
            okText="Si"
            cancelText="No"
          >
            <Icon type="delete" key="delete" />
          </Popconfirm>,
          <Icon type="edit" key="edit" />,
          <Switch defaultChecked={company.status} onChange={this.changeStatus} />,
        ]}
        align="center"
      >
        <Skeleton loading={false} avatar>
          <img style={{ width: '80%' }} src={company.logo} alt="" />
          <div className="utils__title">
            <br />
            <h4 style={{color:'red'}}>{company.business_name}</h4>
          </div>
          <div className="utils__titleDescription">NIT: {company.nit}</div>
        </Skeleton>
      </Card>
    );
  }
}

export default CardCompany;
