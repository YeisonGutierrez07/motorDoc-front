import { store } from "index";

const menuSUPERADMIN = [
  {
    title: "Empresas",
    key: "companies",
    url: "/superAdmin/companies",
    icon: "icmn icmn-home"
  }
];

const menuCOMPANY = [
  {
    title: "Principal",
    key: "companies",
    url: "/company/dashboard",
    icon: "icmn icmn-home"
  },
  {
    title: "Talleres",
    key: "formTaller",
    url: "/company/list",
    icon: "icmn icmn-users"
  }
];

const menuWORKSHOP = [
  {
    title: "Principal",
    key: "companies",
    url: "/workshopPages/dashboard",
    icon: "icmn icmn-home"
  },
  {
    title: "Mecanicos",
    key: "mecanicos",
    url: "/workshopPages/listMechanics",
    icon: "icmn icmn-users"
  },
  {
    title: "Rutinas",
    key: "Rutinas",
    url: "/workshopPages/createRoutine",
    icon: "icmn icmn-cogs"
  },
  {
    title: "Chat",
    key: "chat",
    url: "/globals/MessagingWorkshop",
    icon: "icmn icmn-bubbles"
  },
  {
    title: "Calendario",
    key: "pages",
    icon: "icmn icmn-calendar",
    children: [
      {
        title: "Mi Horario",
        key: "mySchedule",
        url: "/globals/mySchedule/1"
      },
      {
        title: "Citas Agendadas",
        key: "ScheduledAppointments",
        url: "/globals/mySchedule/2"
      },
      {
        title: "Tiempos Disponibles",
        key: "AvailableTimes",
        url: "/globals/mySchedule/3"
      }
    ]
  }
];

const menuMECHANIC = [
  {
    title: "Principal",
    key: "dashoboard",
    url: "/mechanicPages/dashboard",
    icon: "icmn icmn-home"
  },
  {
    title: "Mis Citas Atendidas",
    key: "Atendidas",
    url: "/mechanicPages/dashboard",
    icon: "icmn icmn-newspaper"
  },
  {
    title: "Mis Citas del Dia",
    key: "CitasDay",
    url: "/mechanicPages/dashboard",
    icon: "icmn icmn-newspaper"
  },
  {
    title: "Todas las citas",
    key: "CitasAll",
    url: "/mechanicPages/dashboard",
    icon: "icmn icmn-newspaper"
  }
];

const menuCLIENT = [
  {
    title: "Principal",
    key: "dashoboard",
    url: "/clientsPages/dashboard",
    icon: "icmn icmn-home"
  },
  {
    title: "Talleres",
    key: "pages",
    icon: "icmn icmn-stack",
    children: [
      {
        title: "Buscar taller",
        key: "workshpsList",
        url: "/clientsPages/workshpsList"
      },
      {
        title: "Ver mapa de talleres",
        key: "mapWorkShops",
        url: "/clientsPages/mapWorkShops"
      }
    ]
  },
  {
    title: "Chat",
    key: "chat",
    url: "/globals/MessagingChat",
    icon: "icmn icmn-bubbles"
  },
  {
    title: "Citas",
    key: "citas",
    url: "/clientsPages/appointmentCalendar",
    icon: "icmn icmn-calendar"
  },
  {
    title: "Mis vehiculos",
    key: "vehicles",
    url: "/clientsPages/vehicles",
    icon: "icmn icmn-steam"
  }
];

export function getLeftMenuData() {
  return new Promise(resolve => {
    setTimeout(() => {
      const state = store.getState();
      switch (state.user.role) {
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
        case "CLIENT":
          resolve(menuCLIENT);
          break;
        default:
          resolve([]);
      }
    }, 100);
  });
}

export async function getTopMenuData() {
  return new Promise(resolve => {
    setTimeout(() => {
      const state = store.getState();

      switch (state.user.role) {
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
        case "CLIENT":
          resolve(menuCLIENT);
          break;
        default:
          resolve([]);
      }
    }, 100);
  });
}
