import React from 'react';
import { getSelectedGroup } from '../../Redux/groupReducer.js'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/Group';
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles({
    card: {
        maxWidth: 725,
        marginTop: 10
    },
    groupButtons: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});

function Groups(props) {
    const classes = useStyles();
    let { groups } = props.groups
    return (
        groups.map(group => {
            return (
                <a href={'#/group/' + group.group_id} key={group.group_id} onClick={() => props.getSelectedGroup(group.group_id)}>
                    <Card className={classes.card} >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={group.group_picture}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {group.group_name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {group.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.groupButtons}>
                            <Button size="small" color="primary">
                                <GroupIcon className={classes.groupicon} />

                            </Button>
                            <Button size="small" color="primary">
                                <AddBoxIcon className={classes.addicon} />
                            </Button>
                        </CardActions>
                    </Card>
                </a>
            )
        })

    );
}


function mapStateToProps(state) {
    return {
        user: state.user,
        groups: state.groups
    }
}
export default connect(
    mapStateToProps,
    { getSelectedGroup }
)(Groups);
