/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable func-names */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { Tabs, Input, Menu, Dropdown, Button, Icon, Alert, Spin } from "antd";
import Avatar from "components/GobalComponents/Avatar";
import Moment from "react-moment";
import { connect } from "react-redux";
import { referenciaFirebase } from "../../../services/firebase";

import "../MessagingChat/style.scss";

const { TabPane } = Tabs;
const { Search } = Input;

const actionsMenu = (
  <Menu>
    <Menu.Item key="1">
      <Icon style={{ marginRight: 3 }} type="calendar" />
      Agendar cita
    </Menu.Item>
  </Menu>
);

const chatTabActives = chat => {
  return (
    <div className="messaging__tab">
      <div className="messaging__tab-avatar">
        <Avatar src={chat.photo} size="50" border="true" borderColor="#fff" />
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
              <Avatar src={message.photo_workShop} size="50" border="false" />
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
            <Avatar src={message.photo} size="50" border="false" />
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
    myMessaggesClients: {},
    newMessage: "",
    firebaseID: "",
    activeChatNumber: "",
    loading: true
  };

  componentDidMount() {
    this.loadFirebaseWorkshops();
  }


  loadFirebaseWorkshops = () => {
    const { user } = this.props;
    const ref = referenciaFirebase.ref(`workshops/`);
    ref.on("value", snapshot => {
      const responseWorkshops = snapshot.val();
      let firebaseID = "";

      for (const iterator in responseWorkshops) {
        if (responseWorkshops[iterator].id_user === user.id) {
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
    const ref = referenciaFirebase.ref(`chats/workShops/${firebaseID}`);
    ref.on("value", snapshot => {
      const responseMessages = snapshot.val();
      let activeChatNumber = "";
      for (const iterator in responseMessages) {
        activeChatNumber = iterator;
      }
      this.setState({
        myMessaggesClients: responseMessages,
        activeChatNumber,
        loading:false
      });
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

  sendMessagge = uidClient => {
    const { newMessage, firebaseID } = this.state;
    const d = new Date();
    const time = d.getTime();
    referenciaFirebase
      .ref(`/chats/clients/${uidClient}/${firebaseID}/chatMessages`)
      .push({
        content: newMessage,
        send: false,
        time
      });
    referenciaFirebase.ref(`/chats/clients/${uidClient}/${firebaseID}`).update({
      last_message: newMessage,
      time
    });
    referenciaFirebase
      .ref(`/chats/workShops/${firebaseID}/${uidClient}/chatMessages`)
      .push({
        content: newMessage,
        send: true,
        time
      });
    referenciaFirebase
      .ref(`/chats/workShops/${firebaseID}/${uidClient}`)
      .update({
        last_message: newMessage,
        time
      });

    this.setState({
      newMessage: ""
    });
  };

  render() {
    const { activeChatNumber, myMessaggesClients, newMessage, loading } = this.state;
    const selectedChatData = myMessaggesClients
      ? myMessaggesClients[activeChatNumber]
      : {};
    const messagesData = selectedChatData ? selectedChatData.chatMessages : {};

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
                    Acciones <Icon type="setting" />
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
                  placeholder="Escribe tu mensaje..."
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
                  Acciones <Icon type="setting" />
                </Button>
              </Dropdown>
            </div>
          </div>
          <div className="messaging__content-wrapper">
            <div align="center">
              <br />
              <br />
              <h2>
                <p style={{ color: "red" }}>Aun no tiene chats con clientes</p>
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
            </div>
          </div>
        </div>
      );
    };

    const tabMisChats = () => {
      if (myMessaggesClients) {
        return Object.keys(myMessaggesClients).map(c => (
          <TabPane tab={chatTabActives(myMessaggesClients[c])} key={c} />
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
              <TabPane tab="Mis clientes" key="actives">
                {loading ? 
                  <div align="center"><Spin /></div> : 
                  <Tabs
                    defaultActiveKey="0"
                    tabPosition="left"
                    onChange={this.changeChat}
                  >
                    {tabMisChats()}
                  </Tabs>
                }
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
