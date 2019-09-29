/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { ENDPOINTS } from 'constant/endPoints'
import { notification } from 'antd';

export async function getMechanicService() {
  console.log(JSON.parse(localStorage.getItem('user')));
  
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
