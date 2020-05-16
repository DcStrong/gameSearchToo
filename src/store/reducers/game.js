import {
  SET_GAME_FIELD,
  SET_GAME_STATUS,
  SET_GAME_FIELD_SIZE,
  UPDATE_GAME_FIELD_TILE,
  SET_GAME_MODE,
  SET_NEED_TO_BE_GUESSED
} from "../actions/types";

import * as C from '../../const';

const initialState = {
  status: C.GAME_STATUS.STOPPED,
  fieldSize: 4,
  field: null,
  gameMode: null,
  needToBeGuessed: null
};

export default function game(state = initialState, { type, payload }) {
  switch (type) {
    case SET_GAME_FIELD:
      return Object.assign({}, state, { field: { ...payload } });

    case SET_GAME_STATUS:
      console.log(payload)
      return Object.assign({}, state, { status: payload });

    case SET_GAME_FIELD_SIZE:
      return Object.assign({}, state, { fieldSize: payload });

    case UPDATE_GAME_FIELD_TILE:
      const copyField = Object.assign({}, state.field);
      copyField[payload.id] = { ...copyField[payload.id], ...payload.tile };
      return Object.assign({}, state, { field: { ...copyField } });

    case SET_GAME_MODE:
      console.log(payload);
      return state;

    case SET_NEED_TO_BE_GUESSED:
      return Object.assign({}, state, { needToBeGuessed: payload });

    default:
      return state;
  }
}
