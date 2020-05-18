import moment from 'moment';

export const disabledDate = current => {
    // const fecha = moment().add(7, 'days').diff(current, 'days');
    return moment().isAfter(current) &&
        moment().format('l') !== moment(current).format('l') 
}

export const truncateAppointments = (appointmentdate, timeroutine) => {
    const format = 'l HH:mm:ss';
    // const now = moment().format(format);
    const fechaInicial = moment(`${appointmentdate} 07:00:00`).format(format);
    const fechaFinal = moment(`${appointmentdate} 17:00:00`);
    let start = fechaInicial;
    let end = fechaFinal.format(format);
    const diff = fechaFinal.diff(fechaInicial, 'hours');
    const totalHours = diff - timeroutine / 60;
    let dayandhours = [{ index: 0, hour: [moment(start).format('HH:mm:ss')]}]; 
    const days = [];
    let index = 1;
    [...Array(3)].map((x, i) => i).forEach(day => {
        // if(start < now)
        // {
        //     // dayandhours.hour.slice(1);
        //     start = moment(`${moment(start).format('l')} ${moment(now).format('HH:mm:ss')}`).format(format);
        // }else{
        //     start = moment(`${moment(start).format('l')} 07:00:00`).format(format);
        // }
        start = moment(start).add(day, 'days').format(format);
        end = moment(start).add(totalHours, 'hours').format(format);
        console.log(start, end);
       
        while( start < end)
        {
            start = moment(start).add(timeroutine, 'minutes').format(format);
            dayandhours.index = index;
            dayandhours[0].hour.push(moment(start).format('HH:mm:ss'));
        }
        index += 1;
        days.push({ index: day, day: moment(start).format("Do MMM YY"), dayandhours});
        start = `${moment(start).format('l')} 07:00:00`;
        dayandhours = [{ index: 0, hour: [moment(start).format('HH:mm:ss')] }];
    });
    console.log(days);
    return days;
}
export default [];