const pokemonName = document.querySelector('.Pokemon-name');
const pokemonID = document.querySelector('.Pokemon-number');
const pokemonSprite = document.querySelector('.Pokemon-sprite');
const pokemonAbility = document.querySelector('.Pokemon-ability')

const form = document.querySelector('.Form');
const inputSearch = document.querySelector('.Input-search');

const prevButton = document.querySelector('.Prev');
const NextButton= document.querySelector('.Next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
   if (APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
   }
};

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Loading...';
    pokemonID.innerHTML = ' ';


    const data = await fetchPokemon(pokemon);

    if (data){

    pokemonSprite.style.display ='block'
    pokemonName.innerHTML = data.name;
    pokemonID.innerHTML = data.id;
    pokemonSprite.src = data['sprites']['versions']['generation-v']
    ['black-white']['animated']['front_default'];
    searchPokemon = data.id;

    inputSearch.value ='';

    }else{
        pokemonName.innerHTML = 'Not Found :(';
        pokemonID.innerHTML = '';
        inputSearch.value ='';
        pokemonSprite.style.display ='none '
        pokemonAbility.innerHTML = '...';
    }

};

form.addEventListener('submit', (e) => {

    e.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase());

});

NextButton.addEventListener('click', () => {
    searchPokemon ++;
    renderPokemon(searchPokemon)

});

prevButton.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon --;
        renderPokemon(searchPokemon)
    }
        

});

renderPokemon(searchPokemon)