export const newPokemon =     {
  "_id": 3,
  "name": "Venusaur",
  "type": [
    "Grass",
    "Poison"
  ],
  "weight": {
    "value": 100.0,
    "measurement": "kg"
  },
  "height": {
    "value": 2.0,
    "measurement": "m"
  },
  "description": "A bewitching aroma wafts from its flower. The fragrance becalms those engaged in a battle.",
  "baseStats": {
    "hp": 80,
    "atk": 82,
    "def": 83,
    "satk": 100,
    "sdef": 100,
    "spd": 80
  },
  "moves": {
    "skill1": "Double-Edge",
    "skill2": "Solar Beam"
  },
  "image1": "https://archives.bulbagarden.net/media/upload/a/ae/003Venusaur.png",
  "image2": "https://archives.bulbagarden.net/media/upload/6/68/Spr_5b_003_m.png"
}

export const invalidPokemon = {
  "_id": 3,
  "name": 15,
  "type": [
    "Grass",
    "Poison"
  ],
  "weight": {
    "value": 13.0,
    "measurement": "kg"
  },
  "height": {
    "value": 1.0,
    "measurement": "m"
  },
  "description": "There is a plant bulb on its back. When it absorbs nutrients, the bulb is said to blossom into a large flower.",
  "baseStats": {
    "hp": 60,
    "atk": 62,
    "def": 63,
    "satk": 80,
    "sdef": 80,
    "spd": 60
  },
  "moves": {
    "skill1": "Razor Leaf",
    "skill2": "Take Down"
  },
  "image1": "https://archives.bulbagarden.net/media/upload/7/73/002Ivysaur.png",
  "image2": "https://archives.bulbagarden.net/media/upload/e/e1/Spr_5b_002.png" 
}

export const pokemonUpdateInput = {
  "_id": 2,
  "name": "Charizard",
  "type": [
    "Fire",
    "Flying"
  ],
  "weight": {
    "value": 90.5,
    "measurement": "kg"
  },
  "height": {
    "value": 1.7,
    "measurement": "m"
  },
  "description": "It breathes fire of such great heat that it melts anything. Its fire burns weakly if it is cooled.",
  "baseStats": {
    "hp": 78,
    "atk": 84,
    "def": 78,
    "satk": 109,
    "sdef": 85,
    "spd": 100
  },
  "moves": {
    "skill1": "Flamethrower",
    "skill2": "Fire Blast"
  },
  "image1": "https://archives.bulbagarden.net/media/upload/6/68/Spr_5b_006_m.png",
  "image2": "https://archives.bulbagarden.net/media/upload/6/68/Spr_5b_006_m.png"
}

export const pokemonPartialInput = {
  "name": "Pokessauro",
}


export const pokemonInvalidUpdateInput = {
  "_id": 3,
  "name": "Charizard",
  "type": [
    "Fire",
    "Flying"
  ],
  "weight": {
    "value": 90.5,
    "measurement": "kg"
  },
  "height": {
    "value": 1.7,
    "measurement": "m"
  },
  "description": "It breathes fire of such great heat that it melts anything. Its fire burns weakly if it is cooled.",
  "baseStats": {
    "hp": 78,
    "atk": 84,
    "def": 78,
    "satk": 109,
    "sdef": 85,
    "spd": 100
  },
  "moves": {
    "skill1": "Flamethrower",
    "skill2": "Fire Blast"
  },
  "image1": "https://archives.bulbagarden.net/media/upload/6/68/Spr_5b_006_m.png",
  "image2": "https://archives.bulbagarden.net/media/upload/6/68/Spr_5b_006_m.png"
}

export const pokemonPartialInvalidInput = {
  "_id": 3,
  "name": "Pokessauro",
}

export const partialInvalid = {
  "name": 12345,
}
