import React from "react";
import { connect } from "react-redux";
import { Menu, Dropdown, Avatar, Badge } from "antd";
import styles from "./style.module.scss";

@connect(({ user }) => ({ user }))
class ProfileMenu extends React.Component {
  state = {
    count: 0
  };

  logout = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "user/LOGOUT"
    });
  };

  addCount = () => {
    /* 
    let { count } = this.state
    count += 1
    this.setState({
      count,
    })
    */
  };

  render() {
    const { user } = this.props;
    const { count } = this.state;
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <strong>Hola: {user.name || "Anonymous"}</strong>
          <br />
          <strong>Email:</strong>
          {user.email}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="/#/globals/resetPassword">
            <i className={`${styles.menuIcon} icmn-lock`} />
            Cambiar contraseña
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="#" onClick={this.logout}>
            <i className={`${styles.menuIcon} icmn-exit`} />
            Cerrar sesión
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        onVisibleChange={this.addCount}
      >
        <div className={styles.dropdown}>
          <Badge count={count}>
            <Avatar
              className={styles.avatar}
              shape="square"
              size="large"
              icon="user"
            />
          </Badge>
        </div>
      </Dropdown>
    );
  }
}

export default ProfileMenu;
