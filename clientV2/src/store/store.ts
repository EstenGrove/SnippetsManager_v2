import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
// reducers
import listsReducer from "../features/lists/listsSlice";
import languagesReducer from "../features/languages/langsSlice";
import snippetsReducer from "../features/snippets/snippetsSlice";
import tagsReducer from "../features/tags/tagsSlice";
import favesReducer from "../features/favorites/favesSlice";
import currentUserReducer from "../features/currentUser/currentUserSlice";
import currentTeamReducer from "../features/currentTeam/currentTeamSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

const store = configureStore({
	reducer: {
		lists: listsReducer,
		langs: languagesReducer,
		tags: tagsReducer,
		faves: favesReducer,
		snippets: snippetsReducer,
		dashboard: dashboardReducer,
		currentUser: currentUserReducer,
		currentTeam: currentTeamReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// ALWAYS USE THIS VIA: const dispatch = useAppDispatch();
export const useAppDispatch: () => AppDispatch = useDispatch;

export { store };
