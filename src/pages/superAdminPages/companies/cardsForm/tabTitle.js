import React from 'react'
import { Icon } from 'antd'

const TabTitle = ({ title, check = true }) => {
  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      <h4>
        {title}
        {`${` `}`}
        {check ? (
          <Icon type="check-circle" style={{ color: '#27C940', fontSize: '12px' }} theme="filled" />
        ) : null}
      </h4>
    </div>
  )
}

export default TabTitle
