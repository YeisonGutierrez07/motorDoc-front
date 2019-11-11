import { notification } from "antd";
import { ENDPOINTS } from "constant/endPoints";
// import jwt from 'jsonwebtoken'
import _ from "lodash";
import axios from "axios";
import { store } from "index";
// import { JWT_SECRET } from 'constant/base'

export const getAuth = () => {
  const state = store.getState();
  const response = {
    "Content-Type": "application/json"
  };
  if (state.user.token) {
    response.Authorization = `Bearer ${state.user.token.token.token}`;
  }
  return {
    ...response
  };
};

export async function login(email, password) {
  try {
    const response = await axios.post(`${ENDPOINTS.AUTH.LOGIN}`, {
      email: email.trim(),
      password: password.trim()
    });
    if (response.data.status === "200") {
      const dataSave = {
        token: response.data.data.token,
        user: response.data.data.user,
        email
      };
      localStorage.setItem("user", JSON.stringify(dataSave));
      return response.data.data;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function createNewUser(data) {
  return new Promise((resolve, reject) => {
    return axios({
      method: "POST",
      url: `${ENDPOINTS.AUTH.REGISTER}`,
      data
    })
      .then(response => {
        notification.success({
          message: "Exito",
          description:
            "Se Creo su cuenta con exito, ya puedes usar todos nuestros servicios."
        });
        resolve(response.data.data);
      })
      .catch(() => {
        notification.error({
          message: "Error",
          description: "No se ha podido enviar la solicitud."
        });
        reject();
      });
  });
}

export function resetPasswordService(data) {
  return new Promise((resolve, reject) => {
    return axios({
      method: "PUT",
      url: `${ENDPOINTS.AUTH.RESET_PASSWORD}`,
      data,
      headers: {
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
      .then(response => {
        if (response.status === 200) {
          notification.success({
            message: "Exito",
            description: "Se cambio la contraseña con exito"
          });
          resolve(response);
        } else {
          notification.warning({
            message: "Error",
            description: response.data.message
          });
          reject();
        }
      })
      .catch(() => {
        notification.error({
          message: "Error",
          description: "No se podido enviar la solicitud."
        });
        reject();
      });
  });
}

export async function currentAccount({ token, ...data }) {
  let decoded = {
    decoded: null,
    token: null
  };
  if (!_.isEmpty(token)) {
    decoded = {
      decoded: true, // jwt.verify(token, JWT_SECRET),
      token: {
        token,
        ...data
      }
    };
  }
  return decoded;
}

export async function logout() {
  /*
  return firebaseAuth()
    .signOut()
    .then(() => true)
    */
  return true;
}
