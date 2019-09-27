import React from 'react'
import { Helmet } from 'react-helmet'
import Authorize from 'components/LayoutComponents/Authorize'

class DashboardMechanic extends React.Component {
  render() {
    return (
      <Authorize roles={['MECHANIC']} redirect to="/404">
        <Helmet title="Crear Cupon" />
        <h1>Pagina principal para mecanicos</h1>
      </Authorize>
    )
  }
}

export default DashboardMechanic
