import { HOST_SITE_ENDPOINTS, HOST_SITE_ENDPOINTS_NET } from "./base";

const AUTH = {
  LOGIN: `${HOST_SITE_ENDPOINTS}/login`,
  REQUEST_RESET_PASSWORD: `${HOST_SITE_ENDPOINTS}/user/RequestResetPassword`,
  RESET_PASSWORD: `${HOST_SITE_ENDPOINTS}/user/reset`,
  USERS: `${HOST_SITE_ENDPOINTS}/user/listUsers/`,
  REGISTER: `${HOST_SITE_ENDPOINTS}/register`,
  GET_WORKSHOP: `${HOST_SITE_ENDPOINTS}/user/myWorkShop`
  // LOGIN: "https://a724d7ee.ngrok.io/login"
};

const COMPANIES = {
  GET_ALL: `${HOST_SITE_ENDPOINTS}/companies/`,
  CREATE: `${HOST_SITE_ENDPOINTS}/companies/create`,
  CHANGE_STATUS: `${HOST_SITE_ENDPOINTS}/companies/changeStatus`,
  DELETE: `${HOST_SITE_ENDPOINTS}/companies/deleteCompany/`,
  MY_COMPANY: `${HOST_SITE_ENDPOINTS}/companies/myCompany`,
  MIS_WORKSHOP: `${HOST_SITE_ENDPOINTS}/companies/myWorkShop`
};

const WORKSHOP = {
  GET: `${HOST_SITE_ENDPOINTS}/workshop/`,
  GET_BY_ID: `${HOST_SITE_ENDPOINTS}/workshop/search/`,
  GET_ALL: `${HOST_SITE_ENDPOINTS}/workshop/all`,
  CREATE: `${HOST_SITE_ENDPOINTS}/workshop/create`
};

const MECHANIC = {
  GET: `${HOST_SITE_ENDPOINTS}/mechanic/`,
  CREATE: `${HOST_SITE_ENDPOINTS}/mechanic/create`,
  MIS_MECHANICS: `${HOST_SITE_ENDPOINTS}/mechanic/myMechanics`,
  TRATING_MECHNIC: `${HOST_SITE_ENDPOINTS}/routines/getTreatingMechanic/`,
  MECHANICBYROUTINE: `${HOST_SITE_ENDPOINTS}/routines/mechanics/`,
  APPOINTMENTSMECHANICASSIGNED: `${HOST_SITE_ENDPOINTS}/appointments/mechanics`,
  MANAGEAPPOINTMENT: `${HOST_SITE_ENDPOINTS_NET}mechanic/`,
};

const ROUTINES = {
  GET: `${HOST_SITE_ENDPOINTS}/routines`,
  GET_BY_WORKSHOP: `${HOST_SITE_ENDPOINTS}/routines/byWorkshop`,
  GET_BY_WORKSHOP_ID: `${HOST_SITE_ENDPOINTS}/routines/byWorkshopID`,
  ADD_ROUTINE: `${HOST_SITE_ENDPOINTS_NET}routine`
};

const ROUTINESV2 = {
  GET: `${HOST_SITE_ENDPOINTS_NET}routine`,
  GET_BY_WORKSHOP_ID: `${HOST_SITE_ENDPOINTS_NET}routine/`
};

const BRANDS = {
  GET_ALL: `${HOST_SITE_ENDPOINTS}/brands`
};

const VEHICLES = {
  GET_ALL: `${HOST_SITE_ENDPOINTS}/vehicles`,
  CREATE: `${HOST_SITE_ENDPOINTS}/vehicles`
};

const REFERENCEBRAND = {
  GET: `${HOST_SITE_ENDPOINTS_NET}referencebrand/`,
};

const APPOINTMENTS = {
  GET_APPOINTMENT: `${HOST_SITE_ENDPOINTS}/appointments`,
  ADD_APPOINTMENT:  `${HOST_SITE_ENDPOINTS_NET}appointment`,
  GET_APPOINTMENT_NOT_AVAILABLES: `${HOST_SITE_ENDPOINTS}/appointments/notAvailables`,
  GET_ALL_APPOINTMENT_BYUSER: `${HOST_SITE_ENDPOINTS}/appointments/byUser`,
  RATEAPPOINTMENT: `${HOST_SITE_ENDPOINTS}/appointments/QualifyAppointment`,
}

export const ENDPOINTS = {
  AUTH,
  COMPANIES,
  WORKSHOP,
  MECHANIC,
  ROUTINES,
  BRANDS,
  VEHICLES,
  ROUTINESV2,
  REFERENCEBRAND,
  APPOINTMENTS
};

export default {
  ...ENDPOINTS
};
