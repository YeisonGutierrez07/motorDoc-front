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

export const GetRoutineByWorkShop = async id => {
  try {
    const { data, status } = await axios.get(
      `${ENDPOINTS.ROUTINESV2.GET_BY_WORKSHOP_ID}${id}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    );
    return status === 200
      ? data.map(item => ({
          key: item.idroutine,
          value: `${item.name} - ${item.cost}`
        }))
      : null;
  } catch (e) {
    return null;
  }
};
