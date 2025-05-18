import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Promise-based localStorage
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import routeKeyReducer from './slices/routeKeySlice';
import localeReducer from './slices/localeSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'theme', 'locale'],
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    auth: authReducer,
    theme: themeReducer,
    routeKey: routeKeyReducer,
    locale: localeReducer,
}));

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

