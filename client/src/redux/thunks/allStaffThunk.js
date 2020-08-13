import { allStaff, isLoading, setError } from "../../redux/actionCreators/ActionCreators";

export function allStaffThunk(id) {
  return async (dispatch) => {
    dispatch(isLoading(true));
    try {
      dispatch(isLoading(false))
      const response = await fetch(`/api/workers/${id}/list`)
      const resp = await response.json();
      dispatch(allStaff(resp.list));
    } catch (error) {
      dispatch(isLoading(false))
      dispatch(setError(error.message))
    }
  }
}
