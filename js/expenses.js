// Expense Management System
let expenses = JSON.parse(localStorage.getItem('expenses')) || [
    { id: 1, userId: 2, userName: 'John Doe', category: 'Travel', amount: 5000, date: '2026-05-10', description: 'Flight to Delhi', status: 'Pending', receiptUrl: null },
    { id: 2, userId: 2, userName: 'John Doe', category: 'Food', amount: 1200, date: '2026-05-09', description: 'Team lunch', status: 'Approved', receiptUrl: null },
    { id: 3, userId: 3, userName: 'Jane Smith', category: 'Supplies', amount: 3500, date: '2026-05-08', description: 'Office supplies', status: 'Pending', receiptUrl: null },
    { id: 4, userId: 4, userName: 'Bob Wilson', category: 'Travel', amount: 2500, date: '2026-05-07', description: 'Cab charges', status: 'Paid', receiptUrl: null }
];

let nextExpenseId = 5;

function addExpense(expense) {
    const user = getCurrentUser();
    const newExpense = {
        id: nextExpenseId++,
        userId: user.id,
        userName: user.name,
        category: expense.category,
        amount: parseFloat(expense.amount),
        date: expense.date,
        description: expense.description,
        status: 'Pending',
        receiptUrl: expense.receiptUrl || null
    };
    
    expenses.push(newExpense);
    saveExpenses();
    return newExpense;
}

function getUserExpenses(userId) {
    return expenses.filter(e => e.userId === userId);
}

function getAllExpenses() {
    return expenses;
}

function getExpenseById(id) {
    return expenses.find(e => e.id === id);
}

function updateExpenseStatus(id, status) {
    const expense = getExpenseById(id);
    if (expense) {
        expense.status = status;
        saveExpenses();
        return expense;
    }
}

function deleteExpense(id) {
    const index = expenses.findIndex(e => e.id === id);
    if (index > -1) {
        expenses.splice(index, 1);
        saveExpenses();
        return true;
    }
    return false;
}

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function getExpenseStats(expenses) {
    return {
        pending: expenses.filter(e => e.status === 'Pending').length,
        approved: expenses.filter(e => e.status === 'Approved').length,
        paid: expenses.filter(e => e.status === 'Paid').length,
        rejected: expenses.filter(e => e.status === 'Rejected').length,
        total: expenses.reduce((sum, e) => sum + e.amount, 0)
    };
}

function getExpensesByCategory(expenses) {
    const categories = {};
    expenses.forEach(e => {
        if (!categories[e.category]) {
            categories[e.category] = 0;
        }
        categories[e.category] += e.amount;
    });
    return categories;
}

function getExpensesByStatus(expenses) {
    const statuses = {};
    expenses.forEach(e => {
        if (!statuses[e.status]) {
            statuses[e.status] = 0;
        }
        statuses[e.status] += 1;
    });
    return statuses;
}

// Handle expense form submission
if (document.getElementById('expenseForm')) {
    document.getElementById('expenseForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const category = document.getElementById('category').value;
        const amount = document.getElementById('amount').value;
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;
        const receipt = document.getElementById('receipt').files[0];
        
        // In real app, upload receipt to cloud storage
        let receiptUrl = null;
        if (receipt) {
            const reader = new FileReader();
            reader.onload = function(e) {
                receiptUrl = e.target.result;
            };
            reader.readAsDataURL(receipt);
        }
        
        const expense = {
            category: category,
            amount: amount,
            date: date,
            description: description,
            receiptUrl: receiptUrl
        };
        
        addExpense(expense);
        this.reset();
        alert('Expense submitted successfully!');
        showSection('history');
        displayUserExpenses();
    });
}