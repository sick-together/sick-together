import React, { useEffect, useState } from "react";
import {
  getSelectedGroup,
  getGroupMessages,
  addMessage,
} from "../../Redux/groupReducer.js";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import io from "socket.io-client";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: "20px",
    // height: '50vh'
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  groupTitle: {
    display: "flex",
    alignItems: "center",
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  topicsWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid grey",
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px",
  },
  chatBox: {
    width: "85%",
  },
  button: {
    width: "15%",
  },
  message: {
    display: "flex",
    alignItems: "center",
    paddingTop: "5px",
  },
  chip: {
    marginRight: "5px",
  },
}));

function Group(props) {
  let { selectedGroup, groupMessages } = props.groups;
  const classes = useStyles();
  console.log("selected group:", selectedGroup);
  const [textValue, changeTextValue] = React.useState("");

  useEffect(() => {
    if (selectedGroup && selectedGroup[0]) {
      let { group_id } = selectedGroup[0];
      props.getGroupMessages(+group_id);
    }
  }, [selectedGroup[0]]);

  function insertMessage(newMessage, groupId) {
    props.addMessage(newMessage, groupId);
    changeTextValue("");
  }

  if (selectedGroup && selectedGroup[0]) {
    let { group_name, group_picture, description, group_id } = selectedGroup[0];
    return (
      <div>
        <Paper className={classes.root}>
          <Typography
            variant="h5"
            component="h3"
            className={classes.groupTitle}
          >
            <Avatar
              alt="Group Avatar"
              src={group_picture}
              className={classes.bigAvatar}
            />
            {group_name}
          </Typography>

          <section className={classes.flex}>
            <div className={classes.topicsWindow}>
              <List>
                {["#general", "#stories", "#random", "#memes"].map(topic => (
                  <ListItem button>
                    <ListItemText primary={topic} />
                  </ListItem>
                ))}
              </List>
            </div>
            <div className={classes.chatWindow}>
              {groupMessages && groupMessages.length ? (
                groupMessages.map((message, index) => (
                  <div className={classes.message} key={index}>
                    <Chip label={message.username} className={classes.chip} />
                    <Typography varient="p">{message.message}</Typography>
                  </div>
                ))
              ) : (
                <Typography varient="p">This chat is empty!</Typography>
              )}
            </div>
          </section>
          <section className={classes.flex}>
            <TextField
              id="standard-name"
              label="Send a message!"
              className={classes.chatBox}
              value={textValue}
              onChange={e => changeTextValue(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => insertMessage(textValue, group_id)}
            >
              Send
              <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </section>
        </Paper>
      </div>
    );
  } else return null;
}

function mapStateToProps(state) {
  return {
    user: state.user,
    groups: state.groups,
  };
}
export default connect(
  mapStateToProps,
  { getSelectedGroup, getGroupMessages, addMessage }
)(Group);
