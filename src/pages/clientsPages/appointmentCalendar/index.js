import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Authorize from 'components/LayoutComponents/Authorize';
import { Helmet } from 'react-helmet';
import { Calendar, Badge, Button, Spin, message, Modal } from 'antd';
import moment from 'moment';
import { CardView } from '../appointment/components/cardview';
import { setAppointmentUser } from '../../../redux/appointment';
import { getAppointmentsByUsers } from '../../../services/appointment';


export class appointmentCalendar extends PureComponent {
  format = 'l';

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      defaultCurrentDate: moment().utc().add(-5, 'hours'),
      visible: false
    }
  }

  componentDidMount() {
    const { defaultCurrentDate } = this.state;
    this.getData(defaultCurrentDate);
  }

  isLoading = value => {
    this.setState({
      loading: value
    });
  }

  onSelectedDate = value => {
    this.isLoading(true);
    this.getData(value);
  }

  onPanelChange = value => {
    this.isLoading(true);
    this.getData(value);
  }

  getListData = value => {
    const { appointmentUser } = this.props;
    return appointmentUser.filter(x => moment(x.startDate).format('l') === moment(value).format('l'));
  }

  getStatus = status => (
    [{ id: 0, text: 'Asignada', color: 'green' },
    { id: 1, text: 'Cumplida', color: 'gold' },
    { id: 2, text: 'Cancelada', color: 'gray' },
    { id: 3, text: 'Incumplida', color: 'red' }].filter(x => x.id === status)
  );

  getData = async value => {
    const date = moment(value).utc().add(-5, 'hours');
    const data = await this.getAppointmentsList(date);
    const { setAppointmentUser: setAppointmentUserR } = this.props;
    setAppointmentUserR(data);

    this.setState({
      defaultCurrentDate: date,
      loading: false
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
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
    return appointment.map(x => ({
      id: x.idappointment,
      title: x.nameroutine,
      startDate: moment(x.appointmentdate),
      endDate: moment(x.appointmentdate).add(x.timeroutine, 'minutes'),
      status: this.getStatus(x.status)[0].color,
      location: x.nameworkshop,
      mechanic: `${x.name} ${x.last_name}`
    })
    );
  }

  dateCellRender = value => {
    const listData = this.getListData(value);
    return (
      <ul className='events'>
        {listData.map(item => (
          <li key={item.id}>
            <Badge color={item.status} text={item.title} onClick={this.showModal} />
          </li>
        ))}
      </ul>
    );
  }

  refresh = () => {
    const { defaultCurrentDate } = this.state;
    this.isLoading(true);
    this.getData(defaultCurrentDate);
    message.success('Citas cargadas correctamente');
  }

  render() {
    const { history } = this.props;
    const { loading, visible } = this.state;
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
              <Calendar
                dateCellRender={this.dateCellRender}
                onPanelChange={this.onPanelChange}
                mode='month'
                onSelect={this.onSelectedDate}
              />
            </Fragment>
          }
        />
        <div>
          <Button type="primary" onClick={this.showModal}>
            Open Modal
          </Button>
          <Modal
            title='Cita'
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
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