document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseTableBody = document.getElementById('expense-table-body');
    const summaryList = document.getElementById('summary-list');

    let expenses = [];

    const addExpense = (amount, category, date) => {
        const expense = { id: Date.now(), amount, category, date };
        expenses.push(expense);
        renderExpenses();
        renderSummary();
    };

    const renderExpenses = () => {
        expenseTableBody.innerHTML = '';
        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.amount}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="btn btn-sm btn-warning edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;
            expenseTableBody.appendChild(row);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', handleEdit);
        });
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', handleDelete);
        });
    };

    const renderSummary = () => {
        const summary = expenses.reduce((acc, expense) => {
            if (!acc[expense.category]) {
                acc[expense.category] = 0;
            }
            acc[expense.category] += parseFloat(expense.amount);
            return acc;
        }, {});

        summaryList.innerHTML = '';
        for (const category in summary) {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.textContent = category;
            const badge = document.createElement('span');
            badge.className = 'badge badge-primary badge-pill';
            badge.textContent = summary[category];
            listItem.appendChild(badge);
            summaryList.appendChild(listItem);
        }
    };

    expenseForm.addEventListener('submit', event => {
        event.preventDefault();
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;
        addExpense(amount, category, date);
        expenseForm.reset();
    });

    const handleEdit = (event) => {
        const expenseId = event.target.getAttribute('data-id');
        const expense = expenses.find(exp => exp.id == expenseId);
        document.getElementById('amount').value = expense.amount;
        document.getElementById('category').value = expense.category;
        document.getElementById('date').value = expense.date;
        expenses = expenses.filter(exp => exp.id != expenseId);
        renderExpenses();
        renderSummary();
    };

    const handleDelete = (event) => {
        const expenseId = event.target.getAttribute('data-id');
        expenses = expenses.filter(exp => exp.id != expenseId);
        renderExpenses();
        renderSummary();
    };
})