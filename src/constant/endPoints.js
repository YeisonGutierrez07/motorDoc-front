import { HOST_SITE_ENDPOINTS } from './base'

const AUTH = {
  LOGIN: `${HOST_SITE_ENDPOINTS}/login`,
  REQUEST_RESET_PASSWORD: `${HOST_SITE_ENDPOINTS}/user/RequestResetPassword`,
  RESET_PASSWORD: `${HOST_SITE_ENDPOINTS}/user/ResetPassword`,
  USERS: `${HOST_SITE_ENDPOINTS}/user/listUsers/`,
  // LOGIN: "https://a724d7ee.ngrok.io/login"
}

const THEME = {
  GET: `${HOST_SITE_ENDPOINTS}/theme/`,
}

const CUPON = {
  GET: `${HOST_SITE_ENDPOINTS}/auth/discountCode/GetCoupons`,
  GET_ONE: `${HOST_SITE_ENDPOINTS}/auth/discountCode/GetCoupons?id=1`,
  APPROVE: `${HOST_SITE_ENDPOINTS}/auth/discountCode/ApproveRequest`,
  CREATE: `${HOST_SITE_ENDPOINTS}/auth/discountCode/CreateCoupon`,
  UPDATE: `${HOST_SITE_ENDPOINTS}/auth/discountCode/UpdateCoupon`,
  DELETE: `${HOST_SITE_ENDPOINTS}/auth/discountCode/DeleteCoupon`,
}

const CAMPANIA = {
  CREATE: `${HOST_SITE_ENDPOINTS}/auth/campaigns/CreateCampaigns`,
  EDIT: `${HOST_SITE_ENDPOINTS}/auth/campaigns/UpdateCampaigns`,
  DELETE: `${HOST_SITE_ENDPOINTS}/auth/campaigns/DeleteCampaigns`,
  GET_ALL: `${HOST_SITE_ENDPOINTS}/auth/campaigns/GetCampaigns`,
  GET_BY_ID: `${HOST_SITE_ENDPOINTS}/auth/campaigns/GetCampaigns?id=`,
}

const SEGMENTS = {
  GET_ALL: `${HOST_SITE_ENDPOINTS}/auth/segments/GetSegments`,
}

const COMERCIO = {
  GET: `${HOST_SITE_ENDPOINTS}/auth/commerce/GetCommerce`,
  GET_ONE: `${HOST_SITE_ENDPOINTS}/auth/store/GetStore?commerce_id=`,
}

const TIME = {
  REQUEST: 'http://worldtimeapi.org/api/ip',
  PROXY: 'https://cors-anywhere.herokuapp.com/',
}

export const ENDPOINTS = {
  AUTH,
  THEME,
  TIME,
  CUPON,
  COMERCIO,
  CAMPANIA,
  SEGMENTS,
}

export default {
  ...ENDPOINTS,
}
