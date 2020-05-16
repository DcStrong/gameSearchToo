import {
  SET_GAME_STATUS,
  SET_GAME_FIELD,
  SET_GAME_FIELD_SIZE,
  UPDATE_GAME_FIELD_TILE,
  SET_GAME_MODE,
  SET_NEED_TO_BE_GUESSED
} from "./types";

export function setGameStatus(payload) {
  return { type: SET_GAME_STATUS, payload };
}

export function setGameField(payload) {
  return { type: SET_GAME_FIELD, payload };
}

export function setGameFieldSize(payload) {
  return { type: SET_GAME_FIELD_SIZE, payload };
}

export function updateGameFieldTile(payload) {
  return { type: UPDATE_GAME_FIELD_TILE, payload };
}

export function setGameMode(payload) {
  return { type: SET_GAME_MODE, payload };
}

export function setNeedToBeGuessed(payload) {
  return { type: SET_NEED_TO_BE_GUESSED, payload };
}