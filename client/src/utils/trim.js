import deepcopy from "deepcopy";


export default function trim(value) {
  const newState = deepcopy(value);
  Object.keys(newState).map(k => newState[k] = newState[k].trim());
  return newState;
}
