import { Typography, Paper, Grid, Divider } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Product from '../Products/Product/Product';
import useStyles from './styles';
const ProductDetails = ({ product, products, category, getProductDetails, getRelatedProducts, onAddToCart }) => {
    const { id } = useParams();
    const classes = useStyles();

    useEffect(() => {
        getProductDetails(id);
    }, [id]);

    useEffect(() => {
        if (product && product.categories.length > 0) getRelatedProducts(product.categories[0].id);
    }, [product]);

    if (!product && !category) return null;

    return (
        <>
            <div className={classes.toolbar} />
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <Typography variant="h3" component="h2">{product.name}</Typography>
                        <Typography gutterBottom dangerouslySetInnerHTML={{ __html: product.description }} variant="body1" component="p" />
                        <Typography variant="h6">Price : {product.price.formatted_with_code} </Typography>
                        <Divider style={{ margin: '20px 0' }} />
                        <Typography variant="body1"><strong>Product Recommendations - comming soon</strong></Typography>
                        <Divider style={{ margin: '20px 0' }} />
                        <Typography variant="body1"><strong>Review - coming soon!</strong></Typography>
                        <Divider style={{ margin: '20px 0' }} />
                    </div>
                    <div className={classes.imageSection}>
                        <img className={classes.media} src={product.media.source || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={product.name} />
                    </div>
                </div>
            </Paper>
        </>
    )
}

export default ProductDetails