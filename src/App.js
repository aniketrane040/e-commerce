import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import Navbar from './components/Navbar/Navbar'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './components/CheckoutForm/Checkout';
import ProductDetails from './components/ProductDetails/ProductDetails';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [product, setProduct] = useState();
    const [category, setCategory] = useState();

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])

    const handleAddToCart = async (productId, quantity) => {
        const response = await commerce.cart.add(productId, quantity);
        setCart(response.cart);
    }

    const handleUpdateQty = async (productId, quantity) => {
        const response = await commerce.cart.update(productId, { quantity });
        setCart(response.cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const response = await commerce.cart.remove(productId);
        setCart(response.cart);
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    };

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);

            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    };

    const getProductDetails = async (productId) => {
        setProduct(await commerce.products.retrieve(productId));
    }

    const getRelatedProducts = async (categoryId) => {
        setCategory(await commerce.categories.retrieve(categoryId));
    }

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path='/'>
                        <Products products={products} onAddToCart={handleAddToCart} />
                    </Route>

                    <Route exact path='/cart'>
                        <Cart cart={cart} onUpdateQty={handleUpdateQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
                    </Route>

                    <Route exact path='/checkout'>
                        <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
                    </Route>

                    <Route exact path='/product/:id'>
                        <ProductDetails product={product} products={products} category={category} getProductDetails={getProductDetails} getRelatedProducts={getRelatedProducts} onAddToCart={handleAddToCart} />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
