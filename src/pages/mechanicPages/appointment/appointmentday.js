import React, { useState, useEffect, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import { List, Avatar, Skeleton, Spin, Row, Col, Button, message, Modal, Input, Tooltip } from 'antd';
import { Helmet } from 'react-helmet';
import Authorize from 'components/LayoutComponents/Authorize';
import moment from 'moment';
import { CardView } from '../../clientsPages/appointment/components/cardview';
import { getAppointmentsMechanicAssigned, manageApppointment, getIdMechanic } from '../../../services/mechanic';
import { formatNumber, formatNumberDecimal } from '../../../common';

const { TextArea } = Input;

const fechaInicial = `${moment().format('L')} 07:00:00`;
const fechaFinal =  `${moment().format('L')} 18:00:00`;

export const AppointmentDay = () => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataModal, setDataModal] = useState({});
  const [visible, setVisble] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [mechanicId, setMechanicId] = useState(0);

  const getData = async data => {
    const value = await getAppointmentsMechanicAssigned(mechanicId, data.fhiinitial, data.fhend);
    setList(value);
    setLoading(false);
  }

  const getMechanicId = async () => {
    const idUser = JSON.parse(localStorage.getItem('user')).user.id;
    setMechanicId(await getIdMechanic(idUser));
  } 

  setTimeout(() => {
    getMechanicId();
    getData({
      fhiinitial: fechaInicial,
      fhend: fechaFinal
    });
  }, 300 * 1000);

  useEffect(() => {
    getData({
      fhiinitial: fechaInicial,
      fhend: fechaFinal
    });
  }, []);

  const showModal = item => {
    setVisble(true);
    setDataModal(item);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const data = {
      idmaintenance: dataModal.idmaintenance,
      kilometraje: dataModal.kilometraje,
      observaciones: dataModal.observaciones
    };
    const status = await manageApppointment(data, dataModal.idappointment);
    if(status === 200){
      message.info(`Cita gestionada correctamente`);
      getData({
        fhiinitial: `${moment().format('L')} 07:00:00`,
        fhend: `${moment().format('L')} 18:00:00`
      });
      setVisble(false);
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setVisble(false);
  };

  const onChangeKilometraje = e => {
    if(e.target !== undefined)
    {
      const { value } = e.target;
      const reg = /^-?\d*(\.\d*)?$/;
       /* eslint no-restricted-globals:0 */
      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        setDataModal({ ...dataModal, kilometraje: value });
      }
    }
  };

  const onChangeObservaciones = e => {
    const { value } = e.target;
    setDataModal({ ...dataModal, observaciones: value });
  };

  const onBlur = () => {
    const value = dataModal.kilometraje === undefined ? '' : dataModal.kilometraje;
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    if(valueTemp === undefined)
      return ;

    onChangeKilometraje(valueTemp.replace(/0*(\d+)/, '$1'));
  };

  if (loading) {
    return (
      <Fragment>
        <Spin />
      </Fragment>
    );
  }
  const title = dataModal.kilometraje ? (
    <span className="numeric-input-title">{dataModal.kilometraje !== '-' ? formatNumberDecimal(dataModal.kilometraje) : '-'}</span>
  ) : (
      'Kilometraje'
    );

  return (
    <Authorize roles={['MECHANIC']} redirect to='/404'>
      <Helmet title='Mis Citas asignadas' />
      <CardView
        title={`Citas asignadas ${moment().format('L')}`}
        body={
          <Fragment>
            <List
              className='demo-loadmore-list'
              // loading={initLoading}
              itemLayout='horizontal'
              // loadMore={loadMore}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[<Button type='link' onClick={() => { showModal(item); }}>Gestionar</Button>]}
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      avatar={
                        <Avatar src={item.image} />
                      }
                      title={`${item.nombrerutina} ${moment(item.appointmentdate.replace('T', ' ').replace('Z', '')).format('L HH:mm:ss')}`}
                      description={`Placa: ${item.placa} \n Marca: ${item.marca} - ${item.namereference} \n`}
                    />
                    <Row>
                      <Col sm={24}>
                        <b>Usuario:</b>
                      </Col>
                      <Col sm={24}>
                        {item.nombreusuario}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={24}>
                        <b>Costo:</b>
                      </Col>
                      <Col sm={24}>
                        {formatNumber(item.costroutine)}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={24}>
                        <b>Tiempo estimado:</b>
                      </Col>
                      <Col sm={24}>
                        {item.timeroutine}
                      </Col>
                    </Row>
                  </Skeleton>
                </List.Item>
              )}
            />
            {dataModal.idmaintenance !== undefined ?
              <Fragment>
                <Modal
                  title={`Gestionar cita ${dataModal.nombrerutina}`}
                  visible={visible}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <Box component='fieldset' mb={3} borderColor='transparent'>
                    <Row>
                      <Col>
                        <p align='left'><b>Kilometraje Actual:</b>
                          <Tooltip
                            trigger={['focus']}
                            title={title}
                            placement='topLeft'
                            overlayClassName='numeric-input'
                          >
                            <Input
                              onChange={onChangeKilometraje}
                              onBlur={onBlur}
                              placeholder='Kilometraje'
                              maxLength={15}
                              value={dataModal.kilometraje}
                            />
                          </Tooltip>
                        </p>
                      </Col>
                      <Col>
                        <p align='left'><b>Observaciones:</b> 
                          <TextArea rows={4} autoSize placeholder='Descripción trabajo realizado' onChange={onChangeObservaciones} maxLength={200} />
                        </p>
                      </Col>
                    </Row>
                  </Box>
                </Modal>
              </Fragment>
              : null}
          </Fragment>}
      />
    </Authorize>
  );
}

export default AppointmentDay;