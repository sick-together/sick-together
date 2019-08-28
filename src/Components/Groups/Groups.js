import React, { useEffect } from "react";
import clsx from "clsx";
import {
  getSelectedGroup,
  deleteGroup,
  editGroup,
  searchGroups,
  getGroups,
  setEditId,
  joinGroup,
  leaveGroup,
  getEditInfo,
  getJoinedGroups
} from "../../Redux/groupReducer.js";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import GroupIcon from "@material-ui/icons/Group";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  // feedMaster: {
  //   width: '100%'
  // },
  card: {
    maxWidth: 725,
    width: "85vw",
    minWidth: "50vw",
    marginTop: 10
  },
  groupButtons: {
    display: "flex",
    justifyContent: "space-between"
  },
  textField: {
    width: "99vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    position: "sticky",
    top: 64,
    ["@media (max-width:750px)"]: {
      top: 56
    },
    zIndex: 1
  },
  chatBox: {
    width: "40vw",
    marginLeft: "5px",
    paddingBottom: 5
  }
});

function Groups(props) {
  const classes = useStyles();
  let { groups, joinedGroups, } = props.groups;
  let { user } = props.user
  const [searchInput, setSearchInput] = React.useState('')
  const [myAreaChecked, changeAreaChecker] = React.useState(false);
  const [myGroupsChecked, changeGroupsChecker] = React.useState(false);
  let arrayOfJoinedIds = []
  if (joinedGroups && joinedGroups.length) {
    joinedGroups.forEach(item => arrayOfJoinedIds.push(item.group_id))
  }
  useEffect(() => {
    if (searchInput === ''){
      props.getGroups()
    }
    props.getJoinedGroups()

  }, [groups.length])


  function setSearch(e) {
    let newSearch = e;
    console.log(newSearch);
    setSearchInput(newSearch);
    if (e === "") {
      props.getGroups();
    }
  }
  function enterSearch(e) {
    if (e.keyCode === 13) {
      if (searchInput !== "") {
        props.searchGroups(myAreaChecked, searchInput);
      }
    }
  }

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
      }}
    >
      <Paper className={classes.textField}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SearchIcon />
          <TextField
            id="outlined-dense"
            label="Search for groups"
            className={clsx(classes.chatBox, classes.dense)}
            margin="dense"
            variant="outlined"
            onChange={e => setSearch(e.target.value)}
            onKeyDown={enterSearch}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginLeft: '10px' }}>
          <Typography>My Area</Typography>
          <Checkbox
            checked={myAreaChecked}
            onChange={() => changeAreaChecker(!myAreaChecked)}
            value="checkBox"
            color="primary"
            inputProps={{
              "aria-label": "secondary checkbox"
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography>My Groups</Typography>
          <Checkbox
            checked={myGroupsChecked}
            onChange={() => changeGroupsChecker(!myGroupsChecked)}
            value="checkBox"
            color="primary"
            inputProps={{
              "aria-label": "secondary checkbox"
            }}
          />
        </div>
      </Paper>
      {groups && myGroupsChecked && myAreaChecked ?
        (groups.map(group => {
          if (arrayOfJoinedIds.includes(group.group_id) && group.location === `${user.city}, ${user.state}`) {
            return (
              <div className={classes.feedMaster} key={group.group_id}>
                <Card className={classes.card}>
                  <a
                    href={"#/group/" + group.group_id}
                    key={group.group_id}
                    onClick={() => props.getSelectedGroup(group.group_id)}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Add group to join the chat!"
                        height="175"
                        image={group.group_picture}
                        title={group.group_name}
                      />
                      <CardContent>
                        <section
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}
                        >
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                          >
                            {group.group_name}
                          </Typography>
                          <Typography
                            variant="p"
                            style={{ color: "#555962" }}
                          >
                            {group.location}
                          </Typography>
                        </section>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {group.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </a>
                  <CardActions className={classes.groupButtons}>
                    <Button size="small" color="primary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <GroupIcon className={classes.groupicon} />
                      <p style={{ marginLeft: '5px' }}>{group.members}</p>
                    </Button>
                    {arrayOfJoinedIds.includes(+group.group_id) ? (<Button size="small" color="primary">
                      <CheckBoxIcon className={classes.addicon} onClick={() => props.leaveGroup(group.group_id)} />
                    </Button>) : (<Button size="small" color="primary">
                      <AddBoxIcon className={classes.addicon} onClick={() => props.joinGroup(group.group_id)} />
                    </Button>)}
                    {group.user_id === props.user.user.id ? (
                      <div>
                        <a
                          href={"#/editgroup/" + group.group_id}
                          key={group.group_id}
                          onClick={() => props.getEditInfo(group.group_id)}
                        >
                          <Button
                            size="small"
                            style={{ color: "green" }}
                          >
                            Edit Group
                        </Button>
                        </a>
                        <Button
                          size="small"
                          style={{ color: "#DC143C" }}
                          onClick={() => props.deleteGroup(group.group_id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    ) : null}
                  </CardActions>
                </Card>
              </div>
            );
          }
        })
        ) :
        groups && myAreaChecked
        ? (groups.map(group => {
          if (group.location === `${user.city}, ${user.state}`) {
            return (
              <div className={classes.feedMaster} key={group.group_id}>
                <Card className={classes.card}>
                  <a
                    href={"#/group/" + group.group_id}
                    key={group.group_id}
                    onClick={() => props.getSelectedGroup(group.group_id)}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Add group to join the chat!"
                        height="175"
                        image={group.group_picture}
                        title={group.group_name}
                      />
                      <CardContent>
                        <section
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}
                        >
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                          >
                            {group.group_name}
                          </Typography>
                          <Typography
                            variant="p"
                            style={{ color: "#555962" }}
                          >
                            {group.location}
                          </Typography>
                        </section>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {group.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </a>
                  <CardActions className={classes.groupButtons}>
                    <Button size="small" color="primary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <GroupIcon className={classes.groupicon} />
                      <p style={{ marginLeft: '5px' }}>{group.members}</p>
                    </Button>
                    {arrayOfJoinedIds.includes(+group.group_id) ? (<Button size="small" color="primary">
                      <CheckBoxIcon className={classes.addicon} onClick={() => props.leaveGroup(group.group_id)} />
                    </Button>) : (<Button size="small" color="primary">
                      <AddBoxIcon className={classes.addicon} onClick={() => props.joinGroup(group.group_id)} />
                    </Button>)}
                    {group.user_id === props.user.user.id ? (
                      <div>
                        <a
                          href={"#/editgroup/" + group.group_id}
                          key={group.group_id}
                          onClick={() => props.getEditInfo(group.group_id)}
                        >
                          <Button
                            size="small"
                            style={{ color: "green" }}
                          >
                            Edit Group
                        </Button>
                        </a>
                        <Button
                          size="small"
                          style={{ color: "#DC143C" }}
                          onClick={() => props.deleteGroup(group.group_id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    ) : null}
                  </CardActions>
                </Card>
              </div>
            );
          }
        })
        ) : groups && myGroupsChecked ?
        (groups.map(group => {
          if (group && arrayOfJoinedIds.includes(group.group_id)) {
            return (
              <div className={classes.feedMaster} key={group.group_id}>
                <Card className={classes.card}>
                  <a
                    href={"#/group/" + group.group_id}
                    key={group.group_id}
                    onClick={() => props.getSelectedGroup(group.group_id)}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Add group to join the chat!"
                        height="175"
                        image={group.group_picture}
                        title={group.group_name}
                      />
                      <CardContent>
                        <section
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}
                        >
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                          >
                            {group.group_name}
                          </Typography>
                          <Typography
                            variant="p"
                            style={{ color: "#555962" }}
                          >
                            {group.location}
                          </Typography>
                        </section>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {group.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </a>
                  <CardActions className={classes.groupButtons}>
                    <Button size="small" color="primary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <GroupIcon className={classes.groupicon} />
                      <p style={{ marginLeft: '5px' }}>{group.members}</p>
                    </Button>
                    {arrayOfJoinedIds.includes(+group.group_id) ? (<Button size="small" color="primary">
                      <CheckBoxIcon className={classes.addicon} onClick={() => props.leaveGroup(group.group_id)} />
                    </Button>) : (<Button size="small" color="primary">
                      <AddBoxIcon className={classes.addicon} onClick={() => props.joinGroup(group.group_id)} />
                    </Button>)}
                    {group.user_id === props.user.user.id ? (
                      <div>
                        <a
                          href={"#/editgroup/" + group.group_id}
                          key={group.group_id}
                          onClick={() => props.getEditInfo(group.group_id)}
                        >
                          <Button
                            size="small"
                            style={{ color: "green" }}
                          >
                            Edit Group
                        </Button>
                        </a>
                        <Button
                          size="small"
                          style={{ color: "#DC143C" }}
                          onClick={() => props.deleteGroup(group.group_id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    ) : null}
                  </CardActions>
                </Card>
              </div>
            );
          }
        })
        ) : 
        groups
          ? (groups.map(group => {
            return (
              <div className={classes.feedMaster} key={group.group_id}>
                <Card className={classes.card}>
                  <a
                    href={"#/group/" + group.group_id}
                    key={group.group_id}
                    onClick={() => props.getSelectedGroup(group.group_id)}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Add group to join the chat!"
                        height="175"
                        image={group.group_picture}
                        title={group.group_name}
                      />
                      <CardContent>
                        <section
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}
                        >
                          <Typography gutterBottom variant="h5" component="h2">
                            {group.group_name}
                          </Typography>
                          <Typography variant="p" style={{ color: "#555962" }}>
                            {group.location}
                          </Typography>
                        </section>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {group.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </a>
                  <CardActions className={classes.groupButtons}>
                    <Button size="small" color="primary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <GroupIcon className={classes.groupicon} />
                      <p style={{ marginLeft: '3px' }}>{group.members}</p>
                    </Button>
                    {arrayOfJoinedIds.includes(+group.group_id) ? (<Button size="small" color="primary">
                      <CheckBoxIcon className={classes.addicon} onClick={() => props.leaveGroup(group.group_id)} />
                    </Button>) : (<Button size="small" color="primary">
                      <AddBoxIcon className={classes.addicon} onClick={() => props.joinGroup(group.group_id)} />
                    </Button>)}
                    {group.user_id === props.user.user.id ? (
                      <div>
                        <a
                          href={"#/editgroup/" + group.group_id}
                          key={group.group_id}
                          onClick={() => props.getEditInfo(group.group_id)}
                        >
                          <Button
                            size="small"
                            style={{ color: "green" }}
                          >
                            Edit Group
                        </Button>
                        </a>
                        <Button
                          size="small"
                          style={{ color: "#DC143C" }}
                          onClick={() => props.deleteGroup(group.group_id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    ) : null}
                  </CardActions>
                </Card>
              </div>
            );
          })) : null
      }
    </section >);
}

function mapStateToProps(state) {
  return {
    user: state.user,
    groups: state.groups
  };
}
export default connect(
  mapStateToProps,
  { getSelectedGroup, deleteGroup, searchGroups, getGroups, joinGroup, leaveGroup, editGroup, setEditId, getEditInfo, getJoinedGroups }
)(Groups);
