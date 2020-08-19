import {setError, setUpload} from "../actionCreators/ActionCreators";
import backAPI from '../../api/';
const API = new backAPI();

export function deleteWorkerThunk(company_id, worker_id, secretInput) {
  return async (dispatch) => {
    dispatch(setUpload(true));
    try {
      const resp = await API.deleteWorker(company_id, worker_id, secretInput);
      dispatch(setUpload(false));
    } catch (error) {
      dispatch(setUpload(false));
      dispatch(setError(error.message));
    }
  }
}
