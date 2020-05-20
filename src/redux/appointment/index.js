// Definición de acciones
export const SET_ROUTINES = 'SET_ROUTINES';
export const SET_SELECTED_ROUTINE = 'SET_SELECTED_ROUTINE';
export const SET_VEHICLES = 'SET_VEHICLES';
export const SET_MECHANICS = 'SET_MECHANICS';
export const SET_SELECTED_VEHICLES = 'SET_SELECTED_VEHICLES';
export const SET_DATE_APPOINTMENT = 'SET_DATE_APPOINMENT';
export const SET_WORKSHOPS = 'SET_WORKSHOPS';
export const SET_WORKSHOP_SELECTED = 'SET_WORKSHOP_SELECTED';
export const SET_MECHANIC_TREATING_SELECTED = 'SET_MECHANIC_TREATING_SELECTED';
export const SET_MECHANIC_SELECTED = 'SET_MECHANIC_SELECTED';
export const SET_DATE_HOUR_APPOINTMENT = 'SET_DATE_HOUR_APPOINMENT';

// Estado inicial
export const initialState = {
  routines: [],
  vehicles: [],
  workshops: [],
  mechanics: [],
  routineSelected: [],
  vehicleSelected: undefined,
  dateAppointment: undefined,
  workshopSelected: undefined,
  mechanicTreatingSelected: undefined,
  mechanicSelected: undefined,
  dateHourAppointment: null
};

// Función reductora
export default function appointment(state = initialState, action) {
  switch (action.type) {
    case SET_ROUTINES:
      return {
        ...state,
        routines: action.routines
      };
    case SET_SELECTED_ROUTINE:
      return {
        ...state,
        routineSelected: [...state.routines.filter(x => x.key === action.routineSelected) ]
      };
    case SET_VEHICLES:
      return {
        ...state,
        vehicles: action.vehicles
      };
    case SET_MECHANICS:
      return {
        ...state,
        mechanics: action.mechanics
      }
    case SET_SELECTED_VEHICLES:
      return {
        ...state,
        vehicleSelected: action.vehicleSelected
      };
    case SET_DATE_APPOINTMENT:
      return {
        ...state,
        dateAppointment: action.dateAppointment
      };
    case SET_WORKSHOPS:
      return {
        ...state,
        workshops: action.workshops
      };
    case SET_WORKSHOP_SELECTED:
      return {
        ...state,
        workshopSelected: action.workshopSelected
      };
    case SET_MECHANIC_TREATING_SELECTED:
      return {
        ...state,
        mechanicTreatingSelected: action.mechanicTreatingSelected
      }
    case SET_MECHANIC_SELECTED:
      return {
        ...state,
        mechanicSelected: action.mechanicSelected
      }
    case SET_DATE_HOUR_APPOINTMENT:
      return {
        ...state,
        dateHourAppointment: action.dateHourAppointment
      }
    default:
      return state;
  }
}

// Creadores de acciones

export const setRoutines = routines => ({
  type: SET_ROUTINES,
  routines
});

export const setSelectedRoutine = routineSelected => ({
  type: SET_SELECTED_ROUTINE,
  routineSelected
});

export const setVehicles = vehicles => ({
  type: SET_VEHICLES,
  vehicles
});

export const setVehicleSelected = vehicleSelected => ({
  type: SET_SELECTED_VEHICLES,
  vehicleSelected
});

export const setDateAppointment = dateAppointment => ({
  type: SET_DATE_APPOINTMENT,
  dateAppointment
});

export const setWorkshops = workshops => ({
  type: SET_WORKSHOPS,
  workshops
});

export const setMechanics = mechanics => ({
  type: SET_MECHANICS,
  mechanics
});

export const setWorkshopSelected = workshopSelected => ({
  type: SET_WORKSHOP_SELECTED,
  workshopSelected
});

export const setTreatingMechanicSelected = mechanicTreatingSelected => ({
  type: SET_MECHANIC_TREATING_SELECTED,
  mechanicTreatingSelected
});

export const setMechanicSelected = mechanicSelected => ({
  type: SET_MECHANIC_SELECTED,
  mechanicSelected
});

export const setDateHourAppointment =  dateHourAppointment => ({
  type: SET_DATE_HOUR_APPOINTMENT,
  dateHourAppointment
});