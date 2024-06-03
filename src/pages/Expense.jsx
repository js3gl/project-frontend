import { ExpenseTable } from "../components/ExpenseTable";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export const Expense = () => {
    const navigate = useNavigate();

    function addUser() {
        navigate("/add")
    }

    return (
        <>

            <Button variant="outlined" onClick={e => addUser()} style={{ color: "white" }}>Add User</Button>
            <ExpenseTable />
        </>
    )
}
