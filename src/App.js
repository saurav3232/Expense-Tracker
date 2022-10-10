import React, { useState, useEffect } from "react";
import NewExpense from "./componenets/NewExpenses/NewExpense";
import Expenses from "./componenets/Expenses/Expenses";
import TotalExpense from "./componenets/TotalExpense/TotalExpense";
const App = () => {
  let DUMMY_EXPENSE = [];
  let total=0;
  const [totalExpense,setTotalExpense]=useState(total);
  const [expenses, setExpenses] = useState(DUMMY_EXPENSE);
  function fetchData() {
    fetch("http://localhost:5000/list")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        data.forEach((ex) => {
          total+=ex.amount;
        })
        setTotalExpense(total);
        setExpenses(data);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const addExpenseHandler = (expense) => {
    // console.log(expense)
    // setExpenses([expense, ...expenses]);
    fetch("http://localhost:5000/create", {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "content-Type": "application/json",
      },
    }).then((response) => {
      fetchData();
    });
  };
  const deleteExpenseHandler = (exp) => {
    // console.log(exp);
    fetch("http://localhost:5000/delete/" + exp, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
   },
    })
      .then((res) => {
        // console.log(exp);
        res.json().then((resp)=>{
          fetchData();
        }
        )
      })
  };
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses item={expenses} deleteExpense={deleteExpenseHandler} />
      <TotalExpense amount={totalExpense}/>
    </div>
  );
};

export default App;
