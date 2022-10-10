import './TotalExpense.css';
const TotalExpense=(props)=>{
    return(
        <div className="totalspend">
            <h1>Total Expense = ${props.amount}</h1>
        </div>
    )
}
export default TotalExpense;