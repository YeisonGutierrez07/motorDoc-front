import React, { Fragment, useState } from 'react';
import { DatePicker, Spin, message } from 'antd';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { CardView } from '../appointment/components/cardview';
import Authorize from '../../../components/LayoutComponents/Authorize';
import { getAppointmentsByUsers } from '../../../services/appointment';
import { formatNumber, getStatus } from '../../../common';

const { RangePicker } = DatePicker;

export const HistoricAppointment = () => {

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const getData = async (fhinitial, fhend) => {
    const appointment = await getAppointmentsByUsers({
      fhinitial,
      fhend,
    });
    if (appointment === undefined) {
      message.info('Citas no disponibles');
    }
    console.log(appointment);
    return appointment !== undefined ? appointment.map(x => ({
      id: x.idappointment,
      title: x.nameroutine,
      appointmentdate: moment(x.appointmentdate.replace('T', ' ').replace('Z', '')).format('L HH:mm:ss'),
      timeroutine: x.timeroutine,
      status: getStatus(x.status)[0].text,
      color: getStatus(x.status)[0].color,
      location: x.nameworkshop,
      mechanic: `${x.name} ${x.last_name}`,
      idmaintenance: x.idmaintenance,
      rated: x.idmaintenancerating > 0,
      costroutine: formatNumber(x.costroutine),
      kilometraje: x.kilometraje,
      observaciones: x.observaciones
    })
    ) : [];
  }

  const classes = useStyles();

  const onChangeDate = async (fi, fe) => {
    setLoading(true);
    const res = await getData(fe[0], fe[1]);
    if (res.length > 0) {
      setRows(res);
    } else {
      message.info('No hay datos disponibles');
      setRows([]);
    }
    setLoading(false);
  }

  const loadingData = () => {
    if (loading) {
      return (
        <Fragment>
          <Spin />
        </Fragment>
      );
    }
    return null;
  };

  return (
    <Authorize roles={['CLIENT']} redirect to='/404'>
      <Helmet title='Citas' />
      <CardView
        title='Historico Citas'
        body={
          <Fragment>
            {loadingData()}
            <RangePicker onChange={onChangeDate} />
            <br /><br />
            {rows.length > 0 ?
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Rutina</TableCell>
                      <TableCell align="right">Mecánico</TableCell>
                      <TableCell align="right">Lugar</TableCell>
                      <TableCell align="right">Fecha y hora</TableCell>
                      <TableCell align="right">Costo</TableCell>
                      <TableCell align="right">Tiempo estimado</TableCell>
                      <TableCell align="right">Kilometraje</TableCell>
                      <TableCell align="right">Observaciones</TableCell>
                      <TableCell align="right">Estado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell align="right">{row.title}</TableCell>
                        <TableCell align="right">{row.mechanic}</TableCell>
                        <TableCell align="right">{row.location}</TableCell>
                        <TableCell align="right">{row.appointmentdate}</TableCell>
                        <TableCell align="right">{row.costroutine}</TableCell>
                        <TableCell align="right">{row.timeroutine}</TableCell>
                        <TableCell align="right">{row.kilometraje}</TableCell>
                        <TableCell align="right">{row.observaciones}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              : null}
          </Fragment>}
      />
    </Authorize>
  );
}
export default HistoricAppointment;