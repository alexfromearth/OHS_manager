import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import BusinessIcon from '@material-ui/icons/Business';
import GroupIcon from '@material-ui/icons/Group';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EventNoteIcon from '@material-ui/icons/EventNote';

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        color: "black",
    }
}));


// <button><Link to='/company'>Компания</Link></button> {/* информация о компании */}
// <button><Link to='staff'>Cотрудники</Link></button> {/* список сотрудников */}
// <button><Link to='/timetable'>Расписание</Link></button> {/* расписание на неделю */}
// <button><Link to='/note'>Памятка</Link></button> {/* памятка охранника труда */}


const MainListItems = () => {
    const classes = useStyles();

    return (
        <div>
            <Link to="/company" className={classes.link}>
                <ListItem button>
                    <ListItemIcon>
                        <BusinessIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Компания"/>
                </ListItem>
            </Link>
            <Link to="/employees" className={classes.link}>
                <ListItem button>
                    <ListItemIcon>
                        <GroupIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Cотрудники"/>
                </ListItem>
            </Link>
            <Link to="/timetable" className={classes.link}>
                <ListItem button>
                    <ListItemIcon>
                        <ListAltIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Расписание"/>
                </ListItem>
            </Link>
            <Link to="/note" className={classes.link}>
                <ListItem button>
                    <ListItemIcon>
                        <EventNoteIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Памятка"/>
                </ListItem>
            </Link>
        </div>
    )
};

export default MainListItems;


// export const secondaryListItems = (
//     <div>
//         <ListSubheader inset>Saved reports</ListSubheader>
//         <ListItem button>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Current month" />
//         </ListItem>
//         <ListItem button>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Last quarter" />
//         </ListItem>
//         <ListItem button>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Year-end sale" />
//         </ListItem>
//     </div>
// );


