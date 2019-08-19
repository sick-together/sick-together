import React from 'react';
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


let groups = [
    {
        title: 'Sick R Us',
        description: 'Interact with sick people from all around the world',
        image: 'https://media-prod.ii.co.uk/s3fs-public/2019-06/global%20markets_0.jpg'
    },
    {
        title: 'Down with the sickness',
        description: 'Interact with sick people from all around the world',
        image: 'https://s.abcnews.com/images/International/thailand-cave-hospital-left-gty-ps-180711_hpMain_16x9_992.jpg'
    },
    {
        title: `Flyleaf - I'm So Sick`,
        description: 'Interact with sick people from all around the world',
        image: 'https://cdnb.artstation.com/p/assets/images/images/013/491/379/large/goliat-gashi-infirmary.jpg?1539830517'
    },
    {
        title: 'Strong Memorial Hospital',
        description: 'Interact with sick people from all around the world',
        image: 'https://www.urmc.rochester.edu/MediaLibraries/URMCMedia/strong-memorial/images/home-slider/VisitingInformation.jpg'
    },
]

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

export default function ImgMediaCard() {
    const classes = useStyles();

    return (
        groups.map(group => {
            return (
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={group.image}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {group.title}
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
            )
        })

    );
}