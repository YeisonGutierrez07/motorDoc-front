import { HOST_SITE_ENDPOINTS } from './base'

const AUTH = {
  LOGIN: `${HOST_SITE_ENDPOINTS}/login`,
  REQUEST_RESET_PASSWORD: `${HOST_SITE_ENDPOINTS}/user/RequestResetPassword`,
  RESET_PASSWORD: `${HOST_SITE_ENDPOINTS}/user/ResetPassword`,
  USERS: `${HOST_SITE_ENDPOINTS}/user/listUsers/`,
  // LOGIN: "https://a724d7ee.ngrok.io/login"
}


export const ENDPOINTS = {
  AUTH,
}

export default {
  ...ENDPOINTS,
}
