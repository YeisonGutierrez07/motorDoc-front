import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Authorize from 'components/LayoutComponents/Authorize';
import { Helmet } from 'react-helmet';
import { Calendar, Badge, Button, Spin, message, Modal, Row, Col, Input, DatePicker } from 'antd';
import moment from 'moment';
import { CardView } from '../appointment/components/cardview';
import { setAppointmentUser } from '../../../redux/appointment';
import { getAppointmentsByUsers, rateAppointment, cancelAppointment } from '../../../services/appointment';
import { formatNumber } from '../../../common';

const { TextArea } = Input;

export const AppointmentCalendar = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const format = 'l';
  const [loading, setLoading] = useState(true);
  const [defaultCurrentDate, setDefaultCurrentDate] = useState(moment());
  const [visible, setVisible] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [ratingValue, setRatingValue] = useState(5);
  const [loadingButtonQ, setLoadingButtonQ] = useState(false);
  const [loadingButtonC, setLoadingButtonC] = useState(false);

  const { appointmentUser } = useSelector(
    state => ({
      appointmentUser: state.appointment.appointmentUser
    }),
    shallowEqual
  );
  useEffect(() => {
    getData(defaultCurrentDate);
  }, []);

  const onPanelChange = () => {
    // this.isLoading(true);
    // this.getData(value);
  }

  const getListData = value => (
    appointmentUser.filter(x => moment(x.appointmentdate).format(format) === moment(value).format(format))
  );

  const getStatus = status => (
    [{ id: 0, text: 'Asignada', color: 'green' },
    { id: 1, text: 'Cumplida', color: 'gold' },
    { id: 2, text: 'Cancelada', color: 'gray' },
    { id: 3, text: 'Incumplida', color: 'red' }].filter(x => x.id === status)
  );

  const getData = async value => {
    const date = moment(value);
    const data = await getAppointmentsList(date);
    dispatch(setAppointmentUser(data));
    setDefaultCurrentDate(date);
    setLoading(false);
  }

  const showModal = item => {
    setVisible(true);
    setDataModal(item);
  };

  const getAppointmentsList = async date => {
    const fhinitial = date.format(format);
    const appointment = await getAppointmentsByUsers({
      fhinitial,
      fhend: moment(fhinitial).add(15, 'days').format(format)
    });
    if (appointment === undefined) {
      message.info('Citas no disponibles');
    }
    return appointment !== undefined ? appointment.map(x => ({
      id: x.idappointment,
      title: x.nameroutine,
      appointmentdate: moment(x.appointmentdate.replace('T', ' ').replace('Z', '')).format('L HH:mm:ss'),
      timeroutine: x.timeroutine,
      status: x.status,
      color: getStatus(x.status)[0].color,
      location: x.nameworkshop,
      mechanic: `${x.name} ${x.last_name}`,
      idmaintenance: x.idmaintenance,
      rated: x.idmaintenancerating > 0,
      costroutine: formatNumber(x.costroutine)
    })
    ) : [];
  }

  const onChangeDate = value => {
    const dateA = moment(defaultCurrentDate).format(format);
    const dateB = moment(value).format(format);
    if (dateA !== dateB) {
      setLoading(true);
      getData(value);
    }
  }

  const dateCellRender = value => {
    const listData = getListData(value);
    return (
      <ul className='events'>
        {listData.map(item => (
          <li key={item.id}>
            <Badge color={item.color} text={item.title} onClick={() => showModal(item)} />
          </li>
        ))}
      </ul>
    );
  }

  const onCancelAppointment = async id => {
    /* eslint no-restricted-globals:0 */
    if (confirm('¿Está seguro de cancelar su cita?')) {
      setLoadingButtonC(true);
      const res = await cancelAppointment(id);
      if(res === 200){
        message.success('Cita cancelada con éxito');
        getData(defaultCurrentDate);
        setVisible(false);
      }else{
        message.Erro('Hubo un error, por favor intenté de nuevo');
      }
    }
    setLoadingButtonC(false);
  }

  const refresh = () => {
    setLoading(true);
    getData(defaultCurrentDate);
    message.success('Citas cargadas correctamente');
  }

  const onChangeCommentary = e => {
    const { value } = e.target;
    setDataModal({ ...dataModal, commentary: value });
  };

  const onQualifyAppointment = async () => {
    setLoadingButtonQ(true);
    const res = await rateAppointment({
      stars: ratingValue,
      commentary: dataModal.commentary,
      idmaintenance: dataModal.idmaintenance
    });
    setVisible(false);
    if (res === 200) {
      message.success('Calificación enviada con éxito');
      getData(defaultCurrentDate);
      setVisible(false);
    } else {
      message.error('Hubo un error, por favor intente de nuevo');
    }
    setLoadingButtonQ(false);
  }
  if (loading)
    return(
      <Fragment>
        <Spin />
      </Fragment>);

  return(
    <Authorize roles={['CLIENT']} redirect to='/404'>
      <Helmet title='Mis Citas' />
      <CardView
        title='Calendario de citas'
        body={
          <Fragment>
            <DatePicker onChange={onChangeDate} defaultValue={moment(defaultCurrentDate, 'LL')} format='LL' />
              &nbsp;&nbsp;&nbsp;
            <Button
              onClick={() => history.push('/clientsPages/workshpsList')}
              type='primary'
              icon='calendar'
            >
              Agendar Cita
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button icon='redo' onClick={refresh}>Recargar</Button>
            <Calendar
              dateCellRender={dateCellRender}
              onPanelChange={onPanelChange}
              mode='month'
            />
          </Fragment>
        }
      />
      {dataModal.status !== undefined ?
        <Fragment>
          <Modal
            title={dataModal.title}
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
          >
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Row>
                <Col>
                  <p align='left'><b>Lugar:</b> {dataModal.location}</p>
                </Col>
                <Col>
                  <p align='left'><b>Fecha y Hora:</b> {dataModal.appointmentdate}</p>
                </Col>
                <Col>
                  <p align='left'><b>Tiempo estimado:</b> {dataModal.timeroutine} minutos</p>
                </Col>
                <Col>
                  <p align='left'><b>Costo:</b> {dataModal.costroutine} COP</p>
                </Col>
                <Col>
                  <p align='left'><b>Mecánico:</b> {dataModal.mechanic}</p>
                </Col>
                <Col>
                  <p align='left'>
                    <b>Estado:</b> {getStatus(dataModal.status)[0].text}
                    {dataModal.status === 0 ? <Button type='link' onClick={() => { onCancelAppointment(dataModal.id); }} loading={loadingButtonC}>Cancelar Cita</Button> : null}
                  </p>
                </Col>
                {dataModal.status === 1 && !dataModal.rated ?
                  <Col>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                      <Row>
                        <Col>
                          <Typography component="legend">Calificar servicio</Typography>
                          <Rating
                            name="simple-controlled"
                            value={ratingValue}
                            onChange={(event, newValue) => {
                              setRatingValue(newValue);
                            }}
                          />
                        </Col>
                        <Col>
                          <TextArea rows={4} autoSize maxLength={200} onChange={onChangeCommentary} />
                        </Col>
                        <Col>
                          &nbsp;
                        </Col>
                        <Col>
                          <Button type='primary' loading={loadingButtonQ} onClick={onQualifyAppointment}>Enviar</Button>
                        </Col>
                      </Row>
                    </Box>
                  </Col>
                  : null}
              </Row>
            </Box>
          </Modal>
        </Fragment>
        : null}
    </Authorize>
  );
}

export default AppointmentCalendar;