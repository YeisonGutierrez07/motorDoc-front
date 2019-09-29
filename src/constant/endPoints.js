import { HOST_SITE_ENDPOINTS } from './base'

const AUTH = {
  LOGIN: `${HOST_SITE_ENDPOINTS}/login`,
  REQUEST_RESET_PASSWORD: `${HOST_SITE_ENDPOINTS}/user/RequestResetPassword`,
  RESET_PASSWORD: `${HOST_SITE_ENDPOINTS}/user/ResetPassword`,
  USERS: `${HOST_SITE_ENDPOINTS}/user/listUsers/`,
  // LOGIN: "https://a724d7ee.ngrok.io/login"
}

const COMPANIES = {
  GET_ALL: `${HOST_SITE_ENDPOINTS}/companies/`,
  CREATE: `${HOST_SITE_ENDPOINTS}/companies/create`,
  CHANGE_STATUS: `${HOST_SITE_ENDPOINTS}/companies/changeStatus`,
  DELETE: `${HOST_SITE_ENDPOINTS}/companies/deleteCompany/`,
}

const MECHANIC = {
  GET: `${HOST_SITE_ENDPOINTS}/mechanic/`,
}

export const ENDPOINTS = {
  AUTH,
  COMPANIES,
  MECHANIC
}

export default {
  ...ENDPOINTS,
}
