import { eachWorker, isLoading, setError } from "../actionCreators/ActionCreators";
import backAPI from '../../api/';
const API = new backAPI();

export function eachWorkerThunk(company_id, worker_id) {
  return async (dispatch) => {
    dispatch(isLoading(true));
    try {
      dispatch(isLoading(false));
      const resp = await API.eachWorker(company_id, worker_id);
      console.log(resp);

      dispatch(eachWorker(resp));
    } catch (error) {
      dispatch(isLoading(false));
      dispatch(setError(error.message));
    }
  }
}
