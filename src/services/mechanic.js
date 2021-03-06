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

export const getTreatingMechanic = async (idworkshop, idvehicle) => {
  try {
    const { data, status } = await axios.get(
      `${ENDPOINTS.MECHANIC.TRATING_MECHNIC}${idworkshop}/${idvehicle}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
            }`
        }
      }
    );
    return status === 200 ?
      data.data.map(item => ({
        key: item.id,
        value: `${item.name} ${item.last_name}`
      }))
      : [];
  } catch
  {
    notification.warning({
      message: 'Error',
      description: "Hubo un error consultando los datos.",
    })
    return [];
  }
}

export const getMechanicByRoutine = async (routineid, idworkshop) => {
  try {
    const { data, status } = await axios.get(
      `${ENDPOINTS.MECHANIC.MECHANICBYROUTINE}/${routineid}/${idworkshop}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
            }`
        }
      }
    );
    return status === 200 ?
      data.data.map(item => ({
        key: item.idmechanic,
        value: `${item.name} ${item.last_name}`,
        pic: item.profile_pic
      }))
      : [];
  } catch
  {
    notification.warning({
      message: 'Error',
      description: "Hubo un error consultando los datos.",
    })
    return [];
  }
}

export async function ChangeStatusRoutine(data) {
  return axios({
    method: 'POST',
    url: `${ENDPOINTS.MECHANIC.ROUTINE}`,
    data,
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  }).then(response => {
    notification.success({
      message: 'Exito',
      description: "Se ha cambiado el status con éxito",
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

export const getAppointmentsMechanicAssigned = async (idmechanic, fhiinitial, fhend) => {
  try {
    const { data, status } = await axios.get(
      `${ENDPOINTS.MECHANIC.APPOINTMENTSMECHANICASSIGNED}/${idmechanic}?fhinitial=${fhiinitial}&&fhend=${fhend}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
            }`
        }
      }
    );
    return status === 200 ?
      data.data.map(item => ({
        ...item
      }))
      : [];
  } catch
  {
    notification.warning({
      message: 'Error',
      description: "Hubo un error consultando los datos.",
    })
    return [];
  }
}

export async function manageApppointment(data, idAppointment) {
  let res;
  try {
    res = await axios({
      method: 'PUT',
      url: `${ENDPOINTS.MECHANIC.MANAGEAPPOINTMENT}/${idAppointment}`,
      data,
      headers: {
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
          }`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
  } catch (e) {
    console.log(e);
  }
  return res !== undefined ? res.status : res;
}


export const getIdMechanic = async iduser => {
  try {
    const { data, status } = await axios.get(
      `${ENDPOINTS.MECHANIC.GETIDMECHANIC}/${iduser}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
            }`
        }
      }
    );
    return status === 200 ? data : [];
  } catch
  {
    notification.warning({
      message: 'Error',
      description: "Hubo un error consultando los datos.",
    })
    return 0;
  }
}
