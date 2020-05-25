import React from 'react';
import { Modal, Table, Switch } from 'antd';

const ModalAddRoutine = ({visible, changeVisible, mechanicData, routinesMechanic, changeStatus}) => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Estado',
      key: 'status',
      render:data => <Switch defaultChecked={data.status} onChange={() => changeStatus(data)} />
    },
  ];

  return (
    <Modal
      title={`Agregar rutinas al mecanico${  mechanicData.name}`}
      visible={visible}
      footer={false}
      onCancel={() => changeVisible(false)}
    >
      <Table dataSource={routinesMechanic} columns={columns} rowKey="key" pagination={false} />
    </Modal>
  );
}

export default ModalAddRoutine;
