
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


document.getElementById('transaction-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (!description || isNaN(amount)) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type
    };

    transactions.push(transaction);
    saveTransactions();
    displayTransactions();
    updateBudget();

    
    document.getElementById('transaction-form').reset();
});

function displayTransactions() {
    const list = document.getElementById('transaction-list');
    list.innerHTML = ''; 

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.type); 
        li.innerHTML = `
            <span>${transaction.description} - $${transaction.amount.toFixed(2)} (${transaction.type})</span>
            <button onclick="deleteTransaction(${transaction.id})">Delete</button>
        `;
        list.appendChild(li);
    });
}

function updateBudget() {
    const budget = transactions.reduce((acc, transaction) => {
        return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
    document.getElementById('budget').innerText = budget.toFixed(2);
}


function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    saveTransactions();
    displayTransactions();
    updateBudget();
}


document.getElementById('apply-filters').addEventListener('click', function () {
    const minAmount = parseFloat(document.getElementById('min-amount').value) || -Infinity;
    const maxAmount = parseFloat(document.getElementById('max-amount').value) || Infinity;
    const type = document.getElementById('filter-type').value;
    const noteFilter = document.getElementById('note-filter').value.toLowerCase();

    const filteredTransactions = transactions.filter(transaction => {
        return transaction.amount >= minAmount &&
               transaction.amount <= maxAmount &&
               (type === 'all' || transaction.type === type) &&
               transaction.description.toLowerCase().includes(noteFilter);
    });

    displayFilteredTransactions(filteredTransactions);
});


function displayFilteredTransactions(filteredTransactions) {
    const list = document.getElementById('transaction-list');
    list.innerHTML = ''; 

    filteredTransactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.type); 
        li.innerHTML = `
            <span>${transaction.description} - $${transaction.amount.toFixed(2)} (${transaction.type})</span>
            <button onclick="deleteTransaction(${transaction.id})">Delete</button>
        `;
        list.appendChild(li);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    displayTransactions();
    updateBudget();
});


