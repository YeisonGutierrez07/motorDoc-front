/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable func-names */
/* eslint-disable react/button-has-type */
import React from "react";
import { Tabs, Input, Menu, Dropdown, Button, Icon, Alert } from "antd";
import Avatar from "components/GobalComponents/Avatar";
import Moment from "react-moment";
import { connect } from "react-redux";
import { referenciaFirebase } from "../../../services/firebase";

import "./style.scss";

const { TabPane } = Tabs;
const { Search } = Input;

const actionsMenu = (
  <Menu>
    <Menu.Item key="1">
      <Icon style={{ marginRight: 3 }} type="sound" />
      Mute
    </Menu.Item>
    <Menu.Item key="2">
      <Icon style={{ marginRight: 3 }} type="delete" />
      Delete chat
    </Menu.Item>
    <Menu.Item key="3">
      <Icon style={{ marginRight: 3 }} type="setting" />
      Settings
    </Menu.Item>
  </Menu>
);

const chatTabActives = chat => {
  return (
    <div className="messaging__tab">
      <div className="messaging__tab-avatar">
        <Avatar
          src={chat.photo_workShop}
          size="50"
          border="true"
          borderColor="#fff"
        />
      </div>
      <div className="messaging__tab-content">
        <small className="messaging__tab-time">
          <Moment format="HH:mm">{chat.time}</Moment>
        </small>
        <div className="messaging__tab-name">{chat.name}</div>
        <div
          className="messaging__tab-text"
          dangerouslySetInnerHTML={{ __html: chat.last_message }}
        />
      </div>
    </div>
  );
};

const Message = props => {
  const { message } = props;
  const { content, time } = message.mensaje;
  const type = message.mensaje.send;

  return (
    <div
      className={`clearfix messaging__item ${
        type ? "messaging__item--right" : "messaging__item--left"
      }`}
    >
      {type ? (
        type === "inicio" ? (
          <Alert message="Se inicio un nuevo chat" type="success" />
        ) : (
          <>
            <div className="messaging__item-avatar">
              <Avatar src={message.photo} size="50" border="false" />
            </div>
            <div
              className="messaging__item-content"
              style={{ background: "#e97777" }}
            >
              <p>{content}</p>
              <small className="messaging__tab-time messageTime">
                <Moment format="HH:mm">{time}</Moment>
              </small>
            </div>
          </>
        )
      ) : (
        <>
          <div className="messaging__item-avatar">
            <Avatar src={message.photo_workShop} size="50" border="false" />
          </div>
          <div className="messaging__item-content">
            <p>{content}</p>
            <small className="messaging__tab-time messageTime">
              <Moment format="HH:mm">{time}</Moment>
            </small>
          </div>
        </>
      )}
    </div>
  );
};

@connect(({ user }) => ({ user }))
class MessagingChat extends React.Component {
  state = {
    usersWorkShops: {},
    myMessaggesWorkShops: {},
    newMessage: "",
    firebaseID: "",
    activeChatNumber: ""
  };

  componentWillMount() {
    this.loadFirebaseWorkshops();
    this.loadFirebaseClients();
  }

  loadFirebaseWorkshops = () => {
    const ref = referenciaFirebase.ref(`workshops/`);
    ref.on("value", snapshot => {
      const response = snapshot.val();
      this.setState({
        usersWorkShops: response
      });
    });
  };

  loadFirebaseClients = () => {
    const { user } = this.props;
    const ref = referenciaFirebase.ref(`clients/`);
    ref.on("value", snapshot => {
      const responseClients = snapshot.val();
      let firebaseID = "";

      for (const iterator in responseClients) {
        if (responseClients[iterator].id_user === user.id) {
          firebaseID = iterator;
        }
      }
      this.setState({
        firebaseID
      });
      this.myMessagges(firebaseID);
    });
  };

  myMessagges = firebaseID => {
    const ref = referenciaFirebase.ref(`chats/clients/${firebaseID}`);
    ref.on("value", snapshot => {
      const responseMessages = snapshot.val();
      this.setState({
        myMessaggesWorkShops: responseMessages
      });
      let activeChatNumber = "";
      for (const iterator in responseMessages) {
        activeChatNumber = iterator;
      }

      this.setState({ activeChatNumber });
    });
  };

  changeChat = chatNumber => {
    this.setState({
      activeChatNumber: chatNumber
    });
  };

  changeMessagge = value => {
    this.setState({
      newMessage: value.target.value
    });
  };

  listChatInactives = (chat, uid) => {
    return (
      <div className="messaging__tab">
        <div className="messaging__tab-avatar">
          <Avatar src={chat.photo} size="50" border="true" borderColor="#fff" />
        </div>
        <div className="messaging__tab-content">
          <div className="messaging__tab-name">{chat.name}</div>
          <Button
            onClick={() => this.createChat(uid)}
            type="primary"
            size="small"
          >
            <Icon type="message" />
            Iniciar
          </Button>
          &nbsp;&nbsp;
          <Button type="primary" size="small">
            <Icon type="profile" />
            Ver perfil
          </Button>
        </div>
      </div>
    );
  };

  sendMessagge = uidWorkShop => {
    const { newMessage, firebaseID } = this.state;
    const d = new Date();
    const time = d.getTime();
    referenciaFirebase
      .ref(`/chats/clients/${firebaseID}/${uidWorkShop}/chatMessages`)
      .push({
        content: newMessage,
        send: true,
        time
      });
    referenciaFirebase
      .ref(`/chats/clients/${firebaseID}/${uidWorkShop}`)
      .update({
        last_message: newMessage,
        time
      });
    referenciaFirebase
      .ref(`/chats/workShops/${uidWorkShop}/${firebaseID}/chatMessages`)
      .push({
        content: newMessage,
        send: false,
        time
      });
    referenciaFirebase
      .ref(`/chats/workShops/${uidWorkShop}/${firebaseID}`)
      .update({
        last_message: newMessage,
        time
      });

    this.setState({
      newMessage: ""
    });
  };

  createChat = uidWorkShop => {
    const { user } = this.props;
    const { usersWorkShops } = this.state;
    const workShopSelect = usersWorkShops[uidWorkShop];

    const { firebaseID } = this.state;
    const d = new Date();
    const time = d.getTime();

    // init chat firebase clients
    referenciaFirebase.ref(`/chats/clients/${firebaseID}/${uidWorkShop}`).set({
      last_message: "Se inicio el chat",
      chatMessages: {
        "-CREATEKEY": {
          content: "Se inicio el chat",
          send: "inicio",
          time
        }
      },
      name: workShopSelect.name,
      photo: user.avatar,
      photo_workShop: workShopSelect.photo,
      time
    });

    // init chat firebase workShops
    referenciaFirebase
      .ref(`/chats/workShops/${uidWorkShop}/${firebaseID}`)
      .set({
        chatMessages: {
          "-CREATEKEY": {
            content: "Se inicio el chat",
            send: "inicio",
            time
          }
        },
        last_message: "Se inicio el chat",
        name: user.name,
        photo: user.avatar,
        photo_workShop: workShopSelect.photo,
        time
      });
  };

  render() {
    const {
      activeChatNumber,
      usersWorkShops,
      myMessaggesWorkShops,
      newMessage
    } = this.state;

    const selectedChatData = myMessaggesWorkShops
      ? myMessaggesWorkShops[activeChatNumber]
      : null;
    const messagesData = selectedChatData ? selectedChatData.chatMessages : [];

    const returnPanelChat = () => {
      if (selectedChatData && selectedChatData.name) {
        return (
          <div className="messaging__content">
            <div className="card-header clearfix">
              <h4 className="mt-1 mb-1 text-black d-inline-block">
                <strong>{selectedChatData.name}</strong>
              </h4>
              <div className="pull-right">
                <Dropdown overlay={actionsMenu}>
                  <Button style={{ marginLeft: 4 }}>
                    Actions <Icon type="setting" />
                  </Button>
                </Dropdown>
              </div>
            </div>
            <div className="messaging__content-wrapper">
              <div className="messaging__chat height-500">
                {Object.keys(messagesData).map(c => (
                  <Message
                    message={{
                      mensaje: messagesData[c],
                      photo: selectedChatData.photo,
                      photo_workShop: selectedChatData.photo_workShop
                    }}
                    key={c}
                  />
                ))}
              </div>
              <form className="form-group mt-4 mb-3">
                <textarea
                  className="form-control adjustable-textarea"
                  placeholder="Type message..."
                  value={newMessage}
                  onChange={this.changeMessagge}
                />
                <div className="mt-3" align="right">
                  <button
                    type="submit"
                    className="btn btn-primary width-200"
                    onClick={() => this.sendMessagge(activeChatNumber)}
                  >
                    <i className="fa fa-send mr-2" />
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      }
      return (
        <div className="messaging__content">
          <div className="card-header clearfix">
            <h4 className="mt-1 mb-1 text-black d-inline-block">
              <strong>Chat</strong>
            </h4>
            <div className="pull-right">
              <Dropdown overlay={actionsMenu}>
                <Button style={{ marginLeft: 4 }}>
                  Actions <Icon type="setting" />
                </Button>
              </Dropdown>
            </div>
          </div>
          <div className="messaging__content-wrapper">
            <div align="center">
              <br />
              <br />
              <h2>
                <p style={{ color: "red" }}>¿Desea iniciar un chat?</p>
              </h2>
              <br />
              <br />
              <br />
              <img
                src="http://omnia.ddns.me:9100/wp-content/uploads/2015/04/Chat-flat-circle.png"
                alt="chat imagen"
              />
              <br />
              <br />
              {activeChatNumber ? (
                <Button
                  onClick={() => this.createChat(activeChatNumber)}
                  type="primary"
                >
                  Iniciar chat con este taller
                </Button>
              ) : (
                <p style={{ color: "red" }}>
                  Seleecione un taller para iniciar un chat
                </p>
              )}
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      );
    };

    const tabMisChats = () => {
      if (myMessaggesWorkShops) {
        return Object.keys(myMessaggesWorkShops).map(c => (
          <TabPane tab={chatTabActives(myMessaggesWorkShops[c])} key={c} />
        ));
      }
      return (
        <div align="center">
          <h3 style={{ color: "red" }}>Sin chats</h3>
        </div>
      );
    };

    return (
      <div className="card messaging">
        <div className="messaging__sidebar">
          <div className="messaging__sidebar-header">
            <Search
              placeholder="Buscar por nombre..."
              style={{ width: "100%" }}
            />
          </div>
          <div className="messaging__tabs">
            <Tabs defaultActiveKey="actives">
              <TabPane tab="Mis talleres" key="actives">
                <Tabs
                  defaultActiveKey="0"
                  tabPosition="left"
                  onChange={this.changeChat}
                >
                  {tabMisChats()}
                </Tabs>
              </TabPane>
              <TabPane tab="Todos los talleres" key="inactives">
                <Tabs
                  defaultActiveKey="0"
                  tabPosition="left"
                  onChange={this.changeChat}
                >
                  {Object.keys(usersWorkShops).map(c => (
                    <TabPane
                      tab={this.listChatInactives(usersWorkShops[c], c)}
                      key={c}
                    />
                  ))}
                </Tabs>
              </TabPane>
            </Tabs>
          </div>
        </div>
        {returnPanelChat()}
      </div>
    );
  }
}

export default MessagingChat;
