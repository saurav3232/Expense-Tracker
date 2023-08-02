import React, { useState, useEffect } from "react";
import NewExpense from "./componenets/NewExpenses/NewExpense";
import Expenses from "./componenets/Expenses/Expenses";
import TotalExpense from "./componenets/TotalExpense/TotalExpense";
const App = () => {
  let DUMMY_EXPENSE = [];
  let total = 0;
  const [totalExpense, setTotalExpense] = useState(total);
  const [expenses, setExpenses] = useState(DUMMY_EXPENSE);
  function fetchData() {
    fetch("https://expense-api-oght.onrender.com/list")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.forEach((ex) => {
          total += ex.amount;
        });
        setTotalExpense(total);
        setExpenses(data);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const addExpenseHandler = (expense) => {
    fetch("https://expense-api-oght.onrender.com/create", {
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
    fetch("https://expense-api-oght.onrender.com/delete/" + exp, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((resp) => {
        fetchData();
      });
    });
  };
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses item={expenses} deleteExpense={deleteExpenseHandler} />
      <TotalExpense amount={totalExpense} />
    </div>
  );
};

export default App;
