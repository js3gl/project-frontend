import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import * as expenseService from '../services/ExpenseService';
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Button,
} from '@mui/material';

export const ExpenseTable = () => {
    const [expenses, setExpenses] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = () => {
        console.log("Filter value:", filterValue);
        if (!filterValue.trim()) {
            expenseService.getAllExpense()
                .then(res => {
                    setExpenses(res.data);
                })
                .catch(error => {
                    console.error('Error fetching all expenses:', error);
                    setExpenses([]);
                });
        } else {
            expenseService.filterExpensesByLastName(filterValue)
                .then(res => {
                    setExpenses(res.data);
                })
                .catch(error => {
                    console.error('Error fetching filtered expenses:', error);
                    setExpenses([]);
                });
        }
    }

    const goToUpdate = (id) => {
        navigate(`/update/${id}`);
    }

    const deleteExpense = (id) => {
        expenseService.deleteExpense(id)
            .then(() => {
                fetchExpenses(); 
            })
            .catch(error => {
                console.error('Error deleting expense:', error);
            });
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <TextField
                    label="Filter program"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    style={{ marginRight: '1rem' }}
                />
                <Button variant="contained" color="primary" onClick={fetchExpenses}>
                    Search
                </Button>
            </div>

            <Table sx={{ minWidth: 1000 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Expense Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Program</TableCell>
                        <TableCell>Items</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Date Added</TableCell>
                        <TableCell>Date Edited</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expenses.map((expense) => (
                        <TableRow hover key={expense.id}>
                            <TableCell>{expense.id}</TableCell>
                            <TableCell>{expense.firstName}</TableCell>
                            <TableCell>{expense.lastName}</TableCell>
                            <TableCell>{expense.items}</TableCell>
                            <TableCell>{expense.purpose}</TableCell>
                            <TableCell>{expense.dateOfExpense}</TableCell>
                            <TableCell>{expense.lastUpdatedDateOfExpense}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => goToUpdate(expense.id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => deleteExpense(expense.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
