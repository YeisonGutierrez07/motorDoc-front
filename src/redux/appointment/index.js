// Definición de acciones
export const SET_ROUTINES = "SET_ROUTINES";
export const SET_SELECTED_ROUTINE = "SET_SELECTED_ROUTINE";
export const SET_VEHICLES = "SET_VEHICLES";
export const SET_SELECTED_VEHICLES = "SET_SELECTED_VEHICLES";
export const SET_DATE_APPOINTMENT = "SET_DATE_APPOINMENT";
export const SET_WORKSHOPS = "SET_WORKSHOPS";
export const SET_WORKSHOP_SELECTED = "SET_WORKSHOP_SELECTED";

// Estado inicial
export const initialState = {
  routines: [],
  vehicles: [],
  workshops: [],
  routineSelected: undefined,
  vehicleSelected: undefined,
  dateAppointment: undefined,
  workshopSelected: undefined
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
        routineSelected: action.routineSelected
      };
    case SET_VEHICLES:
      return {
        ...state,
        vehicles: action.vehicles
      };
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

export const setWorkshopSelected = workshopSelected => ({
  type: SET_WORKSHOP_SELECTED,
  workshopSelected
});
