import moment from 'moment';

export const disabledDate = current => {
    // const fecha = moment().add(7, 'days').diff(current, 'days');
    return moment().isAfter(current) &&
        moment().format('l') !== moment(current).format('l') 
}

export const truncateAppointments = (appointmentdate, timeroutine) => {
    const format = 'l HH:mm:ss';
    const fechaInicial = moment(`${appointmentdate} 07:00:00`);
    const fechaFinal = moment(`${appointmentdate} 17:00:00`);
    let start = fechaInicial.format(format);
    let end = fechaFinal.format(format);
    const diff = fechaFinal.diff(fechaInicial, 'hours');
    const totalHours = diff - timeroutine / 60;
    const dayandhours = [start]; 

    [...Array(3)].map((x, i) => i).forEach(day => {
        start = moment(start).add(day, 'days').format(format);
        end = moment(start).add(totalHours, 'hours').format(format);
        while( start < end)
        {
            start = moment(start).add(timeroutine, 'minutes').format(format);
            dayandhours.push(start);
        }
    });

    dayandhours.forEach(x => {
        console.log(x);
    });
}
export default [];