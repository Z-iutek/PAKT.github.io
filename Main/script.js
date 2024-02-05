const skill = localStorage.getItem('ostatniWybranyObrazek');
console.log(skill + ' to numer');

// Umiejki -----------------------------------------------------------------------------------------------------------------------------------
function decreaseNeighbourHP() {
  for (let i = 0; i <= 8; i++){
  const neighbourIndex = currentCellIndex - (i-4); // Komórka po lewej stronie (jeśli istnieje)
  const highlightedRow = Math.floor(currentCellIndex / 5);
  const currentRow = Math.floor((currentCellIndex - (i-4)) / 5);
  if (highlightedRow === currentRow) {
    const neighbourCellValues = cells[neighbourIndex].textContent.split('-');
    let neighbourHP = parseInt(neighbourCellValues[0]);

     if (neighbourHP <= 15){
        neighbourHP = 0;
     } else{ 
        neighbourHP -= 15;
     }
    cells[neighbourIndex].textContent = generateCellValue(neighbourHP, parseInt(neighbourCellValues[1]), parseInt(neighbourCellValues[2]));
    steps = 0;
  }
  checkStats();
}}

// Umiejka 2 -------------------------------------------------------------------------------------------------------------------------------
let isExplodeWeakActive = false;

function explodeWeak() {
  isExplodeWeakActive = true;

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      if (isExplodeWeakActive) {

        cells[currentCellIndex].classList.remove('highlighted');

        const currentCellValue = cells[currentCellIndex].textContent;
        const currentCellValues = currentCellValue.split('-');
        const currentHP = parseInt(currentCellValues[0]);
        const currentDMG = parseInt(currentCellValues[1]);
        const currentMoney = parseInt(currentCellValues[2]);

        const location = currentCellIndex;

        currentCellIndex = index;
        cells[currentCellIndex].classList.add('highlighted');

        const clickedCellValue = cells[currentCellIndex].textContent;
        const clickedCellValues = clickedCellValue.split('-');
        const clickedHP = parseInt(clickedCellValues[0] - currentDMG);
        const clickedDMG = parseInt(clickedCellValues[1]);
        const clickedMoney = parseInt(clickedCellValues[2]);
        
        isExplodeWeakActive = false;

        cells[currentCellIndex].textContent = generateCellValue(currentHP, currentDMG, currentMoney);

        if (clickedHP>1) {
          cells[location].textContent = generateCellValue(clickedHP, clickedDMG, clickedMoney);
          steps = 0;
        } else {
          cells[location].textContent = generateCellValue(0, clickedDMG, clickedMoney);
        }
        checkStats();
      }
    });
  });
}



// Umiejka 3 ----------------------------------------------------------------------------------------------------------------------------
function consumeEnemy() {
  isExplodeWeakActive = true;

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      if (isExplodeWeakActive) {

        const currentCellValue = cells[currentCellIndex].textContent;
        const currentCellValues = currentCellValue.split('-');
        const currentHP = parseInt(currentCellValues[0]);
        const currentDMG = parseInt(currentCellValues[1]);
        const currentMoney = parseInt(currentCellValues[2]);

        const clickedCellValue = cells[index].textContent;
        const clickedCellValues = clickedCellValue.split('-');
        const clickedHP = parseInt(clickedCellValues[0] - currentDMG);
        const clickedDMG = parseInt(clickedCellValues[1]);
        const clickedMoney = parseInt(clickedCellValues[2]);
        
        isExplodeWeakActive = false;

        cells[index].textContent = generateCellValue(0, clickedDMG, clickedMoney);

        let zycie = currentHP + clickedHP;
        if (zycie >= maxHP) {
          zycie = maxHP;
        }
        cells[currentCellIndex].textContent = generateCellValue(zycie, currentDMG, currentMoney);

        checkStats();
        steps = 0;
        
      }
    });
  });
}


// Pasywka phoenixa -----------------------------------------------------------------------------------------------
function burn() {
  const upIndex = currentCellIndex - 5;
  const downIndex = currentCellIndex + 5;

  if (upIndex >= 0) {
    const upCellValues = cells[upIndex].textContent.split('-');
    let upHP = parseInt(upCellValues[0]);
    const upDMG = parseInt(upCellValues[1]);
    const upMoney = parseInt(upCellValues[2]);

    if (upHP > 1) {
      upHP -= 2;
    } else {
      upHP = 0;
    }

    cells[upIndex].textContent = generateCellValue(upHP, upDMG, upMoney);
  }

  if (downIndex < cells.length) {
    const downCellValues = cells[downIndex].textContent.split('-');
    let downHP = parseInt(downCellValues[0]);
    const downDMG = parseInt(downCellValues[1]);
    const downMoney = parseInt(downCellValues[2]);

    if (downHP > 1) {
      downHP -= 2;
    } else {
      downHP = 0;
    }

    cells[downIndex].textContent = generateCellValue(downHP, downDMG, downMoney);
  }

  checkStats();
}

function showText(text) {
  // Znajdź element o id "output"
  var outputElement = document.getElementById('opis');
  outputElement.innerHTML = text;
}


function uzyjumiejki(){
  var umiejka = document.getElementById('umiejka');
  if (steps>=10){
    umiejka.innerHTML = "Your ability is ready!"
    umiejka.style.fontSize= '34px';
  } else {
    umiejka.innerHTML = "Move to load ability " + steps  + '/10'
    umiejka.style.fontSize='30px'
  }
}

// Pobieramy Grid z style.css
const grid = document.getElementById('grid');
const cells = [];



// Funkcja generująca wartość dla komórki na podstawie wartości początkowych
function generateCellValue(hp, dmg, money) {
  return `${hp}-${dmg}-${money}`;
}



function postacglowna(){
  if (skill==1){
    cells[currentCellIndex].style.backgroundImage = 'none';
    cells[currentCellIndex].style.backgroundImage = "url('postac1.png')";
  } else if (skill==2){
    cells[currentCellIndex].style.backgroundImage = 'none';
    cells[currentCellIndex].style.backgroundImage = "url('postac2.png')";
  } else if (skill==3){
    cells[currentCellIndex].style.backgroundImage = 'none';
    cells[currentCellIndex].style.backgroundImage = "url('postac3.png')";
  }
}


// Inicjalizacja wartości początkowych
let maxHP = 20;
let initialHP = 20;
let initialDMG = 0;
let initialMoney = 0;
let steps = 0;
let oblicz = 0;
let armor = 0;

if (skill == 1)        {
  maxHP = 8;
  initialHP = 8;
  initialDMG = 14;
} else if (skill == 2) {
  maxHP = 10;
  initialHP = 10;
  initialDMG = 12;
} else if (skill == 3) {
  maxHP = 12;
  initialHP = 12;
  initialDMG = 10;
  armor = 2;
}



// Tworzenie siatki komórek z wartościami początkowymi
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) { 
    const cell = document.createElement('div');
    cell.classList.add('cell');

    // Ustawienie wartości początkowych dla zaznaczonego pola (indeks 0,0)
    if (i === 2 && j === 2) {
      cell.textContent = generateCellValue(initialHP, initialDMG, initialMoney);
      cell.classList.add('highlighted');
    } else {
      cell.textContent = generateCellValue(
        Math.floor(0),
        Math.floor(0),
        Math.floor(Math.random() * 3 + 2)
      );
    }
    grid.appendChild(cell);
    cells.push(cell);
  }
}

let currentCellIndex = 12; // Inicjalizacja zmiennej przechowującej indeks bieżącej komórki na siatce



// Zmiana watości Życia i Ataku gdy mało komórka specjalna jest
function checkStats() {
  uzyjumiejki();
  cells.forEach((cell, index) => {
    // Sprawdzenie, czy komórka nie ma klasy "highlighted"
    if (!cell.classList.contains('highlighted')) {
      const cellValues = cell.textContent.split('-');
      let cellHP = parseInt(cellValues[0]);
      let cellDMG = parseInt(cellValues[1]);
      let cellMoney = parseInt(cellValues[2]);
    

      // WAŻNE ----------------- WAŻNE - To pozwala manipulować wartościami HP-ATAK-MONEY istniejących komórek zależnie od czegokolwiek
      // 1 - potka
      // 2 - potka
      if (cellMoney ==1 && cellHP == 0 && cellDMG == 0){
        cell.style.backgroundImage = "url('enemy1.png";
      } else if (cellMoney ==2 && cellHP == 0 && cellDMG == 0){
        cell.style.backgroundImage = "url('enemy2.png";
      } else if (cellMoney == 3 && cellHP == 0 && cellDMG == 0) { // 3 - Rabbit
        cellDMG = 4;
        cellHP = 8;
        cell.style.backgroundImage = "url('enemy3.png";
      } else if (cellMoney == 4 && cellHP == 0 && cellDMG == 0) { // 4 - Butterfly
        cellDMG = 4;
        cellHP = 16;
        cell.style.backgroundImage = "url('enemy4.png";
      } else if (cellMoney == 5 && cellHP == 0 && cellDMG == 0) { // 5 - Dog
        cellDMG = 3;
        cellHP = 14;
        cell.style.backgroundImage = "url('enemy5.png";
      } else if (cellMoney == 6 && cellHP == 0 && cellDMG == 0) { // 6 - Cat
        cellDMG = 4;
        cellHP = 17;
        cell.style.backgroundImage = "url('enemy6.png";
      } else if (cellMoney == 7 && cellHP == 0 && cellDMG == 0) { // 7 - Turtle
        cellDMG = 6;
        cellHP = 40;
        cell.style.backgroundImage = "url('enemy7.png";
      } else if (cellMoney == 8 && cellHP == 0 && cellDMG == 0) { // 8 - Frog
        cellDMG = 8;
        cellHP = 11;
        cell.style.backgroundImage = "url('enemy8.png";
      } else if (cellMoney == 9 && cellHP == 0 && cellDMG == 0) { // 9 - Bat
        cellDMG = 3;
        cellHP = 15;
        cell.style.backgroundImage = "url('enemy9.png";
      } else if (cellMoney == 10 && cellHP == 0 && cellDMG == 0) { // 10 - Jellyfish
        cellDMG = 20;
        cellHP = 8;
        cell.style.backgroundImage = "url('enemy10.png')";
      } else if (cellMoney == 11 && cellHP == 0 && cellDMG == 0) { // 11 - Eagle
        cellDMG = 3;
        cellHP = 13;
        cell.style.backgroundImage = "url('enemy11.png";
      } else if (cellMoney == 12 && cellHP == 0 && cellDMG == 0) { // 12 - Crocodile
        cellDMG = 2;
        cellHP = 30;
        cell.style.backgroundImage = "url('enemy12.png";
      } else if (cellMoney == 13 && cellHP == 0 && cellDMG == 0) { // 13 - Shark
        cellDMG = 20;
        cellHP = 60;
        cell.style.backgroundImage = "url('enemy13.png";
      }


       else if (cellMoney == 3 && cellHP >= 1) { // 3 - Rabbit
        cell.style.backgroundImage = "url('enemy3.png";
      }else if (cellMoney == 4 && cellHP >= 1) { // 4 - Butterfly
        cell.style.backgroundImage = "url('enemy4.png";
      } else if (cellMoney == 5 && cellHP >= 1) { // 5 - Dog
        cell.style.backgroundImage = "url('enemy5.png";
      } else if (cellMoney == 6 && cellHP >= 1) { // 6 - Cat
        cell.style.backgroundImage = "url('enemy6.png";
      } else if (cellMoney == 7 && cellHP >= 1) { // 7 - Turtle
        cell.style.backgroundImage = "url('enemy7.png";
      } else if (cellMoney == 8 && cellHP >= 1) { // 8 - Frog
        cell.style.backgroundImage = "url('enemy8.png";
      } else if (cellMoney == 9 && cellHP >= 1) { // 9 - Bat
        cell.style.backgroundImage = "url('enemy9.png";
      } else if (cellMoney == 10 && cellHP >= 1) { // 10 - Jellyfish
        cell.style.backgroundImage = "url('enemy10.png')";
      } else if (cellMoney == 11 && cellHP >= 1) { // 11 - Eagle
        cell.style.backgroundImage = "url('enemy11.png";
      } else if (cellMoney == 12 && cellHP >= 1) { // 12 - Crocodile
        cell.style.backgroundImage = "url('enemy12.png";
      } else if (cellMoney == 13 && cellHP >= 1) { // 13 - Shark
        cell.style.backgroundImage = "url('enemy13.png";
      } else if (cellMoney >= 3 && cellHP == 0) { // 0 ------ DEAD
        cell.style.backgroundImage = "url('enemy0.png";
      }







      cell.textContent = generateCellValue(cellHP, cellDMG, parseInt(cellValues[2]));

      // Tu unikalne efekty komórek
      if (cellMoney == 7 && cellHP >= 2){
        cellHP -=1;
        cell.textContent = generateCellValue(cellHP, cellDMG, parseInt(cellValues[2]));
      }
      if (cellMoney == 10 && cellHP <= 99){
        cellHP +=1;
        cell.textContent = generateCellValue(cellHP, cellDMG, parseInt(cellValues[2]));
      }

      postacglowna();


    } 
  });
}
checkStats();



// Nasłuchiwanie na zdarzenie naciśnięcia klawisza
document.addEventListener('keydown', (event) => {
  // Pobranie wartości z komórki "highlighted" i zapisanie ich w zmiennych
  const highlightedValues = cells[currentCellIndex].textContent.split('-');
  let highlightedHP = parseInt(highlightedValues[0]);
  let highlightedDMG = parseInt(highlightedValues[1]);
  let highlightedMoney = parseInt(highlightedValues[2]);
  console.log('Wartości z komórki highlighted:', highlightedMoney);


    // To zmioenia poprzednio okupowaną komórke na losową
    if (highlightedMoney <= 50)        {
      cells[currentCellIndex].textContent = generateCellValue(
        Math.floor(0),
        Math.floor(0),
        Math.floor(Math.random() * 6 + 1)
      );
    } else if (highlightedMoney <= 100) {
      cells[currentCellIndex].textContent = generateCellValue(
        Math.floor(0),
        Math.floor(0),
        Math.floor(Math.random() * 8 + 1)
      );
    } else if (highlightedMoney <= 150) {
      cells[currentCellIndex].textContent = generateCellValue(
        Math.floor(0),
        Math.floor(0),
        Math.floor(Math.random() * 10 + 1)
      );
    } else if (highlightedMoney >= 201) {
      cells[currentCellIndex].textContent = generateCellValue(
        Math.floor(0),
        Math.floor(0),
        Math.floor(Math.random() * 12 + 2)
      );
    }
  
  


  cells[currentCellIndex].classList.remove('highlighted'); // Usunięcie klasy 'highlighted' z poprzedniej komórki
  

  

  // Warunki obsługujące ruch po siatce w zależności od naciśniętego klawisza
  if (
    (event.key === 'a' || event.key === 'ArrowLeft'|| event.key === 'A') && currentCellIndex % 5 !== 0) {
    currentCellIndex -= 1,
    steps += 1,
    oblicz += 1;

    checkStats();
  } else if ((event.key === 'w' || event.key === 'ArrowUp'|| event.key === 'W') && currentCellIndex >= 5) {
    currentCellIndex -= 5,
    steps += 1,
    oblicz += 1;

    checkStats();
  } else if ((event.key === 'd'  || event.key==='ArrowRight'|| event.key === 'D') && currentCellIndex % 5 !== 4) {
    currentCellIndex += 1,
    steps += 1,
    oblicz += 1;

    checkStats();
  } else if ((event.key === 's' || event.key==='ArrowDown'|| event.key === 'S')  && currentCellIndex < 20) {
    currentCellIndex += 5,
    steps += 1,
    oblicz += 1;

    checkStats();
  } // Umiejki dla postaci
    else if (event.key === 'r' && steps >= 10) {
      if (skill == 1)        {
        decreaseNeighbourHP();
      } else if (skill == 2) {
        explodeWeak();
      } else if (skill == 3) {
        consumeEnemy();
      }
  }
  console.log('Liczba kroków: ' + steps)
  console.log('Oblicz? ' + oblicz)

  

// Operacja na wartościach wewnątrz komórek
let currentCellValues = cells[currentCellIndex].textContent.split('-');
let currentHP = parseInt(currentCellValues[0]);
let currentDMG = parseInt(currentCellValues[1]);
let currentMoney = parseInt(currentCellValues[2]);



// Tu Można dodawac dowolne efekty z unikalnych kart ----------------------------------------------------------------------------------
if (oblicz>=1) {
  if (skill == 1){
    burn();
  }

  postacglowna();
  if (skill==2) {
    if (currentMoney<=2){
      highlightedHP = initialHP;
    }
  }
  if (currentMoney==1){
    highlightedHP +=1;
  } else if (currentMoney==2){
  highlightedHP +=2;
  } 


// Tu jak to przeciwnik a nie specjalna karta
else{
  currentHP -= highlightedDMG
  if (currentHP > 0 ) {
    let edycjaObrażeń = (currentDMG-=armor);
    if (edycjaObrażeń>1){
      highlightedHP -= edycjaObrażeń;
    }
    else {
      highlightedHP -=1;
    } 
  } 
  

  highlightedMoney += currentMoney;
  }
  oblicz = 0;
}

// Ogranicza życie do max jak przekroczysz
if (highlightedHP > maxHP) {
  highlightedHP = maxHP;
}



// To cuś robi że updatuje ci obecną komórkę na gracza i pokazuje jego wynik
cells[currentCellIndex].classList.add('highlighted'); // Dodanie klasy 'highlighted' do aktualnej komórki
cells[currentCellIndex].textContent = generateCellValue(highlightedHP, highlightedDMG, highlightedMoney);

// Wyświetlanie statystyk obok pola ------------------------------------------------------------------------------------------------------------------
function updateStats() {
  const hpValue = document.getElementById('hpValue');
  const dmgValue = document.getElementById('dmgValue');
  const moneyValue = document.getElementById('moneyValue')
  

  const highlightedValues = cells[currentCellIndex].textContent.split('-');
  const highlightedHP = parseInt(highlightedValues[0]);
  const highlightedDMG = parseInt(highlightedValues[1]);
  const highlightedMoney = parseInt(highlightedValues[2]);

  hpValue.textContent = initialHP + "/" + highlightedHP;
  dmgValue.textContent = highlightedDMG;
  moneyValue.textContent = highlightedMoney;
  //armorValue.textContent = armor;     // <---- do zmiany jak będzie aktywnie zmieniany
}
updateStats();


localStorage.setItem('highlightedMoney', highlightedMoney);
console.log('Zapisano wartość do Local Storage:', highlightedMoney); // <-- sprawdza czy zapisano w pamieci ilosc aktualnych monet
 // zapisywanie w pamieci  
if(highlightedHP <= 0){  // <-- Sprawdzenie czy gracz nie przegrał
  GameOver() 
}


});



function GameOver() {
  // Wyświetl powiadomienie o przegranej
  //   alert('Przegrałeś!'); <--- to pokazuje alert o przegranej
  // Zresetuj grę lub przekieruj na stronę startową
  resetGame();
}
function resetGame() {
  // Możesz dodać tutaj kod do zresetowania gry, np. przywrócenie punktów życia do początkowej wartości
  window.location.href = '../End/end.html';
}
