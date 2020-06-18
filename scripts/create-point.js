
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


const itensToCollect = document.querySelectorAll('.itens-grid li');
for (const item of itensToCollect) {
    item.addEventListener('click', handleSelectedItem);
}

const collectedItems = document.querySelector('input[name=items]');

let selectedItems = [];


function handleSelectedItem(event) {
    const itemLi = event.target;
    //adicionar ou remover um classe 
    itemLi.classList.toggle('selected');
    const itemId = itemLi.dataset.id;

    
    //verificar itens selecionados
    //a função abaixo fircará rodando até encontrar um valor verdadeiro
    const alreadySelected = selectedItems.findIndex((item)=>{
        // eslint-disable-next-line eqeqeq
        const itemFound = item == itemId;
        return itemFound;
    })
    //retirar seleção
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            // eslint-disable-next-line eqeqeq
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId)
    }

    //atualizar o campo escondido com o itens selecionados
    collectedItems.value = selectedItems
}