import axios from 'axios';

const BASE_API_URL = 'http://localhost:8080/';

export function getAllExpense() {
    return axios.get(`${BASE_API_URL}expense`);
}

export function createExpense(expense) {
    return axios.post(`${BASE_API_URL}expense`, expense);
}

export function getById(id) {
    return axios.get(`${BASE_API_URL}expense/${id}`);
}

export function updateExpense(id, expense) {
    return axios.put(`${BASE_API_URL}expense/${id}`, expense);
}

export function deleteExpense(id) {
    return axios.delete(`${BASE_API_URL}expense/${id}`);
}

export function filterExpensesByLastName(lastName) {
    return axios.get(`${BASE_API_URL}expense/filter`, { params: { lastName } });
}
