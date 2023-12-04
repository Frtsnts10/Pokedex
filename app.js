const pokedex = document.getElementById("pokedex");

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 400; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      id: result.id,
      name: result.name,
      type: result.types.map((type) => type.type.name).join(", "),
      height: result.height,
      weight: result.weight,
      abilities: result.abilities
        .map((ability) => ability.ability.name)
        .join(", "),
      image: result.sprites["front_default"],
    }));

    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `
      <li class="card">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <p class="card-subtitle">Type: ${pokeman.type}</p>
      </li>
    `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
