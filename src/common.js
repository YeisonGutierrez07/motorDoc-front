import moment from 'moment';

export const disabledDate = current => {
    // const fecha = moment().add(7, 'days').diff(current, 'days');
    return moment().isAfter(current) &&
        moment().format('l') !== moment(current).format('l') 
}

export default [];