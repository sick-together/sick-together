import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Redirect, Link } from 'react-router-dom'
import { editUser, editUserProfilePic } from '../../Redux/userReducer'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(3),
    },
    accountTitle: {
        marginBottom: 50
    },
    accountAvatar: {
        height: 200,
        width: 200,
        border: 'solid'
    },
    userPic: {
        height: 200,
        width: 200
    },
    editButton: {
        width: 50,
        fontSize: 18
    },
    submitButton: {
        width: 100,
        fontSize: 18
    },
    cancelButton: {
        width: 100,
        fontSize: 18,
        marginRight: '5px'
    },
    titles: {
        margin: '5px 0px'
    }

}));

function AccountSetttings(props) {
    const classes = useStyles();
    const fileInput = useRef(null);
    const [edit, setEdit] = React.useState(false)
    const [editPic, setEditPic] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [newUsername, setnewUsername] = React.useState(props.user.username)
    const [newCity, setnewCity] = React.useState(props.user.city)
    const [newState, setnewState] = React.useState(props.user.state)

    function handleClose() {
        setEdit(false)
    }
    function handleOpen() {
        setEdit(true)
    }
    function fileUploadHandler(filename) {
        let { user } = props
        firebase.storage().ref('uploads').child(filename).getDownloadURL()
            .then(url => props.editUserProfilePic(+user.id, url))
    }
    function handlePicClose() {
        setEditPic(false)
    }
    function handlePicOpen() {
        setEditPic(true)
    }
    function handleStateClose() {
        setOpen(false)
    }
    function handleStateOpen() {
        setOpen(true)
    }
    function handleStateChange(e) {
        setnewState(e.target.value)
    }
    function editInfo() {
        props.editUser(props.user.id, newUsername, newCity, newState)
        setEdit(false)
    }

    useEffect(() => {
        console.log('wow', props.user);
    }, [props.user])

    function editProfilePic() {

    }
    if (!props.user.loggedIn) return <Redirect to="/" />;
    console.log(props)
    return (
        <Paper className={classes.root}>
            <Typography variant='h3' className={classes.accountTitle}>Account Settings</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar className={classes.accountAvatar} src={props.user.profilePic}>
                </Avatar>
                <div className='url-icon'>
                    <label style={{ display: 'none' }} ref={fileInput}><FileUploader
                        hidden='true'
                        accept='image/*'
                        name='fileSelected'
                        storageRef={firebase.storage().ref('uploads')}
                        onUploadSuccess={fileUploadHandler} />
                    </label>

                    <Button style={{ margin: '10px' }} variant="contained" color="primary" className={classes.button} onClick={() => fileInput.current.click()} title='Upload'>
                        <p style={{ marginRight: '5px' }}> Upload </p>
                        <CloudUploadIcon className={classes.rightIcon} />
                    </Button>
                </div>

            </div>
            {edit === false ?
                (<Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Typography variant='h5' className={classes.titles}>Username</Typography>
                    <Typography>{props.user.username}</Typography>
                    <Typography variant='h5' className={classes.titles}>City</Typography>
                    <Typography>{props.user.city}</Typography>
                    <Typography variant='h5' className={classes.titles}>State</Typography>
                    <Typography>{props.user.state}</Typography>
                    <Typography></Typography>
                    <Button variant='contained' color='primary' className={classes.editButton} style={{ marginTop: '15px' }} onClick={handleOpen}>Edit</Button>
                </Container>)
                :
                (<Container className={classes.root} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        id='username-input'
                        label='Username'
                        name='newUsername'
                        value={newUsername}
                        onChange={e => setnewUsername(e.target.value)}
                        margin='normal'
                    />

                    <TextField
                        id='city-input'
                        label='City'
                        name='newCity'
                        value={newCity}
                        onChange={e => setnewCity(e.target.value)}
                        margin='normal'
                    />

                    <Select
                        open={open}
                        onClose={handleStateClose}
                        onOpen={handleStateOpen}
                        value={newState}
                        onChange={handleStateChange}
                        inputProps={{
                            name: 'state',
                            id: 'user-select-state',
                        }}
                    >
                        <MenuItem value={'AL'}>Alabama</MenuItem>
                        <MenuItem value={'AK'}>Alaska</MenuItem>
                        <MenuItem value={'AZ'}>Arizona</MenuItem>
                        <MenuItem value={'AR'}>Arkansas</MenuItem>
                        <MenuItem value={'CA'}>California</MenuItem>
                        <MenuItem value={'CO'}>Colorado</MenuItem>
                        <MenuItem value={'CT'}>Connecticut</MenuItem>
                        <MenuItem value={'DE'}>Delaware</MenuItem>
                        <MenuItem value={'FL'}>Florida</MenuItem>
                        <MenuItem value={'GA'}>Georgia</MenuItem>
                        <MenuItem value={'HI'}>Hawaii</MenuItem>
                        <MenuItem value={'ID'}>Idaho</MenuItem>
                        <MenuItem value={'IL'}>Illinois</MenuItem>
                        <MenuItem value={'IN'}>Indiana</MenuItem>
                        <MenuItem value={'IA'}>Iowa</MenuItem>
                        <MenuItem value={'KS'}>Kansas</MenuItem>
                        <MenuItem value={'KY'}>Kentucky</MenuItem>
                        <MenuItem value={'LA'}>Louisiana</MenuItem>
                        <MenuItem value={'ME'}>Maine</MenuItem>
                        <MenuItem value={'MD'}>Maryland</MenuItem>
                        <MenuItem value={'MA'}>Massachusetts</MenuItem>
                        <MenuItem value={'MI'}>Michigan</MenuItem>
                        <MenuItem value={'MN'}>Minnesota</MenuItem>
                        <MenuItem value={'MS'}>Mississippi</MenuItem>
                        <MenuItem value={'MO'}>Missouri</MenuItem>
                        <MenuItem value={'MT'}>Montana</MenuItem>
                        <MenuItem value={'NE'}>Nebraska</MenuItem>
                        <MenuItem value={'NV'}>Nevada</MenuItem>
                        <MenuItem value={'NH'}>New Hampshire</MenuItem>
                        <MenuItem value={'NJ'}>New Jersey</MenuItem>
                        <MenuItem value={'NM'}>New Mexico</MenuItem>
                        <MenuItem value={'NY'}>New York</MenuItem>
                        <MenuItem value={'NC'}>North Carolina</MenuItem>
                        <MenuItem value={'ND'}>North Dakota</MenuItem>
                        <MenuItem value={'OH'}>Ohio</MenuItem>
                        <MenuItem value={'OK'}>Oklahoma</MenuItem>
                        <MenuItem value={'OR'}>Oregon</MenuItem>
                        <MenuItem value={'PA'}>Pennsylvania</MenuItem>
                        <MenuItem value={'RI'}>Rhode Island</MenuItem>
                        <MenuItem value={'SC'}>South Carolina</MenuItem>
                        <MenuItem value={'SD'}>South Dakota</MenuItem>
                        <MenuItem value={'TN'}>Tennessee</MenuItem>
                        <MenuItem value={'TX'}>Texas</MenuItem>
                        <MenuItem value={'UT'}>Utah</MenuItem>
                        <MenuItem value={'VT'}>Vermont</MenuItem>
                        <MenuItem value={'VA'}>Virginia</MenuItem>
                        <MenuItem value={'WA'}>Washington</MenuItem>
                        <MenuItem value={'WV'}>West Virginia</MenuItem>
                        <MenuItem value={'WI'}>Wisconsin</MenuItem>
                        <MenuItem value={'WY'}>Wyoming</MenuItem>
                    </Select>
                    <section style={{ display: 'flex', marginTop: '30px' }}>
                        <Button variant='contained' onClick={handleClose} color='primary' className={classes.cancelButton}>Cancel</Button>
                        <Button variant='contained' onClick={editInfo} color='primary' className={classes.submitButton}>Submit</Button>
                    </section>
                </Container>)
            }

        </Paper>
    )
}

function mapStateToProps(state) {
    return state.user
}

export default connect(mapStateToProps, { editUser, editUserProfilePic })(AccountSetttings)