import React, {Fragment} from 'react';
import classes from './OrderSummary.css';
import Button from '../../UI/Button/Button';

const orderSummary=(props)=>{
    const ingredientSummary=Object.keys(props.ingredients).map((igKey,i)=>{
        return <li key={i}>
            <span className={classes.capitalize}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
    });



    return(
        <Fragment >
            <h3> Your  Order </h3>
            <p>Price :{props.totalPrice}$</p>
            <p>A delicous Order Burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to CheckOut?</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}> Order </Button>
        </Fragment>
        );

};

export default orderSummary;