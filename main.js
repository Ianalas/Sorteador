const sectionInput = document.querySelector(".side-input");
const sectionCount = document.querySelector(".side-count");

const formulario = document.querySelector("#formulario");
const btnSortear = document.querySelector("#sortear");
const btnReplay = document.querySelector("#voltar");
const resultado = document.querySelector(".result");

const inputQuantNums = document.querySelector("#quantNums");
const inputNumsDe = document.querySelector("#numsDe");
const inputNumsAte = document.querySelector("#numsAte");
const changeRepeat = document.querySelector("#switch");


formulario.onsubmit = (e)=>{
  e.preventDefault();
  const objeto = {
    quantidade: inputQuantNums.value,
    min: inputNumsDe.value,
    max: inputNumsAte.value,
    repeat: changeRepeat.checked
  }  

  try {
    if(objeto.quantidade > 1 && objeto.min > 0 && objeto.max > 1 && objeto.min < objeto.max){
      sectionInput.style.display = "none";
      sectionCount.style.display = "grid";

      const sorteados = sortear(objeto.quantidade, objeto.min, objeto.max, objeto.repeat);
      
      for(let i = 0; i < objeto.quantidade; i++){
        let num = sorteados[i]
        setTimeout(() => addNumsSorteados(num), i * 2000); 
      }
    }
  } catch (error) {
    console.log(error);
  }
};

btnReplay.addEventListener( "click", ()=>{

  sectionInput.style.display = "grid";
  sectionCount.style.display = "none";

  clearAll();
})

function sortear(n, de, ate,repeat){
  let sorteados = [];
  let k = 0;

  if ( !repeat ) { //Aqui irá repetir os numeros já sorteados
    while(k<n){
      let element = Math.floor((Math.random() * Number(ate)) + Number(de));
      if ( element >= de && element <= ate ){
        sorteados.push(element);
        k++
      }
    }
    return sorteados
  }
  while (k < n) { //Aqui NÃO irá repetir
    let element = Math.floor((Math.random() * Number(ate)) + Number(de)); //ele sorteia apartir do "de" até o "ate";
    if ( element >= de && element <= ate && !sorteados.includes(element) ) {
      sorteados.push(element);
      k++
    }
  }
  return sorteados
}

function addNumsSorteados(value){ //Adiciona no html o numero sorteado
  let sorteado = document.createElement("h2");
  sorteado.textContent = value;


  resultado.appendChild(sorteado);
}

function clearAll(){
  resultado.innerHTML = '';
  inputQuantNums.value = '';
  inputNumsDe.value = '';
  inputNumsAte.value = '';
}