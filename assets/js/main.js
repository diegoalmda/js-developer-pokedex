const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('pokemon');

function convertPokemonToLi(pokemon) {
    return `
      <a href="?pokemon=${pokemon.name}">
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
      </a>
    `
}

function showPokemonDetails(pokemon) {
    return `
      <a href="?pokemon=${pokemon.name}">
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="details">
              <div>
                <span class="name">species: </span>                
                <span class="name">${pokemon.species}</span>                
              </div>
              <div>
                <span class="name">Height: </span>                
                <span class="name">${pokemon.height}</span>                
              </div>
              <div>
                <span class="name">Weight: </span>                
                <span class="name">${pokemon.weight}</span>                
              </div>
              <div>
                <span class="name">Abilities: </span>
                ${pokemon.abilities.map((ability) => `<span class="ability">${ability}</span>`).join(', ')}            
              </div>
              <div>
                <span class="base-stat">Base Stats: </span>
                <ul>
                  ${pokemon.stats.map((stat) => 
                    `<li class="stats">
                      <span class="name">${stat.name}: </span>
                      <span class="ability">${stat.base_stat}</span>
                    </li>`).join('')}       
                </ul>
              </div>
            </div>
        </li>
      </a>
    `
}

function loadPokemonItens(offset, limit) {
  if (pokemonName) {   
      pokeApi.getPokemon(pokemonName).then((pokemon = undefined) => { 
        console.log(pokemon)
          const newHtml = showPokemonDetails(pokemon);
          pokemonList.innerHTML = newHtml      
      })
  } else {
      pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
          const newHtml = pokemons.map(convertPokemonToLi).join('')
          pokemonList.innerHTML += newHtml
      })
  }
}

loadPokemonItens(offset, limit)


if (pokemonName) {
  loadMoreButton.textContent = "Go back"
  loadMoreButton.addEventListener('click', () => {
    window.location.href = "/";
  })
} else {
  loadMoreButton.textContent = "Load More"
  loadMoreButton.addEventListener('click', () => {
      offset += limit
      const qtdRecordsWithNexPage = offset + limit
  
      if (qtdRecordsWithNexPage >= maxRecords) {
          const newLimit = maxRecords - offset
          loadPokemonItens(offset, newLimit)
  
          loadMoreButton.parentElement.removeChild(loadMoreButton)
      } else {
          loadPokemonItens(offset, limit)
      }
  })
}
