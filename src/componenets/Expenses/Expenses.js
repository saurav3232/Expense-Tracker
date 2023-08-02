import React from "react";
import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
const Expenses = (props) => {
    const deleteExpense=(deleteExpTitle)=>{
        console.log(deleteExpTitle);
        props.deleteExpense(deleteExpTitle);
    }
    return (
        <>
            {props.item.length && 
            <Card className="expenses">
            {props.item.map((expense,index) => (
                <ExpenseItem
                    key={index}
                    date={expense.date}
                    title={expense.title}
                    amount={expense.amount}
                    onDeleteExpenseHandler={
                        deleteExpense
                    }
                />
            ))}
        </Card>}
        </>
        
    );
};
export default Expenses;
