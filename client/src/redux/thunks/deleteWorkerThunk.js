import { deleteWorker, isLoading, setError } from "../actionCreators/ActionCreators";
import backAPI from '../../api/';
const API = new backAPI();

export function deleteWorkerThunk(company_id, worker_id) {
  return async (dispatch) => {
    dispatch(isLoading(true));
    try {
      dispatch(isLoading(false));
      const resp = await API.deleteWorker(company_id, worker_id);
      console.log(resp);
      dispatch(deleteWorker());
    } catch (error) {
      dispatch(isLoading(false));
      dispatch(setError(error.message));
    }
  }
}
