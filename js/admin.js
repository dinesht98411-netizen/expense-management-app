// Admin Dashboard Script
let companyCategoryChart = null;
let trendChart = null;

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
        'dashboard': 'Admin Dashboard',
        'pending': 'Pending Expense Approvals',
        'users': 'Manage Users',
        'analytics': 'Company Analytics',
        'history': 'All Expenses'
    };
    document.getElementById('pageTitle').textContent = titles[sectionId] || 'Admin Dashboard';
    
    // Load specific data
    if (sectionId === 'dashboard') {
        loadAdminDashboard();
    } else if (sectionId === 'pending') {
        loadPendingExpenses();
    } else if (sectionId === 'users') {
        loadUsersList();
    } else if (sectionId === 'analytics') {
        updateAnalytics();
    } else if (sectionId === 'history') {
        loadAllExpenses();
    }
}

function loadAdminDashboard() {
    const allExpenses = getAllExpenses();
    const stats = getExpenseStats(allExpenses);
    
    document.getElementById('totalPending').textContent = stats.pending;
    document.getElementById('totalApproved').textContent = stats.approved;
    document.getElementById('totalPaid').textContent = '₹' + stats.total.toFixed(2);
    document.getElementById('totalUsers').textContent = users.length - 1; // Exclude admin
    document.getElementById('userName').textContent = 'Admin';
    
    // Initialize charts
    setTimeout(initAdminCharts, 100);
}

function loadPendingExpenses() {
    const pendingExpenses = getAllExpenses().filter(e => e.status === 'Pending');
    const pendingList = document.getElementById('pendingExpensesList');
    
    document.getElementById('pendingBadge').textContent = pendingExpenses.length;
    
    if (pendingList) {
        if (pendingExpenses.length === 0) {
            pendingList.innerHTML = '<p style="padding: 2rem; text-align: center; color: var(--text-light);">No pending expenses</p>';
            return;
        }
        
        pendingList.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${pendingExpenses.map(expense => `
                        <tr>
                            <td>${expense.date}</td>
                            <td>${expense.userName}</td>
                            <td>${expense.category}</td>
                            <td>${expense.description}</td>
                            <td>₹${expense.amount.toFixed(2)}</td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn-action btn-approve" onclick="approveExpense(${expense.id})">Approve</button>
                                    <button class="btn-action btn-reject" onclick="rejectExpense(${expense.id})">Reject</button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
}

function loadUsersList() {
    const usersList = document.getElementById('usersList');
    const allUsers = users.filter(u => u.role === 'User');
    
    if (usersList) {
        usersList.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Total Expenses</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${allUsers.map(user => {
                        const userExpenses = getUserExpenses(user.id);
                        const total = userExpenses.reduce((sum, e) => sum + e.amount, 0);
                        return `
                            <tr>
                                <td>#${user.id}</td>
                                <td>${user.name}</td>
                                <td>${user.email}</td>
                                <td>${user.department}</td>
                                <td>₹${total.toFixed(2)}</td>
                                <td>
                                    <button class="btn-action btn-edit" onclick="editUser(${user.id})">Edit</button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
    }
}

function loadAllExpenses() {
    const allExpensesList = document.getElementById('allExpensesList');
    let allExpenses = getAllExpenses();
    
    if (allExpensesList) {
        if (allExpenses.length === 0) {
            allExpensesList.innerHTML = '<p style="padding: 2rem; text-align: center; color: var(--text-light);">No expenses found</p>';
            return;
        }
        
        allExpensesList.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${allExpenses.map(expense => `
                        <tr>
                            <td>${expense.date}</td>
                            <td>${expense.userName}</td>
                            <td>${expense.category}</td>
                            <td>${expense.description}</td>
                            <td>₹${expense.amount.toFixed(2)}</td>
                            <td><span class="status-badge status-${expense.status.toLowerCase()}">${expense.status}</span></td>
                            <td>
                                ${expense.status === 'Pending' ? `
                                    <div class="action-buttons">
                                        <button class="btn-action btn-approve" onclick="approveExpense(${expense.id})">Approve</button>
                                        <button class="btn-action btn-reject" onclick="rejectExpense(${expense.id})">Reject</button>
                                    </div>
                                ` : expense.status === 'Approved' ? `
                                    <button class="btn-action btn-mark-paid" onclick="markAsPaid(${expense.id})">Mark Paid</button>
                                ` : '-'}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
}

function approveExpense(id) {
    updateExpenseStatus(id, 'Approved');
    alert('Expense approved!');
    loadPendingExpenses();
    loadAdminDashboard();
}

function rejectExpense(id) {
    updateExpenseStatus(id, 'Rejected');
    alert('Expense rejected!');
    loadPendingExpenses();
    loadAdminDashboard();
}

function markAsPaid(id) {
    updateExpenseStatus(id, 'Paid');
    alert('Expense marked as paid!');
    loadAllExpenses();
    loadAdminDashboard();
}

function filterAllExpenses() {
    let allExpenses = getAllExpenses();
    const userSearch = document.getElementById('userSearch').value.toLowerCase();
    const statusFilter = document.getElementById('allStatusFilter').value;
    
    if (userSearch) {
        allExpenses = allExpenses.filter(e => e.userName.toLowerCase().includes(userSearch));
    }
    
    if (statusFilter) {
        allExpenses = allExpenses.filter(e => e.status === statusFilter);
    }
    
    const allExpensesList = document.getElementById('allExpensesList');
    if (allExpensesList) {
        if (allExpenses.length === 0) {
            allExpensesList.innerHTML = '<p style="padding: 2rem; text-align: center; color: var(--text-light);">No expenses found</p>';
            return;
        }
        
        allExpensesList.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${allExpenses.map(expense => `
                        <tr>
                            <td>${expense.date}</td>
                            <td>${expense.userName}</td>
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

function updateAnalytics() {
    const allExpenses = getAllExpenses();
    const monthFilter = document.getElementById('monthFilter').value;
    let filteredExpenses = allExpenses;
    
    if (monthFilter) {
        filteredExpenses = allExpenses.filter(e => {
            return new Date(e.date).getMonth() + 1 === parseInt(monthFilter);
        });
    }
    
    const categoryData = getExpensesByCategory(filteredExpenses);
    const totalExpense = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
    const avgPerEmployee = filteredExpenses.length > 0 ? totalExpense / new Set(filteredExpenses.map(e => e.userId)).size : 0;
    
    let highestCategory = '-';
    if (Object.keys(categoryData).length > 0) {
        highestCategory = Object.keys(categoryData).reduce((a, b) => categoryData[a] > categoryData[b] ? a : b);
    }
    
    const approvalRate = allExpenses.length > 0 ? Math.round((allExpenses.filter(e => e.status !== 'Pending').length / allExpenses.length) * 100) : 0;
    
    document.getElementById('totalCompanyExpense').textContent = '₹' + totalExpense.toFixed(2);
    document.getElementById('avgPerEmployee').textContent = '₹' + avgPerEmployee.toFixed(2);
    document.getElementById('highestCategory').textContent = highestCategory;
    document.getElementById('approvalRate').textContent = approvalRate + '%';
}

function initAdminCharts() {
    const allExpenses = getAllExpenses();
    const categoryData = getExpensesByCategory(allExpenses);
    
    // Company Category Chart
    const companyCategoryCtx = document.getElementById('companyCategoryChart');
    if (companyCategoryCtx) {
        if (companyCategoryChart) companyCategoryChart.destroy();
        
        companyCategoryChart = new Chart(companyCategoryCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(categoryData),
                datasets: [{
                    label: 'Amount',
                    data: Object.values(categoryData),
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
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
    
    // Trend Chart
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
        if (trendChart) trendChart.destroy();
        
        // Generate last 6 months data
        const monthlyData = {};
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const monthKey = date.toLocaleString('default', { month: 'short' });
            monthlyData[monthKey] = 0;
        }
        
        allExpenses.forEach(e => {
            const date = new Date(e.date);
            const monthKey = date.toLocaleString('default', { month: 'short' });
            if (monthlyData[monthKey] !== undefined) {
                monthlyData[monthKey] += e.amount;
            }
        });
        
        trendChart = new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: Object.keys(monthlyData),
                datasets: [{
                    label: 'Monthly Spending',
                    data: Object.values(monthlyData),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
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

function openCreateUserModal() {
    document.getElementById('createUserModal').style.display = 'block';
}

function closeCreateUserModal() {
    document.getElementById('createUserModal').style.display = 'none';
}

function editUser(userId) {
    alert('Edit user feature coming soon!');
}

// Create User Form Handler
if (document.getElementById('createUserForm')) {
    document.getElementById('createUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('newUserName').value;
        const email = document.getElementById('newUserEmail').value;
        const password = document.getElementById('newUserPassword').value;
        const role = document.getElementById('newUserRole').value;
        
        const newUser = {
            id: users.length + 1,
            name: name,
            email: email,
            password: password,
            role: role,
            department: 'General'
        };
        
        users.push(newUser);
        this.reset();
        closeCreateUserModal();
        alert('User created successfully!');
        loadUsersList();
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('createUserModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadAdminDashboard();
});