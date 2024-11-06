// handling things during load
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const crorigin = 'https://aa-pmorgdemo.cloud.automationanywhere.digital';
function handleResponse(event, iTrxID) {
    if ((event.origin || event.originalEvent.origin) !== crorigin) {
      // Not the expected origin: Reject the message!
      return;
    }
    if (event.data.aariDataRequest === "aari-data-request") {
        var postData = {"data": {
            "TextBox0": iTrxID,
        }};
        console.log(`Sending postmessage data ${JSON.stringify(postData)}`);
        var iframe = document.querySelector('iframe');
        iframe.contentWindow.postMessage(postData, crorigin);
    }
};

// Sample transaction data (in a real application, this would come from a server)
const transactions = {
    '1099801191101': {
        date: '2024-11-18',
        amount: '1,800,000',
        currency: 'GBP',
        status: 'Flagged',
        senderName: 'ABC Capital',
        senderAccount: '1234567890',
        senderBank: 'Bank of America',
        beneficiaryName: 'XYZ Consultancy Services',
        beneficiaryAccount: '0987654321',
        beneficiaryBank: 'Wells Fargo',
        notes: 'Payment exceeds GBP 1Mn. Additional verification required.'
    },
    '1099801191102': {
        date: '2024-11-19',
        amount: '1,800,000',
        currency: 'GBP',
        status: 'Flagged',
        senderName: 'ABC Capital',
        senderAccount: '1234567890',
        senderBank: 'Swiss Bank',
        beneficiaryName: 'XYZ Consultancy Services',
        beneficiaryAccount: '0987654321',
        beneficiaryBank: 'Wells Fargo',
        notes: 'Payment exceeds GBP 1Mn. Additional verification required.'
    },
    // Add more transactions as needed
};

// Get the transaction ID from the URL
const transactionId = getUrlParameter('id');

// Populate the page with transaction details
setTimeout(() => {
    // set transaction values based on transactionId
    if (transactions[transactionId]) {
        const tx = transactions[transactionId];
        document.getElementById('transactionId').textContent += transactionId;
        document.getElementById('date').textContent = tx.date;
        document.getElementById('amount').textContent = tx.amount;
        document.getElementById('currency').textContent = tx.currency;
        document.getElementById('status').textContent = tx.status;
        document.getElementById('senderName').textContent = tx.senderName;
        document.getElementById('senderAccount').textContent = tx.senderAccount;
        document.getElementById('senderBank').textContent = tx.senderBank;
        document.getElementById('beneficiaryName').textContent = tx.beneficiaryName;
        document.getElementById('beneficiaryAccount').textContent = tx.beneficiaryAccount;
        document.getElementById('beneficiaryBank').textContent = tx.beneficiaryBank;
        document.getElementById('notes').textContent = tx.notes;
    } else {
        document.querySelector('.trx-container').innerHTML = '<h2>Transaction not found</h2>';
    }
    // done setting transaciton details

    // set the height of the header and nav elements
    document.documentElement.style.setProperty('--header-height', document.querySelector('header').offsetHeight + 'px');
    document.documentElement.style.setProperty('--nav-height', document.querySelector('nav').offsetHeight + 'px');
    // done setting heights

    // set data to copilot iframe
    window.addEventListener("message", function(oEvent){
        handleResponse(oEvent, transactionId);
    });
    // done setting iframe data

}, [300]);
