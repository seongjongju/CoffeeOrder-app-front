import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { 
    persistReducer, 
    persistStore, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import authReducer from '@/store/auth/authSlice';
import optionReducer from '@/store/view/optionSlice';
import cartReducer from '@/store/cart/cartSlice';
import alertReducer from '@/store/alert/alertSlice';

const persistConfig = {
    key: 'root', 
    storage, 
    whitelist: ['auth', 'cart', 'alert'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    option: optionReducer,
    cart: cartReducer,
    alert: alertReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER,
            ],
        },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch