import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WorkIcon from '@material-ui/icons/Work';

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Health" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Productivity" />
        </ListItem>
    </div>
);
