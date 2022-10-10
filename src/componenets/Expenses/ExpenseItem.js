// import React,{useState} from "react";
import "./ExpenseItem.css";
import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate.js";
const ExpenseItem = (props) => {
    
    
    // const [newTitle,setNewTitle]=useState("hi");
    
    // const [title, setTitle] = useState(props.title);//returns an array of variable and a function
    // const clickHandler = () => {
    //     setTitle(newTitle);
    // }
    // const changeHandler=(event)=>{
    //     setNewTitle(event.target.value);
    // }   
    const deleteExpenseHandler=()=>{
        
        console.log(props.title);
        props.onDeleteExpenseHandler(props.title);
    }
    return (
        <Card className="expense-item">
            <div className="item-date">
                <ExpenseDate date={new Date(props.date)} />
            </div>
            <div className="expense-item__description">
                {/* <h2>{title}</h2> */}
                <h2>{props.title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
            {/* <input type="text" value={newTitle} onChange={changeHandler} />
            <button onClick={click
            Handler}>Change Title</button> */}
            <button className="delButt"onClick={deleteExpenseHandler}>Delete Expense</button>
        </Card>
    );

}

export default ExpenseItem;
