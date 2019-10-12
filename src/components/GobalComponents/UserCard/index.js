import React from 'react'
import { Radio, Button } from 'antd'
import './style.scss'
import Avatar from 'components/GobalComponents/Avatar'

class UserCard extends React.Component {
  static defaultProps = {
    type: '',
  }

  render() {
    const { type, info } = this.props
    return (
      <div className={`userCard px-3 py-5 ${type.length > 0 ? `userCard--typed bg-${  type}` : ''}`}>
        <Button className="userCard__plusBtn">Add</Button>
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
            <Radio.Group size="small">
              <Radio.Button value="default">Invalidar</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      </div>
    )
  }
}

export default UserCard
