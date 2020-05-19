/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { ENDPOINTS } from "constant/endPoints";
import { notification } from "antd";


export async function getAllRoutinesByWorkShopID(id) {
    return axios({
      method: "GET",
      url: `${ENDPOINTS.ROUTINES.GET_BY_WORKSHOP_ID}/${id}`,
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
      }
    })
      .then(response => {
        return response.data.data;
      })
      .catch(() => {
        notification.warning({
          message: "Error",
          description: "Hubo un error consultando los datos."
        });
      });
  }
  
  export async function addAppointment(data) {
    return axios({
      method: "POST",
      url: `${ENDPOINTS.APPOINTMENTS.ADD_APPOINTMENT}`,
      data,
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(() => {
        notification.warning({
          message: "Error",
          description: "Hubo un error consultando los datos."
        });
      });
  }