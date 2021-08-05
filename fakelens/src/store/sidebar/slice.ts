import { createSlice } from '@reduxjs/toolkit';

export type Sidebar = 'Open' | 'Closed';

type SidebarState = {
  value: Sidebar;
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: { value: 'Closed' } as SidebarState,
  reducers: {
    toggle: (state) => {
      state.value = state.value === 'Open' ? 'Closed' : 'Open';
    },
  },
});

export const { toggle: toggleSidebar } = sidebarSlice.actions;
