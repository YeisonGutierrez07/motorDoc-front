import React from 'react'
import { Helmet } from 'react-helmet'
import Authorize from 'components/LayoutComponents/Authorize'

class DashboardCompany extends React.Component {
  render() {
    return (
      <Authorize roles={['COMPANY']} redirect to="/404">
        <Helmet title="Crear Cupon" />
        <h1>Pagina principal para empresas</h1>
      </Authorize>
    )
  }
}

export default DashboardCompany
