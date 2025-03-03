document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const expenseChart = document.getElementById('expense-chart').getContext('2d');

    let expenses = [];

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const expenseName = document.getElementById('expense-name').value;
        const expenseAmount = parseFloat(document.getElementById('expense-amount').value);

        if (expenseName && expenseAmount) {
            const expense = { name: expenseName, amount: expenseAmount };
            expenses.push(expense);
            addExpenseToList(expense);
            updateChart();
            expenseForm.reset();
        }
    });

    function addExpenseToList(expense) {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            <span>${expense.name}</span>
            <span>₱${expense.amount.toFixed(2)}</span>
        `;
        expenseList.appendChild(expenseItem);
    }

    function updateChart() {
        const chart = new Chart(expenseChart, {
            type: 'bar',
            data: {
                labels: expenses.map(expense => expense.name),
                datasets: [{
                    label: 'Expenses',
                    data: expenses.map(expense => expense.amount),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
