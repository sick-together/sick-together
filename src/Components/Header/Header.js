import React, { useEffect } from "react";
import clsx from "clsx";
import io from 'socket.io-client'
import { connect } from "react-redux";
import { logout, getUser } from "../../Redux/userReducer.js";
import { getJoinedGroups, getSelectedGroup } from '../../Redux/groupReducer.js'
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from '@material-ui/icons/Home'


const socket = io()

const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: '100%'
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  }
}));

function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [joinedList, changeJoinedList] = React.useState(['Create New Group'])


  useEffect(() => {
    props.getJoinedGroups();
    if (props.joinedGroups.length) {
      changeJoinedList([...props.joinedGroups, 'Create New Group'])
    }
  }, [props.joinedGroups.length]);


  useEffect(() => {
    props.getUser()
  }, [])

  function getSelected(groupId) {
    props.getSelectedGroup(groupId)
    handleDrawerClose()
  }

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            id='hamburger'
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <Link to="/dashboard"> <i className="fas fa-comment-medical" style={{ marginRight: '5px' }} /> Sick Together</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        onClose={handleDrawerClose}
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
                <ChevronRightIcon />
              )}
          </IconButton>
        </div>
        <Divider style={{ width: '100%' }} />
        <List>
          <Link to='/dashboard'>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
          </Link>
          <Link to='/accountsettings'>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText>My Account</ListItemText>
            </ListItem>
          </Link>


          {["Inbox", "Logout"].map(
            (text, index) => (
              <ListItem
                button
                key={text}
                onClick={text === "Logout" ? props.logout : null}
              >
                <ListItemIcon>
                  {text === "Logout" ? (
                    <ExitToAppIcon />
                  ) : text === 'Inbox' ? (
                    <InboxIcon />
                  ) : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider style={{ width: '100%' }} />
        <List>
          {
            joinedList.map((text, index) => (
              <div key={index}>
                {text === "Create New Group" ? (
                  <Link to="/creategroup">
                    <ListItem button onClick={handleDrawerClose}>
                      <ListItemIcon>
                        <Fab
                          id='add-group'
                          size="small"
                          color="primary"
                          aria-label="add"
                          className={classes.margin}
                        >
                          <AddIcon />
                        </Fab>
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                ) : (
                    <a
                      href={"#/group/" + text.group_id}
                      key={index}
                      onClick={() => getSelected(text.group_id)}
                    >
                      <ListItem button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar alt="Group Avatar" title={text.group_name} src={text.group_picture} className={classes.bigAvatar} />
                      </ListItem>
                    </a>
                  )}
              </div>
            ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
function mapStateToProps(state) {
  return { ...state.user, ...state.groups }
}

export default connect(
  mapStateToProps,
  { logout, getUser, getJoinedGroups, getSelectedGroup }
)(Header);
