// /* eslint-disable no-undef */
// import { configureStore } from '@reduxjs/toolkit';

// import playerReducer from './features/playerSlice';

// import { shazamCoreApi } from './services/shazamCore';

// export const store = configureStore({
//   reducer: {
//     [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
//     player: playerReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware),
// });
import { configureStore } from "@reduxjs/toolkit";
import { shazamApi } from "./services/shazamApi7";
import playerReducer from "./features/playerSlice";

export const store = configureStore({
  reducer: {
    [shazamApi.reducerPath]: shazamApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamApi.middleware),
});
