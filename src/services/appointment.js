/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { ENDPOINTS } from 'constant/endPoints';
import { notification } from 'antd';


export async function getAppointments(id) {
    return axios({
      method: 'GET',
      url: `${ENDPOINTS.APPOINTMENTS.GET_APPOINTMENT}/${id}`,
      headers: {
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.data.data;
      })
      .catch(() => {
        notification.warning({
          message: 'Error',
          description: 'Hubo un error consultando los datos.'
        });
      });
  }
  
  export async function addAppointment(data) {
    let res;
    try{
      res = await axios({
        method: 'POST',
        url: `${ENDPOINTS.APPOINTMENTS.ADD_APPOINTMENT}`,
        data,
        headers: {
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
    }catch(e){
      console.log(e);
    }
    return res !== undefined ? res.status : res;
  }