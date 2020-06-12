
function populateUfs() {
    const ufSelect = document.querySelector('select[name=uf]');
    
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then( res =>  res.json())
    .then( states => {

        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
       
    })
}

populateUfs();

function getCities(event) {
    const citySelect  = document.querySelector('[name=city');
    const stateInput = document.querySelector('[name=state]');

    const ufValue = event.target.value;

    const indexOfSelectedState =  event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios';
    citySelect.innerHTM = '<option value> Selecione a cidade></option>';
    citySelect.disabled = true;

    fetch(url)
    .then( res => res.json())
    .then( cities => {
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }
    citySelect.disabled= false;
    })
}

document.querySelector('select[name=uf]').addEventListener('change', getCities);

// itens de coleta
const itensToCollect = document.querySelectorAll('.itens-grid');

for (const item of itensToCollect) {
    item.addEventListener('click', handleSelectedItem);
}

let selectedItens = [];


function handleSelectedItem(event) {
    const itemLi = event.target;
    // adicionar ou remover um classe
    itemLi.classList.toggle('selected');

    const itemId = event.target.dataset.id;

    // verificar se existem itens selecionados, se sim, pegar os itens selecionados 
    const alreadySelected = selectedItens.findIndex( (item)=>{
       const itemFound = item === itemId
    })

    //se já estiver selecionadom tirar da seleção 

    // se não tiver selecionado, adicionar a seleção
}