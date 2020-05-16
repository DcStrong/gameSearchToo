import * as C from '../const';
/**
 * https://bost.ocks.org/mike/shuffle/
 *
 * @param {array} array
 */
export function shuffleArray(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

export function uuid() {
  const xxx = Math.random().toString(32).substring(2);
  const yyy = Math.random().toString(32).substring(2);
  const zzz = Math.random().toString(32).substring(2);

  return `${xxx}-${yyy}-${zzz}`;
}

export function generateField(animals, fieldSize) {
  // каждую игру берем рандомных зверушек
  const shuffledAnimals = shuffleArray([...animals]);
  // берем только первых N в зависимости по размеру поля
  const filteredAnimals = shuffledAnimals.slice(0, fieldSize);

  // клонируем каждую зверушку, что бы на поле у нее была пара
  const tiles = filteredAnimals.reduce((arr, animal) => {
    arr.push(animal);
    arr.push(animal);

    return arr;
  }, []);

  // сортируем что бы они не шли подряд после клонирования
  const shuffledTiles = shuffleArray(tiles);

  // конвертируем массив в объект, где ключем каждого элемента будет id
  // и сразу добавляем нужные нам поля в объект
  return shuffledTiles.reduce((tiles, tile) => {
    const id = uuid();

    tiles[id] = { status: C.TILE_STATUS.INACTIVE, ...tile };

    return tiles;
  }, {});
}