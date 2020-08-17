import actionTypes from "../actionTypes/actionTypes";
import deepcopy from "deepcopy";

const initialState = {
  list: [],
  worker: {},
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
      const newState = deepcopy(state);
      newState.worker = action.payload.worker;
      newState.worker.columns = {
        'unsigned': {
          id: 'unsigned',
          title: 'Неподписанные',
          docIds: newState.worker.unsignedOhsIds,
        },
        'signed': {
          id: 'signed',
          title: 'Подписанные',
          docIds: newState.worker.signedOhsIds,
        },
        colOrder: ['unsigned', 'signed']
      }
      return newState;
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

    case actionTypes.UPDATE_SIGNED_DOCS: {
      const newState = deepcopy(state);
      newState.worker.signedOhsIds = action.payload.signedOhsIds;
      return newState;
    }

    case actionTypes.UPDATE_COLUMNS: {
      const newState = deepcopy(state);
      newState.worker.columns = action.payload.newColumns;
      return newState;
    }

    default:
      return state;
  }
}

export default employeeReducer;
