import actionTypes from "../actionTypes/actionTypes";

const initialState = {
  list: [],
  worker: null,
  fileList: [],
  uploadingScans: false,
  errorUpload: null,
}

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_EMPLOYEES: {
      return {
        ...state,
        list: action.payload.list,
      }
    }
    case actionTypes.EACH_WORKER: {
      return {
        ...state,
        worker: action.payload.worker,
      }
    }
    //upload scan
    case actionTypes.ON_SCAN_REMOVE: {
      const index = state.fileList.indexOf(action.payload.file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        ...state,
        fileList: newFileList,
      };
    }
    case actionTypes.BEFORE_UPLOAD: {
        return {
            ...state,
            fileList: [...state.fileList, action.payload.file],
        }
    }
    case actionTypes.CLEAR_FILELIST: {
      return {
        ...state,
        fileList: [],
        uploadingScans: false,
      }
    }
    case actionTypes.SET_UPLOAD: {
      return {
        ...state,
        uploadingScans: action.payload.value,
      }
    }
    case actionTypes.UPLOAD_SUCCESS: {
      return {
        ...state,
        fileList: [],
        uploadingScans: false,
      }
    }
    case actionTypes.UPLOADING_FAILED: {
      return {
        ...state,
        errorUpload: action.payload.message,
        uploadingScans: false,
      }
    }
    default:
      return state;
  }
}

export default employeeReducer;
