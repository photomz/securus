import { RootState } from '../createStore';
import { Sidebar } from './slice';

export const selectSidebar = (state: RootState): Sidebar => state.sidebar.value;
