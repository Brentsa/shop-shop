import React, {useEffect} from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron/index.js';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import { useStoreContext } from '../utils/GlobalState.js';
import { CLEAR_CART } from '../utils/actions.js';

function Success(){

    const [, dispatch] = useStoreContext();

    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
        async function saveOrder(){
            //get the cart from our idb
            const cart = await idbPromise('cart', 'get');
            //get create a products id array
            const products = cart.map(item => item._id);

            if (products.length) {
                const { data } = await addOrder({ variables: { products } });
                const productData = data.addOrder.products;
              
                productData.forEach((item) => {
                  idbPromise('cart', 'delete', item);
                });

                dispatch({
                    type: CLEAR_CART
                });
            }

            setTimeout(()=>{
                window.location.assign('/');
            }, 3000)
        }

        saveOrder()

    }, [addOrder, dispatch]);

    return (
        <div>
            <Jumbotron>
                <h1>Success!</h1>
                <h2>Thank you for your purchase!</h2>
                <h2>You will now be redirected to the homepage</h2>
            </Jumbotron>
        </div>
    );
};

export default Success;