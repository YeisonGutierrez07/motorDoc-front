/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { ENDPOINTS } from "constant/endPoints";
import { notification } from "antd";

export async function getWorkshopService() {
  return axios({
    method: "GET",
    url: `${ENDPOINTS.WORKSHOP.GET}`,
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

export async function getAllWorkshopService(search) {
  return axios({
    method: "GET",
    url: `${ENDPOINTS.WORKSHOP.GET_ALL}?search=${search}`,
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

export async function createWorkshopService(data) {
  return axios({
    method: "POST",
    url: `${ENDPOINTS.WORKSHOP.CREATE}`,
    data,
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
    }
  })
    .then(response => {
      notification.success({
        message: "Exito",
        description: "Se creo un nuevo taller para su empresa."
      });
      return response.data.data;
    })
    .catch(() => {
      notification.warning({
        message: "Error",
        description: "Hubo un error consultando los datos."
      });
    });
}

export async function searchWorkShopService(idWorkShop) {
  return axios({
    method: "GET",
    url: `${ENDPOINTS.WORKSHOP.GET_BY_ID}${idWorkShop}`,
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
