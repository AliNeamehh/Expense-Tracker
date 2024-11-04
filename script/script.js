
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


