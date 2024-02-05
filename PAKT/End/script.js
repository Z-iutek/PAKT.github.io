document.getElementById('reset-button').addEventListener('click', function() {
    
    // Tutaj dodaj kod do przejścia do inicjalizacji gry.
    window.location.href = '../Welcome/index.html';
    console.log('Rozpocznij grę!');
});
   
document.addEventListener('DOMContentLoaded', function(){

    const highlightedMoney = localStorage.getItem('highlightedMoney');
    console.log('Odczytano wartość z Local Storage:', highlightedMoney);

    const moneyDisplay = document.getElementById('wynik')
    moneyDisplay.textContent = `Your score is ${highlightedMoney} points`;

})   

