import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  MonthView,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  Resources,
  AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles, createStyles } from '@material-ui/core';
import { indigo, blue, teal, red } from '@material-ui/core/colors';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Spin } from 'antd';
import moment from 'moment';
import { setAppointmentUser } from '../../../redux/appointment';
import { getAppointmentsByUsers } from '../../../services/appointment';


const resources = [
  {
    fieldName: 'priority',
    title: 'Estado',
    instances: [
      { id: 0, text: 'Asignada', color: teal },
      { id: 1, text: 'Cumplida', color: teal },
      { id: 2, text: 'Cancelada', color: indigo },
      { id: 3, text: 'Incumplida', color: red }
    ]
  }
];

const styles = ({ palette }) =>
  createStyles({
    appointment: {
      borderRadius: 0,
      borderBottom: 0
    },
    highPriorityAppointment: {
      borderLeft: `4px solid ${teal[500]}`
    },
    middlePriorityAppointment: {
      borderLeft: `4px solid ${blue[500]}`
    },
    lowPriorityAppointment: {
      borderLeft: `4px solid ${indigo[500]}`
    },
    weekEndCell: {
      backgroundColor: fade(palette.action.disabledBackground, 0.04),
      '&:hover': {
        backgroundColor: fade(palette.action.disabledBackground, 0.04)
      },
      '&:focus': {
        backgroundColor: fade(palette.action.disabledBackground, 0.04)
      }
    },
    weekEndDayScaleCell: {
      backgroundColor: fade(palette.action.disabledBackground, 0.06)
    },
    text: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    content: {
      opacity: 0.7
    },
    container: {
      width: '100%',
      lineHeight: 1.2,
      height: '100%'
    }
  });

const DayScaleCell = withStyles(
  styles
)(({ startDate, classes, ...restProps }) => (
  <MonthView.DayScaleCell
    className={classes.weekEndDayScaleCell}
    startDate={startDate}
    {...restProps}
  />
));

const TimeTableCell = withStyles(
  styles
)(({ startDate, classes, ...restProps }) => (
  <MonthView.TimeTableCell
    className={classes.weekEndCell}
    startDate={startDate}
    {...restProps}
  />
));

const Appointment = withStyles(styles)(({ classes, data, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    className={{
      [classes.highPriorityAppointment]: data.priority === 1,
      [classes.middlePriorityAppointment]: data.priority === 2,
      [classes.lowPriorityAppointment]: data.priority === 3,
      [classes.appointment]: true
    }}
    data={data}
  />
));

// #FOLD_BLOCK
const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(
  ({
    classes,
    data,
    ...restProps
    // #FOLD_BLOCK
  }) => {
    let priority = 'Asignada';
    if (data.priority === 1) priority = 'Cumplida';
    if (data.priority === 2) priority = 'Cancelada';
    if (data.priority === 3) priority = 'Incumplida';
    return (
      <Appointments.AppointmentContent {...restProps} data={data}>
        <div className={classes.container}>
          <div className={classes.text}>{data.title}</div>
          <div className={classes.text}>{`Estado: ${priority}`}</div>
          <div className={classes.text}>{`Lugar: ${data.location}`}</div>
        </div>
      </Appointments.AppointmentContent>
    );
  }
);

const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
  ({ children, classes, ...restProps }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>
        {children}
      </Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  ),
);

export class SchedulerContainer extends React.PureComponent {
  
  format = 'l';

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      defaultCurrentDate: moment().utc().add(-5, 'hours')
    }
  }

  componentDidMount() {
    const { defaultCurrentDate } = this.state;
    this.getData(defaultCurrentDate);
  }

  // componentDidUpdate(prevProps) {
  //   const { appointmentUser } = this.props;
  //   if (prevProps.appointmentUser !== appointmentUser) {
  //     const { defaultCurrentDate } = this.state;
  //     this.getData(defaultCurrentDate);
  //   }
  // }

  getData = async value => {
    const date = moment(value).utc().add(-5, 'hours');
    const data = await this.getAppointmentsList(date);
    const { setAppointmentUser: setAppointmentUserR } = this.props;
    this.setState({
      defaultCurrentDate: date,
      loading: false
    });
    setAppointmentUserR(data);
  }

  commitChanges = value => {
    console.log(value);
  }

  onCurrentDateChange = async value => {
    this.getData(value);
  }

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
      priority: x.status,
      location: x.nameworkshop,
      mechanic: `${x.name} ${x.last_name}`
    })
    );
  }

  // DateSelected = () => {
  //   const { defaultCurrentDate } = this.state;
  //   console.log('date seledcted');
  //   return defaultCurrentDate.format(this.format);
  // };

  render() {
    const { loading, defaultCurrentDate } = this.state;
    const { appointmentUser } = this.props;
    console.log(appointmentUser);
    if (loading)
      return (
        <Fragment>
          <Spin />
        </Fragment>);

    return (
      <Paper>
        <Scheduler data={appointmentUser}>
          <ViewState
            defaultCurrentDate={defaultCurrentDate}
            onCurrentViewNameChange={this.currentViewNameChange}
            onCurrentDateChange={this.currentDateChange}
            // onCurrentDateChange={this.onCurrentDateChange}
          />
          <MonthView
            displayName='Mensual'
            dayScaleCellComponent={DayScaleCell}
            timeTableCellComponent={TimeTableCell}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <IntegratedEditing />
          <DayView
            displayName='Semanal'
            startDayHour={6}
            endDayHour={17}
            intervalCount={5}
          />
          <Appointments
            appointmentComponent={Appointment}
            appointmentContentComponent={AppointmentContent}
          />
          <Resources data={resources} />
          <AppointmentTooltip showCloseButton showDeleteButton />
          <Toolbar {...loading ? { rootComponent: ToolbarWithLoading } : null} />
          <DateNavigator onClick={(value) => console.log(value)} />
          <ViewSwitcher />
        </Scheduler>
      </Paper>
    )
  }
};

const mapStateToProps = (data) => {
  return {
    appointmentUser: data.appointment.appointmentUser
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setAppointmentUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SchedulerContainer);