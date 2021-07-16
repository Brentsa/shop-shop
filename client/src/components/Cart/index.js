import React, {useEffect} from "react";
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

function Cart(){

    const [state, dispatch] = useStoreContext();

    //gets called when cart is rendered
    useEffect(()=>{
        //return whatever is in the idb cart and store it to the global store
        async function getCart(){
            const cart = await idbPromise('cart', 'get');
            dispatch({
                type: ADD_MULTIPLE_TO_CART,
                products: [...cart]
            })
        }

        //if there is nothing in the cart, try getting the cart from idb
        if(!state.cart.length){
            getCart();
        }

    }, [state.cart.length, dispatch]);

    function toggleCart(){
        dispatch({type: TOGGLE_CART});
    }

    function calculateTotal(){
        return state.cart.reduce((sum, product) => sum + product.price * product.purchaseQuantity, 0).toFixed(2);
    }

    if(!state.cartOpen){
        return (
            <div className="cart-closed" onClick={toggleCart}>
                <span role="img" aria-label="cart">🛒</span>
            </div>
        );
    }

    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>[close]</div>
            <h2>Shopping Cart</h2>
            {state.cart.length ? (
                <div>
                    {state.cart.map(item => (
                        <CartItem key={item._id} item={item}/>
                    ))}
                    <div className="flex-row space-between">
                        <strong>Total: ${calculateTotal()}</strong>
                        {
                            Auth.loggedIn() ? <button>Checkout</button> : <span>(log in to check out)</span>
                        }
                    </div>
                </div>
            ):(
                <h3>
                    <span aria-label="shocked" role="img">😱</span>
                    You haven't added anything to your cart yet!
                </h3>
            )}
        </div>
    )
}

export default Cart;