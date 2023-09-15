const pokemonList = document.getElementById('pokemonList')
const LoadMoreButton = document.getElementById('loadMoreButton')
let offset = 0
let limit = 10
const maxRecords = 151



LoadMoreButton.onclick = function adicionarPaginacao(){
    offset+=limit
    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        LoadMoreButton.parentElement.removeChild(LoadMoreButton)
    }
    else{
        loadPokemonItens(offset, limit)
    }
}

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit)
    .then((pokemons = [])=>{
        const newHtml = pokemons.map((pokemon) => 
            `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.pNumber}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">        
                </div> 
            </li>
            `).join('');
        pokemonList.innerHTML += newHtml
    })
    .catch((error) => console.log(error))
}
loadPokemonItens(offset, limit)


