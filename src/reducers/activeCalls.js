import { FETCHING } from "../constants/actions";
import { activeCallState } from '../constants/initialStates';

const activeCalls = (state = activeCallState, action) => {
  if (action.type === FETCHING) {
    return state + 1
  } else {
    return state - 1
  }
}

export default activeCalls;
