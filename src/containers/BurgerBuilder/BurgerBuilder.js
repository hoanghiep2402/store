import React,{Component,Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../ultils/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICE={
        salad:0.5,
        cheese:0.4,
        meat:1.3,
        bacon:0.7
};

class BurgerBuilder extends Component{
   state={
       ingredients:null,
       totalPrice:4,
       purchasable:false,
       purchasing:false,
       loading:false
   };
   componentDidMount(){
       axios.get('https://react-burger-760f2.firebaseio.com/ingredients.json').then((res)=>{
           this.setState({ingredients:res.data})
       }).catch(e=>{
           console.log(e)
       })
   }

    updatePurchaseState=(ingredients)=>{
        const sum=Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0)>0;
        this.setState({
            purchasable:sum
        })
    };

   ingredientAdded=(type)=>{
        const oldCount=this.state.ingredients[type];
        let updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=oldCount+1;
        const priceAddition=INGREDIENT_PRICE[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({
            ingredients:updatedIngredients,
            totalPrice:newPrice
        });
       this.updatePurchaseState(updatedIngredients);
   };

    removeIngredient=(type)=>{
        const oldCount=this.state.ingredients[type];
        if (oldCount<=0) return;
        let updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=oldCount-1;
        const priceDeducetion=INGREDIENT_PRICE[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeducetion;
        this.setState({
            ingredients:updatedIngredients,
            totalPrice:newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseBurger=()=>{
      this.setState({purchasing:true})
    };
    closeModalPurchase=()=>{
      this.setState({
          purchasing:false
      })
    };
    purchaseContinueHandler=()=>{
        this.setState({loading:true});
        const order={
            ingredients:this.state.ingredients,
            customer:{
            address:{
                street: 'Teststreet 1',
                zipCode: '12345',
                country: 'VietNam'
            },
            email: 'abc@gmail.com'
            },
            deliveryMethod:'fastest'
        };
        //send data to backend
        axios.post('/orders.json',order).then((res)=>{
                if(res.status===200){
                        this.setState({loading:false, purchasing:false});
                    console.log(res.status)
                }
            }
        ).catch(e=>{
            this.setState({loading:false, purchasing:false})
        })
    };

    render() {
        let  disableInfo={...this.state.ingredients};
        for (let key in disableInfo){
            disableInfo[key]=disableInfo[key]<=0;
        }
        let orderSummary=null;
       const {ingredients}=this.state;
        let burger=<Spinner />;
        if (ingredients) {
            burger=(
                <Fragment>
                    <Burger ingredients={ingredients} />
                    <BuildControls
                        addIngredient={this.ingredientAdded}
                        removeIngredient={this.removeIngredient}
                        disabled={disableInfo}
                        totalPrice={this.state.totalPrice}
                        disableOrder={this.state.purchasable}
                        show={this.purchaseBurger}
                    />
                </Fragment>
            );
            orderSummary= <OrderSummary
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                purchaseCancel={this.closeModalPurchase}
                purchaseContinued={this.purchaseContinueHandler}
            />;
        }
        if (this.state.loading){
            orderSummary=<Spinner />
        }

        return (
            <Fragment>
                    <Modal
                        show={this.state.purchasing}
                        modalClosed={this.closeModalPurchase}
                    >
                        {orderSummary}
                    </Modal>

                {burger}


            </Fragment>
        );
    }


}

export default withErrorHandler(BurgerBuilder,axios);