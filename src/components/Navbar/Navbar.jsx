import React from 'react';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assests/ecommerce.jpg'
import useStyles from './styles';
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    return (
        <>
            <AppBar className={classes.appBar} color="inherit" position="fixed">
                <Toolbar>
                    <Typography component={Link} to='/' variant="h6" color="inherit" className={classes.title} >
                        <img src={logo} alt="commerce.js" height="25px" className={classes.image} />
                        Commerce.js
                    </Typography>
                    <div className={classes.grow} />
                    {
                        location.pathname !== '/cart' && (
                            <div className={classes.button}>
                                <IconButton aria-label="Show Cart Items" color="inherit" onClick={() => history.push('/cart')} >
                                    <Badge badgeContent={totalItems} color='secondary' >
                                        <ShoppingCart />
                                    </Badge>
                                </IconButton>
                            </div>
                        )
                    }

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;
