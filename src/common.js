import moment from 'moment';

export const disabledDate = current => {
    // const fecha = moment().add(7, 'days').diff(current, 'days');
    return moment().isAfter(current) &&
        moment().format('l') !== moment(current).format('l')
}

export const truncateAppointments = (appointmentdate, timeroutine) => {
    const format = 'l HH:mm:ss';
    const now = moment().format(format);
    const fechaInicial = moment(`${appointmentdate} 07:00:00`).format(format);
    const fechaFinal = moment(`${appointmentdate} 17:00:00`);
    let start = fechaInicial;
    let indexDay = 3;
    let end = fechaFinal.format(format);

    if (end < now) {
        start = moment(start).add(1, 'days').format(format);
        indexDay = 2;
    }

    const diff = fechaFinal.diff(fechaInicial, 'hours');
    const totalHours = diff - timeroutine / 60;
    let dayandhours = [{ index: 0, hour: [moment(start).format('HH:mm:ss')] }];
    const days = [];
    let index = 1;
    [...Array(indexDay)].map((x, i) => i).forEach(day => {

        // if(start < now)
        // {
        //     // dayandhours.hour.slice(1);
        //     start = moment(`${moment(start).format('l')} ${moment(now).format('HH:mm:ss')}`).format(format);
        // }else{
        //     start = moment(`${moment(start).format('l')} 07:00:00`).format(format);
        // }

        start = moment(start).add(day, 'days').format(format);
        end = moment(start).add(totalHours, 'hours').format(format);

        while (start < end) {
            start = moment(start).add(timeroutine, 'minutes').format(format);
            dayandhours.index = index;
            dayandhours[0].hour.push(moment(start).format('HH:mm:ss'));
        }
        index += 1;
        days.push({ index: day, day: moment(start).format('LL'), dayandhours });
        start = `${moment(start).format('l')} 07:00:00`;
        dayandhours = [{ index: 0, hour: [moment(start).format('HH:mm:ss')] }];
    });
    return days;
}

export const formatNumber = number => (new Intl.NumberFormat("es-CO").format(number));

export const formatNumberDecimal = value => {
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

export const getStatus = status => (
    [{ id: 0, text: 'Asignada', color: 'green' },
    { id: 1, text: 'Cumplida', color: 'gold' },
    { id: 2, text: 'Cancelada', color: 'gray' },
    { id: 3, text: 'Incumplida', color: 'red' }].filter(x => x.id === status)
  );

export default [];