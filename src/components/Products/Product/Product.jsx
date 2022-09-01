import { Card, CardActions, CardContent, CardMedia, ButtonBase, IconButton, Typography } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();
    const history = useHistory();

    const showProduct = () => {
        history.push(`/product/${product.id}`);
    }

    return (
        <Card className={classes.root}>
            <ButtonBase
                component="span"
                name="test"
                className={classes.cardAction}
                onClick={showProduct}
            >
                <CardMedia className={classes.media} image={product.media.source} title={product.name} />
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant="h5" gutterBottom>{product.name}</Typography>
                        <Typography variant="h5" >{product.price.formatted_with_code}</Typography>
                    </div>
                    <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" />
                </CardContent>
            </ButtonBase>
            <CardActions disableSpacing className={classes.cardActions} >
                <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product;
