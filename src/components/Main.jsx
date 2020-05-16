import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import * as utils from '../utils/index';
import * as C from '../const';

import Tile from './Tile';

import './Main.css';

const Main = () => {
  const dispatch = useDispatch();
  const animals = useSelector(state => state.animals);
  const game = useSelector(state => state.game);
  const [lastClickedTileId, setLastClickedTileId] = useState(null);
  const [gameMode, setGameMode] = useState('TIME_GAME');
  const [timeCounter, setTimeCounter] = useState('');
  const [intervalId, setIntervalId] = useState('');
  const [timeModeDifficulty, setTimeModeDifficulty] = useState('EASY');

  const tiles = (() => {
    //Проверяем статус в сторе и статус в констанстенте если стоп то выходим и не продолжаем
    if (game.status === C.GAME_STATUS.STOPPED) {
      return {};
    }
    //Проверяем поля со стора если они не равны полям в костанстанте и не равны нулю возвращаем их
    if (game.field !== C.EMPTY_FIELD && Object.keys(game.field).length !== 0) {
      return game.field;
    }
    //Вызываем функцию геренации полей, передаем 2 аргумета, первым идет массив плиток, вторым принимаем казмер игрового поля
    const tiles = utils.generateField(animals, game.fieldSize / 2);
    //Передаем в стор новое игровое поле
    dispatch(actions.setGameField(tiles));
    dispatch(actions.setNeedToBeGuessed(game.fieldSize/2));

    return tiles;
  })();

  const needToBeGuessed = useSelector(state => state.game.needToBeGuessed);

  const onTileClicked = (clickedTileId) => {
    const clickedTile = tiles[clickedTileId];

    if (clickedTile.status === C.TILE_STATUS.GUESSED) {
      return;
    }

    if (lastClickedTileId === clickedTileId) {
      return;
    }

    dispatch(actions.updateGameFieldTile({ id: clickedTileId, tile: { status: C.TILE_STATUS.ACTIVE } }));
    if (!lastClickedTileId) {
      setLastClickedTileId(clickedTileId);
      return;
    }

    const lastClickedTile = tiles[lastClickedTileId];
    if (lastClickedTile.group === clickedTile.group) {
      dispatch(actions.updateGameFieldTile({ id: lastClickedTileId, tile: { status: C.TILE_STATUS.GUESSED } }));
      dispatch(actions.updateGameFieldTile({ id: clickedTileId, tile: { status: C.TILE_STATUS.GUESSED } }));

      setLastClickedTileId(null);
      dispatch(actions.setNeedToBeGuessed(needToBeGuessed - 1));
      return;
    }
    dispatch(actions.updateGameFieldTile({ id: lastClickedTileId, tile: { status: C.TILE_STATUS.INACTIVE } }));
    setLastClickedTileId(clickedTileId);
  }

  const setGameFieldSize = size => dispatch(actions.setGameFieldSize(size));

  const startGame = () => {
    dispatch(actions.setGameStatus(C.GAME_STATUS.STARTED));
    if (gameMode === 'TIME_GAME') {
      timeGameMode(C.TIME_MODE[timeModeDifficulty]);
    };
  };

  const stopGame = () => {
    setLastClickedTileId(null);
    clearInterval(intervalId);
    setIntervalId(null);
    setTimeCounter(null);
    dispatch(actions.setGameStatus(C.GAME_STATUS.STOPPED));
    dispatch(actions.setGameField(C.EMPTY_FIELD));
  };

  const timeGameMode = (value) => {
    let counter = value;
    const id = setInterval(() => {
      setTimeCounter(--counter);
      if (counter <= 0) {
        clearInterval(id);
        dispatch(actions.setGameStatus(C.GAME_STATUS.GAME_OVER));
      }
    }, 1000);
    setIntervalId(id);
  };

  if (game.status === C.GAME_STATUS.STARTED && needToBeGuessed <= 0) {
    clearInterval(intervalId);
    setIntervalId(null);
    setTimeCounter(null);
    dispatch(actions.setGameStatus(C.GAME_STATUS.CONGRATULATION));
  }



  return (
    <div className='main'>
      {
        game.status === C.GAME_STATUS.GAME_OVER
        ?
          <section className="game-status game-over">
            <h2>Game over</h2>
            <button className="button" onClick={stopGame}>New Game</button>
          </section>
        :
          game.status === C.GAME_STATUS.CONGRATULATION
        ?
          <section className="game-status congratulation">
            <h2>CONGRATULATION</h2>
            <button className="button" onClick={stopGame}>New Game</button>
          </section>
        :
          game.status === C.GAME_STATUS.STARTED
        ?
          <section className='game'>
            <div className="game_container">
              {
                gameMode === 'TIME_GAME'
                ?
                  <progress className="progress-bar" max={C.TIME_MODE[timeModeDifficulty]} value={timeCounter}></progress>
                : null
              }
              <div className="field">
                {
                  Object.keys(tiles).map(id =>
                    <Tile
                      key={id}
                      id={id}
                      name={tiles[id].name}
                      group={tiles[id].group}
                      status={tiles[id].status}
                      img={tiles[id].img}
                      onClick={onTileClicked}
                    />
                  )
                }
              </div>
            </div>
            <div className="info_bar">
              <div className="counter">{timeCounter}</div>
              <button className="button" onClick={stopGame}>STOP GAME</button>
            </div>
          </section>
        :
          <section className="intro">
            <div className="select__container">
              <label className="label">Game mode</label>
              <select className="select" onChange={e => setGameMode(e.target.value)} defaultValue={gameMode}>
                <option value="TIME_GAME">Time game</option>
                <option value="GOOD_MODE">Good mode</option>
              </select>
            </div>
            {
              gameMode === 'TIME_GAME'
              ?
                <div className="select__container">
                  <label className="label">Level of difficulty</label>
                  <select className="select" onChange={e => setTimeModeDifficulty(e.target.value)} defaultValue={timeModeDifficulty}>
                    <option value="EASY">Easy</option>
                    <option value="NORMAL">Normal</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>
              :
                null
            }
            <div className="select__container">
              <label className="label">Number of fields</label>
              <select className="select" onChange={e => setGameFieldSize(e.target.value)} defaultValue={game.fieldSize}>
                <option value="4">2x2</option>
                <option value="16">4x4</option>
              </select>
            </div>

            <button className="button start" onClick={startGame}>START GAME</button>
          </section>
      }
    </div>
  )
}

export default Main;