import React, { PureComponent, Fragment } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Authorize from 'components/LayoutComponents/Authorize';
import { Helmet } from 'react-helmet';
import { Calendar, Badge, Button, Spin, message, Modal, Row, Col, Input } from 'antd';
import moment from 'moment';
import { CardView } from '../appointment/components/cardview';
import { setAppointmentUser } from '../../../redux/appointment';
import { getAppointmentsByUsers } from '../../../services/appointment';
import { formatNumber } from '../../../common';

const { TextArea } = Input;

export class appointmentCalendar extends PureComponent {
  format = 'l';

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      defaultCurrentDate: moment(),
      visible: false,
      dataModal: {},
      ratingValue: 5
    }
  }

  componentDidMount() {
    const { defaultCurrentDate } = this.state;
    this.getData(defaultCurrentDate);
  }

  setValue = value => {
    this.setState({
      ratingValue: value
    });
  }

  isLoading = value => {
    this.setState({
      loading: value
    });
  }

  onSelectedDate = value => {
    const { defaultCurrentDate } = this.state;
    const dateA = moment(defaultCurrentDate).format(this.format);
    const dateB = moment(value).format(this.format);
    if (dateA !== dateB) {
      this.isLoading(true);
      this.getData(value);
    }
  }

  onPanelChange = value => {
    this.isLoading(true);
    this.getData(value);
  }

  getListData = value => {
    const { appointmentUser } = this.props;
    return appointmentUser.filter(x => moment(x.appointmentdate).format(this.format) === moment(value).format(this.format));
  }

  getStatus = status => (
    [{ id: 0, text: 'Asignada', color: 'green' },
    { id: 1, text: 'Cumplida', color: 'gold' },
    { id: 2, text: 'Cancelada', color: 'gray' },
    { id: 3, text: 'Incumplida', color: 'red' }].filter(x => x.id === status)
  );

  getData = async value => {
    const date = moment(value);
    const data = await this.getAppointmentsList(date);
    const { setAppointmentUser: setAppointmentUserR } = this.props;
    setAppointmentUserR(data);

    this.setState({
      defaultCurrentDate: date,
      loading: false
    });
  }

  showModal = item => {
    console.log(item);
    this.setState({
      visible: true,
      dataModal: item
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  getAppointmentsList = async date => {
    const fhinitial = date.format(this.format);
    const appointment = await getAppointmentsByUsers({
      fhinitial,
      fhend: moment(fhinitial).add(15, 'days').format(this.format)
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
      color: this.getStatus(x.status)[0].color,
      location: x.nameworkshop,
      mechanic: `${x.name} ${x.last_name}`,
      idmaintenance: x.idmaintenance,
      rated: x.idmaintenancerating > 0,
      costroutine: formatNumber(x.costroutine)
    })
    ) : [];
  }

  dateCellRender = value => {
    const listData = this.getListData(value);
    return (
      <ul className='events'>
        {listData.map(item => (
          <li key={item.id}>
            <Badge color={item.color} text={item.title} onClick={() => this.showModal(item)} />
          </li>
        ))}
      </ul>
    );
  }

  cancelAppointment = id => {
    /* eslint no-restricted-globals:0 */
    if (confirm('¿Está seguro de cancelar su cita?')) {
      console.log(id);
    }
  }

  refresh = () => {
    const { defaultCurrentDate } = this.state;
    this.isLoading(true);
    this.getData(defaultCurrentDate);
    message.success('Citas cargadas correctamente');
  }

  render() {
    const { history } = this.props;
    const { loading, visible, dataModal, ratingValue, defaultCurrentDate } = this.state;
    if (loading)
      return (
        <Fragment>
          <Spin />
        </Fragment>);

    return (
      <Authorize roles={['CLIENT']} redirect to='/404'>
        <Helmet title='Mis Citas' />
        <CardView
          title='Calendario de citas'
          body={
            <Fragment>
              <Button
                onClick={() => history.push('/clientsPages/workshpsList')}
                type='primary'
                icon='calendar'
              >
                Agendar Cita
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button icon='redo' onClick={this.refresh}>Recargar</Button>
              &nbsp;&nbsp;&nbsp;
              Fecha seleccionada: {defaultCurrentDate.format('LL')}
              <Calendar
                dateCellRender={this.dateCellRender}
                onPanelChange={this.onPanelChange}
                mode='month'
                onSelect={this.onSelectedDate}
              />
            </Fragment>
          }
        />
        {dataModal.status !== undefined ?
          <Fragment>
            <Modal
              title={dataModal.title}
              visible={visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
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
                      <b>Estado:</b> {this.getStatus(dataModal.status)[0].text}
                      {dataModal.status === 0 ? <Button type='link' onClick={() => { this.cancelAppointment(dataModal.id); }}>Cancelar Cita</Button> : null}
                      {dataModal.status === 1 && !dataModal.rated ? <Button type='link'>Calificar Cita</Button> : null}
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
                                this.setValue(newValue);
                              }}
                            />
                          </Col>
                          <Col>
                            <TextArea rows={4} autoSize />
                          </Col>
                          <Col>
                            &nbsp;
                          </Col>
                          <Col>
                            <Button type='primary'>Enviar</Button>
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
}

const mapStateToProps = (data) => {
  return {
    appointmentUser: data.appointment.appointmentUser
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setAppointmentUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(appointmentCalendar);