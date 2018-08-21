import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls=[
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'}
];

const buildControls=(props)=>(
    <div className={classes.BuildControls}>
        <h2 >Total Price: <strong>{props.totalPrice.toFixed(2)}</strong></h2>
        {controls.map(item=> <BuildControl
            key={item.label}
            label={item.label}
            addIngredient={()=>props.addIngredient(item.type)}
            removeIngredient={()=>props.removeIngredient(item.type)}
            disabled={props.disabled[item.type]}
        />)}
        <button
            className={classes.OrderButton}
            disabled={!props.disableOrder}
            onClick={props.show}
        >Order</button>
    </div>
);

export default buildControls;