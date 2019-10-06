/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { ENDPOINTS } from 'constant/endPoints'
import { notification } from 'antd';

export async function getMechanicService() {
  return axios({
      method: 'GET',
      url: `${ENDPOINTS.MECHANIC.GET}`,     
      headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      },
  }).then(response => {
      return response.data.data
  })
  .catch(() => {
      notification.warning({
          message: 'Error',
          description: "Hubo un error consultando los datos.",
      })
  })
}

export async function getMisMechanicsService() {
    return axios({
        method: 'GET',
        url: `${ENDPOINTS.MECHANIC.MIS_MECHANICS}`,     
        headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
        },
    }).then(response => {
        return response.data.data
    })
    .catch(() => {
        notification.warning({
            message: 'Error',
            description: "Hubo un error consultando los datos.",
        })
    })
}

export async function createMechanicService(data) {
    return axios({
        method: 'POST',
        url: `${ENDPOINTS.MECHANIC.CREATE}`, 
        data,    
        headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
        },
    }).then(response => {
        notification.success({
            message: 'Exito',
            description: "Se ha creado el nuevo mecanico con exito.",
        })
        return response.data.data
    })
    .catch(() => {
        notification.warning({
            message: 'Error',
            description: "Hubo un error consultando los datos.",
        })
    })
  }
