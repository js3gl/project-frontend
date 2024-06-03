import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as expenseService from '../services/ExpenseService';

import { useNavigate } from "react-router-dom";

const theme = createTheme();

export const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [firstName, setFirstName] = useState('') // add price & description when Jose gets around to completing the back end.
    const [lastName, setLastName] = useState('')
    const [items, setItems] = useState('')
    const [purpose, setPurpose] = useState('')
    const [dateOfExpense, setDateOfExpense] = useState('')
    const [lastUpdatedDateOfExpense, setLastUpdatedDateOfExpense] = useState('')

    // useEffect(() => {
    //     expenseService.getById(id)
    //         .then(response => {
    //             const user = response.data;
    //             setFirstName(user.firstName);
    //             setLastName(user.lastName);
    //             setItems(user.items);
    //             setPurpose(user.purpose);
    //             setDateOfExpense(user.dateOfExpense);
    //             setLastUpdatedDateOfExpense(user.lastUpdatedDateOfExpense);
    //         })
    // }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const expense = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            items: data.get('items'),
            purpose: data.get('purpose'),
            // price: data.get('price'),
            dateOfExpense: data.get('dateOfExpense'),
            lastUpdatedDateOfExpense: data.get('lastUpdatedDateOfExpense'),

        };
        console.log(expense)
        expenseService.updateExpense(id, expense)
            .then(response => {
                navigate("/");
            })

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Update
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    label="Program"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    fullWidth
                                    id="items"
                                    value={items}
                                    onChange={(e) => setItems(e.target.value)}
                                    label="Items"
                                    name="items"
                                    autoComplete="items"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    id="purpose"
                                    value={purpose}
                                    onChange={(e) => setPurpose(e.target.value)}
                                    label="Purpose"
                                    name="purpose"
                                    autoComplete="purpose"
                                />
                            </Grid>
                            {/* <Grid item xs={12} >
                                <TextField
                                    required
                                    fullWidth
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    label="price"
                                    name="price"
                                    autoComplete="price"
                                />
                            </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    )
};