import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
// reducers
import listsReducer from "../features/lists/listsSlice";
import languagesReducer from "../features/languages/langsSlice";
import currentUserReducer from "../features/currentUser/currentUserSlice";
import currentTeamReducer from "../features/currentTeam/currentTeamSlice";

const store = configureStore({
	reducer: {
		lists: listsReducer,
		langs: languagesReducer,
		currentUser: currentUserReducer,
		currentTeam: currentTeamReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export { store };
