import React from 'react'
import { Button } from 'antd'
import './style.scss'
import Avatar from 'components/GobalComponents/Avatar'

class UserCard extends React.Component {
  static defaultProps = {
    type: '',
  }

  render() {
    const { type, info, buttonAction } = this.props
    return (
      <div className={`userCard px-3 py-5 ${type.length > 0 ? `userCard--typed bg-${  type}` : ''}`}>
        <Avatar
          src={info.profile_pic}
          border
          borderColor={`${type.length > 0 ? 'white' : ''}`}
          size="90"
        />
        <div className="my-3 text-center">
          <div className="userCard__userName font-size-18">{info.name}</div>
          <div className="userCard__post">{info.post}</div>
        </div>
        <div className="text-center">
          <div className="btn-group text-center">
            <Button onClick={() => buttonAction(true, info)}>Agregar Rutinas</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default UserCard
