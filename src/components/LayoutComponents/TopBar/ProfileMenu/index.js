import React from "react";
import { connect } from "react-redux";
import { Menu, Dropdown } from "antd";
import Avatar from "../../../GobalComponents/Avatar";

import styles from "./style.module.scss";

@connect(({ user }) => ({ user }))
class ProfileMenu extends React.Component {
  logout = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "user/LOGOUT"
    });
  };

  render() {
    const { user } = this.props;
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
          <div className="avatarPhoto">
            <Avatar
              src={user.avatar}
              size="50"
              border="true"
              borderColor="#fff"
            />
          </div>
        </div>
      </Dropdown>
    );
  }
}

export default ProfileMenu;
