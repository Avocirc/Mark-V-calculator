let a = ''; //Primul numar
let b = ''; //Al doilea numar
let sign = ''; //Semnul operatiunii
let finish = false;


const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];


const action = ['-', '+', 'x', '/'];



//Display-ul
const out = document.querySelector('.calc-screen p'); //Accesul la display


function clearAll() {
  a = '';
  b = '';
  sign = '';
  finish = false;
  out.textContent = 0; // Scoatem pe display textul scris de utilizator
  
}


document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
  //Nu este apasat buttonul - daca event target classlist continte class btn atunci este button daca nu (!) nu se intmpla nimic
  if (!event.target.classList.contains('btn')) return;
  //Este apasat buttonul - verific daca a fost apasat butonul sau AC sau nu 
  if (event.target.classList.contains('ac')) return;

  out.textContent = ''
  //Primesc buttonul apasat - din buttonul apasat citesc textu(denumirea buttonului)(primesc denumirea) si il adaug variabilei key
  const key = event.target.textContent;

  //Daca este apasat buttonul 0-9 sau . - verificam in array-ul digit daca a fost apasat(accesat) textul (key) 
  if(digit.includes(key)){
    // Daca b este egal cu string liber si semnul la fel atunci indeplinesc blocul a 
      if(b === '' && sign === '') {
    a += key;
    console.log(a, b, sign);
    //Scoatem pe ecran numerele
    out.textContent = a;
    }
    else if (a!=='' && b!=='' && finish){
        //Anulez valoarea lui b dupa ce se intampla calculul pentru a efectua altul (al modifica pe cel precedent)
        b = key;
        //Anulez si valoarea lui finish din aceiasi cauza;
        finish = false;
        //Scot pe ecran valoarea lui b
        out.textContent = b;
    }
    else {
      // Aici scoatem in consola pe b 
      b += key;
      out.textContent = b;
    }
    console.log(a, b, sign); 
    return;
  }

  //Daca este apasat buttonul + - / * erificam in array-ul action daca a fost apasat(accesat) textul (key)
  if (action.includes(key)) {
    sign = key;
    out.textContent =  sign;
    console.log(a, b, sign);
    return;
  }

  //Apasat =
  if(key === '='){
    //Acest bloc ne permite sa executam calcule fara al doile numar (Ex. 5+ va fi 10 15 20 ...)
    if(b === '=') b = a;
    switch(sign) {
      case'+':
          //Le-am pus in paranteze deoarece a si b sunt string si in asa caz am evitat concatenarea
            a = (+a) + (+b);
            break;
      case '-':
            a = a - b;
            break;
      case 'x':
            a = a * b;
            break;
      case '/':
            //Acest bloc arata greseala de scrie(impartire la 0 de exemplu)
            if(b === '0') {
              out.textContent = ('Error');
              a = '';
              b = '';
              sign = '';
              return;
            }
            a = a / b;
            break;    
    }
    finish = true;
    out.textContent = a;
    console.log(a, b, sign);
  }

}

