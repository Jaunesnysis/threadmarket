import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";

const loadState = (): { favorites: { ids: string[] } } | undefined => {
  try {
    const serialized = localStorage.getItem("threadmarket-favorites");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state: { favorites: { ids: string[] } }) => {
  try {
    localStorage.setItem("threadmarket-favorites", JSON.stringify(state));
  } catch {
    // ignore
  }
};

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState({
    favorites: store.getState().favorites,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
