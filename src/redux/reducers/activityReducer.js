import {
  CREATE_EVENT_PENDING,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  GET_ALL_EVENTS_WITH_FILTER_PENDING,
  GET_ALL_EVENTS_WITH_FILTER_SUCCESS,
  GET_ALL_EVENTS_WITH_FILTER_FAIL,
  GET_MY_EVENTS_WITH_FILTER_PENDING,
  GET_MY_EVENTS_WITH_FILTER_SUCCESS,
  GET_MY_EVENTS_WITH_FILTER_FAIL,
  GET_MY_SPONSOR_EVENTS_PENDING,
  GET_MY_SPONSOR_EVENTS_SUCCESS,
  GET_MY_SPONSOR_EVENTS_FAIL,
  GET_INIT_EVENT_PENDING,
  GET_INIT_EVENT_SUCCESS,
  GET_INIT_EVENT_FAIL,
  GET_INIT_LIST_PENDING,
  GET_INIT_LIST_SUCCESS,
  GET_INIT_LIST_FAIL,
  CANCEL_EVENT_SUCCESS,
  CANCEL_EVENT_FAIL,
  CANCEL_EVENT_PENDING,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  DELETE_EVENT_PENDING,
  UPDATE_EVENT_FAIL,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_PENDING,
  GET_FOR_USER_FAIL,
  GET_FOR_USER_PENDING,
  GET_FOR_USER_SUCCESS,
  UPDATE_SHORTCUTE_FAIL,
  UPDATE_SHORTCUTE_PENDING,
  UPDATE_SHORTCUTE_SUCCESS,
  GET_SHORTCUTE_FAIL,
  GET_SHORTCUTE_PENDING,
  GET_SHORTCUTE_SUCCESS,
  DELETE_SHORTCUTE_FAIL,
  DELETE_SHORTCUTE_PENDING,
  DELETE_SHORTCUTE_SUCCESS,
  GET_ACTIVITY_DETAIL,
  ACTIVITY_DETAIL_SUCCESS,
  ACTIVITY_DETAIL_FAIL,
  GET_COMMENT_PENDING,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
  ADD_COMMENT_PENDING,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  DELETE_COMMENT_PENDING,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  NO_INTERENT,
  INTERENT,
  REPORT_COMMENT_PENDING,
  REPORT_COMMENT_SUCCESS,
  REPORT_COMMENT_FAIL,
  REPORT_EVENT_PENDING,
  REPORT_EVENT_SUCCESS,
  REPORT_EVENT_FAIL,
  UPDATE_COMMENT_PENDING,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL
} from '../actions/types';
// import * as types from '../actions/types';

const initialState = {
  pending: false,
  group: {},
  allEventsWithFilter: {},
  myEventsWithFilter: [],
  mySponsorEvents: [],
  initialListEvents: {},
  initialListData: {},
  shortcutForUser: {},
  addShortcute: {},
  updateShortcute: {},
  deleteShortcute: {},
  listComments: [],
  addComments: {},
  deleteComments: {},
  myEvents: {},
  mySponsorE: {},
  initEvents: [],
  shortcutsList: [],
  eventId: null,
  eventDetailData: null,
  status: null,
  error: null,
  internetProblem: false,
};
// const detailState = {
//   isLoading: true,
//   data: null,
//   status: null,
//   error: null,
// };
// export const activityDetail = (state = detailState, action) => {
//   const { payload } = action;
//   switch (action.type) {
//     case types.GET_ACTIVITY_DETAIL:
//       return { ...state, isLoading: true };
//     case types.ACTIVITY_DETAIL_SUCCESS:
//       return { ...state, data: payload, isLoading: false };
//     case types.ACTIVITY_DETAIL_FAIL:
//       return { ...state, data: null, status: action.data.status, error: true, isLoading: false };
//     default:
//       return state;
//   }
// };
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ACTIVITY_DETAIL:
      return { ...state, pending: true };
    case ACTIVITY_DETAIL_SUCCESS:
      return { ...state, eventDetailData: payload, pending: false };
    case ACTIVITY_DETAIL_FAIL:
      return { ...state, eventDetailData: null, pending: false };

    case CREATE_EVENT_PENDING:
      return { ...state, pending: true };

    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        pending: false,
        eventId: payload.eventId,
      };

    case CREATE_EVENT_FAIL:
      return {
        ...state,
        pending: false,
        eventId: null,
      };
    case GET_ALL_EVENTS_WITH_FILTER_PENDING:
      return { ...state, pending: true };

    case GET_ALL_EVENTS_WITH_FILTER_SUCCESS:
      return {
        ...state,
        pending: false,
        allEventsWithFilter: payload,
      };

    case GET_ALL_EVENTS_WITH_FILTER_FAIL:
      return {
        ...state,
        pending: false,
        allEventsWithFilter: {},
      };
    case GET_MY_EVENTS_WITH_FILTER_PENDING:
      return { ...state, pending: true };

    case GET_MY_EVENTS_WITH_FILTER_SUCCESS:
      return {
        ...state,
        pending: false,
        myEventsWithFilter: [...state.myEventsWithFilter, ...payload.events],
        myEvents: payload,
      };

    case GET_MY_EVENTS_WITH_FILTER_FAIL:
      return {
        ...state,
        pending: false,
        myEventsWithFilter: [],
        myEvents: {},
      };
    case GET_MY_SPONSOR_EVENTS_PENDING:
      return { ...state, pending: true };

    case GET_MY_SPONSOR_EVENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        mySponsorEvents: [...state.mySponsorEvents, ...payload.events],
        mySponsorE: payload,
      };

    case GET_MY_SPONSOR_EVENTS_FAIL:
      return {
        ...state,
        pending: false,
        mySponsorEvents: [],
        mySponsorE: {},
      };

    case GET_INIT_EVENT_PENDING:
      return { ...state, pending: true };

    case GET_INIT_EVENT_SUCCESS:
      return {
        ...state,
        pending: false,
        initialListEvents: payload,
      };

    case GET_INIT_EVENT_FAIL:
      return {
        ...state,
        pending: false,
        initialListEvents: {},
      };
    case GET_INIT_LIST_PENDING:
      return { ...state, pending: true };
    case GET_INIT_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        initialListData: payload,
        initEvents: [...state.initEvents, ...payload.events],
      };

    case GET_INIT_LIST_FAIL:
      return {
        ...state,
        pending: false,
        initialListData: {},
        initEvents: [],
      };
    case GET_INIT_EVENT_PENDING:
      return { ...state, pending: true };

    case GET_INIT_EVENT_SUCCESS:
      return {
        ...state,
        pending: false,
        initialListEvents: payload,
      };

    case GET_INIT_EVENT_FAIL:
      return {
        ...state,
        pending: false,
        initialListEvents: {},
      };

    case CANCEL_EVENT_PENDING:
      return { ...state, pending: true };

    case CANCEL_EVENT_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case CANCEL_EVENT_FAIL:
      return {
        ...state,
        pending: false,
      };
    case DELETE_EVENT_PENDING:
      return { ...state, pending: true };

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case DELETE_EVENT_FAIL:
      return {
        ...state,
        pending: false,
      };

    case UPDATE_EVENT_PENDING:
      return { ...state, pending: true };

    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case UPDATE_EVENT_FAIL:
      return {
        ...state,
        pending: false,
      };

    case REPORT_EVENT_PENDING:
      return { ...state, pending: true };

    case REPORT_EVENT_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case REPORT_EVENT_FAIL:
      return {
        ...state,
        pending: false,
      };
    case GET_FOR_USER_PENDING:
      return { ...state, pending: true, success: false };

    case GET_FOR_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        shortcutForUser: payload,
        success: true,
      };

    case GET_FOR_USER_FAIL:
      return {
        ...state,
        pending: false,
        shortcutForUser: null,
      };

    case UPDATE_SHORTCUTE_PENDING:
      return { ...state, pending: true, success: false };

    case UPDATE_SHORTCUTE_SUCCESS:
      return {
        ...state,
        pending: false,
        updateShortcute: payload,
        success: true,
      };

    case UPDATE_SHORTCUTE_FAIL:
      return {
        ...state,
        pending: false,
        updateShortcute: null,
      };

    case GET_SHORTCUTE_PENDING:
      return { ...state, pending: true, success: false };

    case GET_SHORTCUTE_SUCCESS:
      return {
        ...state,
        pending: false,
        shortcutsList: payload,
        success: true,
      };

    case GET_SHORTCUTE_FAIL:
      return {
        ...state,
        pending: false,
        shortcutsList: [],
      };

    case DELETE_SHORTCUTE_PENDING:
      return { ...state, pending: true, success: false };

    case DELETE_SHORTCUTE_SUCCESS:
      return {
        ...state,
        pending: false,
        deleteShortcute: payload,
        success: true,
      };

    case DELETE_SHORTCUTE_FAIL:
      return {
        ...state,
        pending: false,
        deleteShortcute: null,
      };

    case GET_COMMENT_PENDING:
      return { ...state, pending: true, success: false };

    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        pending: false,
        listComments: payload,
        success: true,
      };

    case GET_COMMENT_FAIL:
      return {
        ...state,
        pending: false,
        listComments: null,
      };

    case ADD_COMMENT_PENDING:
      return { ...state, pending: true, success: false };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
      };

    case ADD_COMMENT_FAIL:
      return {
        ...state,
        pending: false,
        addComments: null,
      };

    case DELETE_COMMENT_PENDING:
      return { ...state, pending: true, success: false };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        pending: false,
        deleteComments: payload,
        success: true,
      };

    case DELETE_COMMENT_FAIL:
      return {
        ...state,
        pending: false,
        deleteComments: null,
      };

    case REPORT_COMMENT_PENDING:
      return { ...state, pending: true, success: false };

    case REPORT_COMMENT_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case REPORT_COMMENT_FAIL:
      return {
        ...state,
        pending: false,
      };
    case UPDATE_COMMENT_PENDING:
      return { ...state, pending: true, success: false };

    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
      };

    case UPDATE_COMMENT_FAIL:
      return {
        ...state,
        pending: false,
      };
    
    case NO_INTERENT: {
      return {
        ...state,
        internetProblem: true,
      };
    }
    case INTERENT: {
      return {
        ...state,
        internetProblem: false,
      };
    }
    default:
      return state;
  }
};
