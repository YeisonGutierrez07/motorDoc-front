/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { ENDPOINTS } from "constant/endPoints";
import { notification } from "antd";

export async function getAllRoutines() {
  return axios({
    method: "GET",
    url: `${ENDPOINTS.ROUTINES.GET}`,
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

export async function getAllRoutinesByWorkShop() {
  return axios({
    method: "GET",
    url: `${ENDPOINTS.ROUTINES.GET_BY_WORKSHOP}`,
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

export async function addRoutineToWorkShop(data) {
  return axios({
    method: "POST",
    url: `${ENDPOINTS.ROUTINES.ADD_ROUTINE}`,
    data,
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
