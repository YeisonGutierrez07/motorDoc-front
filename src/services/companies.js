/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { ENDPOINTS } from 'constant/endPoints'
import { notification } from 'antd';

export async function getAllCompanies(name) {
  console.log(JSON.parse(localStorage.getItem('user')));
  
  return axios({
      method: 'GET',
      url: `${ENDPOINTS.COMPANIES.GET_ALL}?name=${name}`,     
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

export async function createCompany(data) {
    return axios({
        method: 'POST',
        url: `${ENDPOINTS.COMPANIES.CREATE}`,    
        data,
        headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
        },
  
    }).then(response => {
        notification.success({
            message: 'Exito',
            description: `Se ha creado la empresa ${  data.business_name  } con exito.`,
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

export async function changeStatusService(id, status) {
    return axios({
        method: 'PUT',
        url: `${ENDPOINTS.COMPANIES.CHANGE_STATUS}`,    
        data:{ company_id: id, status },
        headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
        },
  
    }).then(response => {
        notification.success({
            message: 'Exito',
            description: `Se ha cambiado el estado con exito.`,
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


export async function deleteCompanyService(id) {
    return axios({
        method: 'DELETE',
        url: `${ENDPOINTS.COMPANIES.DELETE}${id}`, 
        headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
        },
  
    }).then(response => {
        notification.success({
            message: 'Exito',
            description: `Se ha eliminado la empresa con exito.`,
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
