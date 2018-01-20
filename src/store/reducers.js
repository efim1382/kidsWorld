import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { api as authApi } from 'containers/Auth';
import { reducers as advertsReducer } from 'containers/Profile/Adverts';
import { reducers as usersReducer } from 'containers/User';
import { reducers as notificationReducer } from 'components/Notification';
import reviewsApi from './reviews';

export const makeRootReducer = asyncReducers => combineReducers({
  auth: combineReducers({
    ...authApi.reducers,
  }),
  users: usersReducer,
  adverts: advertsReducer,
  notification: notificationReducer,
  reviews: combineReducers({
    ...reviewsApi.reducers,
  }),
  routing: routerReducer,
  ...asyncReducers,
});

export default makeRootReducer;
