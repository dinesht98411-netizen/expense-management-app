// User Dashboard Script
let categoryChart = null;
let statusChart = null;

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
    }
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    event.target.closest('.nav-item').classList.add('active');
    
    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'submit': 'Submit Expense',
        'history': 'My Expenses',
        'analytics': 'Analytics'
    };
    document.getElementById('pageTitle').textContent = titles[sectionId] || 'Dashboard';
    
    // Load data for specific sections
    if (sectionId === 'analytics') {
        setTimeout(initCharts, 100);
    }
}

function displayUserExpenses() {
    const user = getCurrentUser();
    const userExpenses = getUserExpenses(user.id);
    const stats = getExpenseStats(userExpenses);
    
    // Update stats
    document.getElementById('pendingCount').textContent = stats.pending;
    document.getElementById('approvedCount').textContent = stats.approved;
    document.getElementById('paidCount').textContent = stats.paid;
    document.getElementById('totalAmount').textContent = '₹' + stats.total.toFixed(2);
    document.getElementById('userName').textContent = user.name;
    
    // Display recent expenses
    const recentList = document.getElementById('recentList');
    if (recentList && userExpenses.length > 0) {
        recentList.innerHTML = userExpenses.slice(-3).reverse().map(expense => `
            <div class="expense-item">
                <div class="expense-info">
                    <h4>${expense.category}</h4>
                    <p>${expense.date} • ${expense.description}</p>
                </div>
                <div>
                    <div class="expense-amount">₹${expense.amount.toFixed(2)}</div>
                    <span class="status-badge status-${expense.status.toLowerCase()}">${expense.status}</span>
                </div>
            </div>
        `).join('');
    }
}

function displayExpensesTable() {
    const user = getCurrentUser();
    const userExpenses = getUserExpenses(user.id);
    const expensesList = document.getElementById('expensesList');
    
    if (expensesList) {
        if (userExpenses.length === 0) {
            expensesList.innerHTML = '<p style="padding: 2rem; text-align: center; color: var(--text-light);">No expenses found</p>';
            return;
        }
        
        expensesList.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${userExpenses.map(expense => `
                        <tr>
                            <td>${expense.date}</td>
                            <td>${expense.category}</td>
                            <td>${expense.description}</td>
                            <td>₹${expense.amount.toFixed(2)}</td>
                            <td><span class="status-badge status-${expense.status.toLowerCase()}">${expense.status}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
}

function filterExpenses() {
    const user = getCurrentUser();
    let userExpenses = getUserExpenses(user.id);
    const statusFilter = document.getElementById('statusFilter').value;
    
    if (statusFilter) {
        userExpenses = userExpenses.filter(e => e.status === statusFilter);
    }
    
    const expensesList = document.getElementById('expensesList');
    if (expensesList) {
        if (userExpenses.length === 0) {
            expensesList.innerHTML = '<p style="padding: 2rem; text-align: center; color: var(--text-light);">No expenses found</p>';
            return;
        }
        
        expensesList.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${userExpenses.map(expense => `
                        <tr>
                            <td>${expense.date}</td>
                            <td>${expense.category}</td>
                            <td>${expense.description}</td>
                            <td>₹${expense.amount.toFixed(2)}</td>
                            <td><span class="status-badge status-${expense.status.toLowerCase()}">${expense.status}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
}

function initCharts() {
    const user = getCurrentUser();
    const userExpenses = getUserExpenses(user.id);
    
    const categoryData = getExpensesByCategory(userExpenses);
    const statusData = getExpensesByStatus(userExpenses);
    
    // Category Chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        if (categoryChart) categoryChart.destroy();
        
        categoryChart = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categoryData),
                datasets: [{
                    data: Object.values(categoryData),
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
    
    // Status Chart
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        if (statusChart) statusChart.destroy();
        
        statusChart = new Chart(statusCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(statusData),
                datasets: [{
                    label: 'Count',
                    data: Object.values(statusData),
                    backgroundColor: ['#fbbf24', '#10b981', '#8b5cf6', '#ef4444']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    displayUserExpenses();
    displayExpensesTable();
});