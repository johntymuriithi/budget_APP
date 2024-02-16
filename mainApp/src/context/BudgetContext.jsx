import React, { useContext} from "react"
import { v4 as uuidv4 } from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage"

const BudgetContext = React.createContext()

export function useBudgets () {
    return useContext(BudgetContext)
}

export const BudgetProvider = ({children}) => {
    const[budgets, setBudgets] = useLocalStorage("budgets", [])
    const[expenses, setExpenses] = useLocalStorage("expenses", [])

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budget.Id === budgetId)
    }
    function addBudget({name, max}) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budgets => budgets.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, {id: uuidv4(), name, max}]
        })
    }
    function addExpenses({description, amount, budgetId}) {
        setExpenses(prevExpenses => {
            // if (prevExpenses.find(expenses => expenses.name === name)) {
            //     return prevExpenses
            // }
            return [...prevExpenses, {id: uuidv4(), description, amount, budgetId}]
        })
    }
    function deleteBudget({id}) {
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }
    function deleteExpense({id}) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    return <BudgetContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpenses,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>
        {children}
    </BudgetContext.Provider>
}