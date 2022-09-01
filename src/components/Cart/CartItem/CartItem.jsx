import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles.js';

const CartItem = ({ item , onUpdateQty , onRemoveFromCart }) => {
    const classes = useStyles();

    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} ></CardMedia>
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_code}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button size='small' type='button' onClick={() => onUpdateQty(item.id,item.quantity - 1)} >-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button size='small' type='button' onClick={() => onUpdateQty(item.id,item.quantity + 1)} >+</Button>
                </div>
                <Button variant='contained' type='button' color='secondary' onClick={() => onRemoveFromCart(item.id)} >Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem;
