import { allStaff, isLoading, setError } from "../actionCreators/ActionCreators";
import backAPI from '../../api/';
const API = new backAPI();


export function allStaffThunk(id) {
  return async (dispatch) => {
    dispatch(isLoading(true));
    try {
      const resp = await API.allEmployees(id);
      dispatch(allStaff(resp.list));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(isLoading(false));
      dispatch(setError(error.message));
    }
  }
}
