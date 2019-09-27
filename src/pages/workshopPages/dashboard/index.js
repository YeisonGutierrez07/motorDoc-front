import React from 'react'
import { Helmet } from 'react-helmet'
import Authorize from 'components/LayoutComponents/Authorize'

class DashboardWorkshp extends React.Component {
  render() {
    return (
      <Authorize roles={['WORKSHOP']} redirect to="/404">
        <Helmet title="Crear Cupon" />
        <h1>Pagina principal para talleres</h1>
      </Authorize>
    )
  }
}

export default DashboardWorkshp
