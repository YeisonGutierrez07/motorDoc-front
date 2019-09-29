import { store } from 'index'

const menuSUPERADMIN = [
  {
    title: 'Empresas',
    key: 'companies',
    url: '/superAdmin/companies',
    icon: 'icmn icmn-home',
  },
]

const menuCOMPANY = [
  {
    title: 'Principal',
    key: 'companies',
    url: '/company/dashboard',
    icon: 'icmn icmn-home',
  },
]

const menuWORKSHOP = [
  {
    title: 'Principal',
    key: 'companies',
    url: '/workshopPages/dashboard',
    icon: 'icmn icmn-home',
  },
]

const menuMECHANIC = [
  {
    title: 'Principal',
    key: 'companies',
    url: '/mechanicPages/dashboard',
    icon: 'icmn icmn-home',
  },
]

export function getLeftMenuData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const state = store.getState()
      switch(state.user.role){
        case "SUPERADMIN": 
          resolve(menuSUPERADMIN);
          break;
        case "COMPANY": 
          resolve(menuCOMPANY);
          break;
        case "WORKSHOP": 
          resolve(menuWORKSHOP);
          break;
        case "MECHANIC": 
          resolve(menuMECHANIC);
          break;
        default: resolve([]);
      }
    }, 10);
  })
}
export async function getTopMenuData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const state = store.getState()
      switch(state.user.role){
        case "SUPERADMIN": 
          resolve(menuSUPERADMIN);
          break;
        case "COMPANY": 
          resolve(menuCOMPANY);
          break;
        case "WORKSHOP": 
          resolve(menuWORKSHOP);
          break;
        case "MECHANIC": 
          resolve(menuMECHANIC);
          break;
        default: resolve([]);
      }
    }, 10);
  })
}
