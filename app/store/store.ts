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
import authReducer from '@/features/login/store/authSlice';
import optionReducer from '@/features/view/store/optionSlice';
import cartReducer from '@/features/cart/store/cartSlice';

const persistConfig = {
    key: 'root', // 저장될 키
    storage, // 사용할 스토리지
    whitelist: ['auth', 'cart'], // 유지할 리듀서 목록
};

const rootReducer = combineReducers({
    auth: authReducer,
    option: optionReducer,
    cart: cartReducer,
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