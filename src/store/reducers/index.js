import { combineReducers } from 'redux';

import animals from './animals';
import game from './game';

export default combineReducers({
  animals,
  game
});
