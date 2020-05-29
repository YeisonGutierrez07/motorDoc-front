import React, { useState, useEffect, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import { List, Avatar, Skeleton, Spin, Row, Col, Button, message, Modal, Input, Tooltip } from 'antd';
import { Helmet } from 'react-helmet';
import Authorize from 'components/LayoutComponents/Authorize';
import moment from 'moment';
import { CardView } from '../../clientsPages/appointment/components/cardview';
import { getAppointmentsMechanicAssigned, manageApppointment } from '../../../services/mechanic';
import { formatNumber } from '../../../common';

const { TextArea } = Input;

export const AppointmentDay = () => {

  const [list, setList] = useState([{ loading: false, name: 'Jorge', description: 'hola1' }, { loading: false, name: 'Luis', description: 'hola2' }]);
  const [loading, setLoading] = useState(true);
  const [dataModal, setDataModal] = useState({});
  const [visible, setVisble] = useState(false);

  const getData = async data => {
    const value = await getAppointmentsMechanicAssigned(data.idmechanic, data.fhiinitial, data.fhend);
    setList(value);
    setLoading(false);
  }

  useEffect(() => {
    getData({
      idmechanic: 4,
      fhiinitial: `${moment().format('L')} 07:00:00`,
      fhend: `${moment().format('L')} 18:00:00`
    });
  }, []);

  const showModal = item => {
    setVisble(true);
    setDataModal(item);
    message.info('Hola');
    console.log(manageApppointment);
    console.log(item);
  };

  const handleOk = e => {
    console.log(e);
    setVisble(false);
  };

  const handleCancel = e => {
    console.log(e);
    setVisble(false);
  };

  const onChange = e => {
    const { value } = e.target;
    // const reg = /^-?\d*(\.\d*)?$/;
    // if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
    console.log(value);
    // }
  };

  // '.' at the end or only '-' in the input box.
  const onBlur = () => {
    // const { value, onBlur, onChange } = this.props;
    // let valueTemp = value;
    // if (value.charAt(value.length - 1) === '.' || value === '-') {
    //   valueTemp = value.slice(0, -1);
    // }
    // onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    // if (onBlur) {
    //   onBlur();
    // }
  };


  if (loading) {
    return (
      <Fragment>
        <Spin />
      </Fragment>
    );
  }
  return (
    <Authorize roles={['MECHANIC']} redirect to='/404'>
      <Helmet title='Mis Citas asignadas' />
      <CardView
        title={`Citas asignadas ${moment().format('L')}`}
        body={
          <Fragment>


            <List
              className="demo-loadmore-list"
              // loading={initLoading}
              itemLayout="horizontal"
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
                      title={`${item.nombrerutina} ${moment(item.appointmentdate).format('L HH:mm:ss')}`}
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
              {...dataModal.idmaintenance !== undefined ?
                <Fragment>
                  <Modal
                    title={`Gestionar cita ${dataModal.nombrerutina}`}
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <Box component="fieldset" mb={3} borderColor="transparent">
                      <Row>
                        <Col>
                          <p align='left'><b>Kilometraje Actual:</b>
                            <Tooltip
                              trigger={['focus']}
                              title='Test'
                              placement="topLeft"
                              overlayClassName="numeric-input"
                            >
                              <Input
                                onChange={onChange}
                                onBlur={onBlur}
                                placeholder="Input a number"
                                maxLength={25}
                              />
                            </Tooltip>
                          </p>
                        </Col>
                        <Col>
                          <p align='left'><b>Observaciones:</b> <TextArea rows={4} autoSize /></p>
                        </Col>
                        <Col>
                          <p align='left'>
                            <Button type='primary' loading>Enviar</Button>
                          </p>
                        </Col>
                      </Row>
                    </Box>
                  </Modal>
                </Fragment>
                : null}
            />
          </Fragment>}
      />
    </Authorize>
  );
}

export default AppointmentDay;