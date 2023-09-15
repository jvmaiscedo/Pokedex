
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.name = pokeDetail.name;
    pokemon.pNumber = pokeDetail.id;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
           .then((response) => response.json())
           .then(convertPokeApiDetailToPokemon)

}

pokeApi.getPokemons = (offset, limit)=>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response)=> response.json())
        .then((jsonBody)=> jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailsRequests) => Promise.all(detailsRequests))
        .then((pokemonsDetails)=> pokemonsDetails)
        .catch((error) => console.log(error))
}