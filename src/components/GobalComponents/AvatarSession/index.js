import React from "react";
import "./style.scss";

class AvatarSession extends React.Component {
  static defaultProps = {
    size: false,
    border: false,
    borderColor: "#d2d9e5",
    src: ""
  };

  render() {
    const { size, borderColor, src, border } = this.props;
    return (
      <a
        className={`d-block mx-auto ${
          size > 0 ? `avatarStyle avatarStyle--${size}` : ""
        } ${border ? " avatarStyle--border" : ""}`}
        href="javascript: void(0);"
        style={{
          borderColor
        }}
      >
        <img src={src} alt="User" />
      </a>
    );
  }
}

export default AvatarSession;
