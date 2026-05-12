# RAM Infosys Expense Management System

## 📱 Professional Business Expense App

A complete full-stack web application for managing business expenses with role-based access control (Users and Admins).

## 🎯 Features

### User Features
- **Login System**: Secure authentication for Users and Admins
- **Submit Expenses**: Form to upload receipts, enter amount, category, and date
- **Track Expenses**: View personal expense history with status tracking
- **Categories**: Travel, Food, Supplies, Other
- **Analytics**: Visual charts showing spending by category
- **Status Workflow**: Pending → Approved → Paid

### Admin Features
- **Master Dashboard**: View expenses from all users
- **Pending Approvals**: List of all pending expenses with Approve/Reject buttons
- **User Management**: Create and manage user accounts
- **Company Analytics**: 
  - Total company spending
  - Average per employee
  - Spending by category
  - Approval rate
- **Monthly Trends**: Visual representation of monthly spending patterns
- **All Expenses View**: Search and filter all expenses in the system

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Charts**: Chart.js
- **Data Storage**: Local Storage (Ready for Google Sheets API integration)
- **Icons**: Font Awesome 6.4
- **Responsive Design**: Mobile-first approach

## 📋 Project Structure

```
expense-management-app/
├── index.html                    # Landing page
├── pages/
│   ├── login.html               # Login page
│   ├── user-dashboard.html      # User dashboard
│   └── admin-dashboard.html     # Admin dashboard
├── css/
│   └── styles.css               # Main stylesheet
├── js/
│   ├── main.js                  # Landing page script
│   ├── auth.js                  # Authentication system
│   ├── expenses.js              # Expense management logic
│   ├── dashboard.js             # User dashboard logic
│   └── admin.js                 # Admin dashboard logic
└── README.md
```

## 🔐 Demo Credentials

### Admin User
- **Email**: admin@ram-infosys.com
- **Password**: admin123
- **Role**: Admin

### Regular User
- **Email**: john@ram-infosys.com
- **Password**: user123
- **Role**: User

## 🚀 Quick Start

### Option 1: Using Python
```bash
python -m http.server 8000
# Visit http://localhost:8000
```

### Option 2: Using Node.js
```bash
npm install -g live-server
live-server
# Visit http://localhost:8080
```

### Option 3: Using VS Code Live Server
- Install Live Server extension
- Right-click on index.html
- Select "Open with Live Server"

## 💾 Data Storage

### Current Implementation
- Uses Browser Local Storage for data persistence
- Sample data included for testing

### Future Integration
- Ready for Google Sheets API integration
- Firebase Realtime Database support
- Cloud backend (Node.js/Express)

## 📊 Workflow

1. **User submits expense** → Status: "Pending"
2. **Admin reviews** → Can Approve or Reject
3. **After approval** → Can mark as "Paid"
4. **Charts update** → Real-time analytics

## 🎨 UI/UX Features

- **Dark Sidebar Navigation**: Professional navigation panel
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Status Badges**: Visual indicators for expense status
- **Interactive Charts**: Chart.js integration for analytics
- **Clean Design**: Corporate blue color scheme
- **Smooth Animations**: Professional transitions

## 📱 Responsive Breakpoints

- **Desktop**: Full sidebar navigation
- **Tablet**: Compact sidebar (icons only)
- **Mobile**: Hidden sidebar (hamburger menu ready)

## 🔄 Expense Status Flow

```
┌─────────┐     ┌──────────┐     ┌──────┐
│ Pending │ --> │ Approved │ --> │ Paid │
└─────────┘     └──────────┘     └──────┘
      ↓
  [Rejected]
```

## 🌟 Key Sections

### Landing Page
- Feature highlights
- Company statistics
- Call-to-action buttons

### User Dashboard
- **Dashboard**: Stats and recent expenses
- **Submit Expense**: Form with receipt upload
- **My Expenses**: Expense history with filters
- **Analytics**: Visual charts of spending patterns

### Admin Dashboard
- **Dashboard**: Company overview and charts
- **Pending Expenses**: Approve/Reject list
- **Manage Users**: Create and edit user accounts
- **Analytics**: Deep company insights
- **All Expenses**: Global expense view

## ⚡ Performance

- Lightweight (no external dependencies except Chart.js)
- Fast loading times
- Optimized for mobile devices
- LocalStorage caching

## 🔒 Security Features

- Role-based access control
- Session management
- User authentication
- Data validation

## 📈 Future Enhancements

- [ ] Google Sheets Backend Integration
- [ ] Receipt image upload to cloud
- [ ] Email notifications
- [ ] Advanced filtering and reporting
- [ ] Budget limits per category
- [ ] Multi-currency support
- [ ] Expense templates
- [ ] Bulk operations
- [ ] Export to PDF/Excel
- [ ] Real-time notifications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.

## 📄 License

This project is part of RAM Infosys system.

## 📞 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for RAM Infosys System**