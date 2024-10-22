const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const loader = document.querySelector(".pokeballs-container");
let isFetching = false;
const nextURL = {
  next: null,
};

const renderPokemon = (pokemon) => {
    const { id, name, sprites, height, weight, types } = pokemon;
    return `
      <div class="poke">
          <img  src="${sprites.other.home.front_default}"/>
          <h2>${name.toUpperCase()}</h2>
          <span class="exp">EXP: ${pokemon.base_experience}</span>
          <div class="tipo-poke">
              ${types
                .map((tipo) => {
                  return `<span class="${tipo.type.name} poke__type">${tipo.type.name}</span>`;
                })
                .join("")}
          </div>
          <p class="id-poke">#${id}</p>
          <p class="height">Height: ${height / 10}m</p>
          <p class="weight">Weight: ${weight / 10}Kg</p>
      </div>
    `;
  };

  const renderPokemonList = (pokeList) => {
    const cards = pokeList
      .map((pokemon) => {
        return renderPokemon(pokemon);
      })
      .join("");
      const caja = document.querySelector("#caja");
    caja.innerHTML += cards;
  };

  const fetchPokemons = async () => {
    var numero = document.getElementById("Numero").value;
     const res = await fetch(`${baseURL}${numero} `); 
    const data = await res.json();
    return data;
  };

  
const loadAndPrint = (pokemonsList) => {
    loader.classList.add("show");
    setTimeout(() => {
      loader.classList.remove("show");
      renderPokemonList(pokemonsList);
      isFetching = false;
    }, 1500);
  };

async function myFunction() {
  try{

  var numero = document.getElementById("Numero").value;
  url= baseURL+numero;
  console.log(url);
  const nextPokemons = await fetch(url);
  cards= renderPokemon(  await nextPokemons.json() ); 
  const caja = document.querySelector("#caja");
    caja.innerHTML = cards;
  }

  catch(error){
    console.error("Error: ",error);
    caja.innerHTML = "Error de servicio: " + error;
  }

  };