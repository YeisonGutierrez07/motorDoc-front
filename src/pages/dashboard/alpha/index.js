import React from 'react'
import { Helmet } from 'react-helmet'
import Authorize from 'components/LayoutComponents/Authorize'

class DashboardAlpha extends React.Component {
  render() {
    return (
      <Authorize roles={['admin']} redirect to="/dashboard/beta">
        <Helmet title="Crear Cupon" />
        <h1>Pagina principal</h1>
      </Authorize>
    )
  }
}

export default DashboardAlpha
