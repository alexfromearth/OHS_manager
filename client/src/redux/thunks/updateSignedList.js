import { updateSignedDocs, uploadingFailed } from '../actionCreators/ActionCreators.js';
import backAPI from '../../api/';
const API = new backAPI();

export default function (workerId, signedOhsIds) {
  return async (dispatch) => {
    try {
      const response = await API.updateSgnedList(workerId, signedOhsIds);
      if (response.status === 200) {
        // dispatch(updateSignedDocs(signedOhsIds));
      } else {
        dispatch(uploadingFailed(response.data.message));
      }
    } catch (error) {
      dispatch(uploadingFailed("Updating failed!"))
    }
  }
}
