const AUTH = {
  BASIC: {
    SET_STATE: 'user/SET_STATE',
  },
  ASYNC: {
    LOGIN: 'user/LOGIN',
    LOGOUT: 'user/LOGOUT',
  },
  WORKER: {
    LOAD_CURRENT_ACCOUNT: 'user/LOAD_CURRENT_ACCOUNT',
    LOAD_LOGOUT: 'user/LOAD_LOGOUT',
  },
}

const THEME = {
  ASYNC: {
    GET: 'theme/GET_THEME',
  },
  WORKER: {
    LOAD_CURRENT_THEME: 'theme/LOAD_CURRENT_THEME',
  },
}

const MESSAGES = {
  ERROR: 'message/ERROR',
}

const TIME = {
  ASYNC: {
    GET: 'time/GET',
  },
}

export const ACTION_TYPES = {
  MESSAGES,
  AUTH,
  THEME,
  TIME,
}

export default {
  ...ACTION_TYPES,
}
