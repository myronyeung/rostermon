import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../app/store';

export type Monster = Record<Id, MonsterInfo>;

export type MonsterInfo = {
  name: string;
  hp: number;
  types: string[];
  image: string;
};

export type Id = string;

export interface monsterState {
  loading: boolean;
  selectedId: number;
  allMonsters: Monster;
  error: string;
}

const initialState: monsterState = {
  loading: false,
  selectedId: 0,
  allMonsters: {},
  error: '',
};

export const fetchMonsters = createAsyncThunk(
  'monster/fetchMonsters',
  async () => {
    return (
      axios
        .get('https://api.pokemontcg.io/v2/cards?page=1&pageSize=250')
        // data.data is not a typo. Monsters are an array assigned to a key named 'data' in response.
        .then((response: any) =>
          response.data.data.reduce((acc: Monster, monster: any): Monster => {
            acc[monster.id] = { ...monster, image: monster.images.large };
            return acc;
          }, {})
        )
    );
  }
);

export const monsterSlice = createSlice({
  name: 'monster',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // createSlice automatically generates Action Creators
    // Use the PayloadAction type to declare the contents of `action.payload`
    select: (state, action: PayloadAction<number>) => {
      state.selectedId = action.payload;
    },
  },
  // Codevolution on YouTube: https://tinyurl.com/ej9ztw9e
  extraReducers: (builder) => {
    builder.addCase(fetchMonsters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMonsters.fulfilled, (state, action) => {
      state.loading = false;
      state.allMonsters = action.payload;
      state.error = '';
    });
    builder.addCase(fetchMonsters.rejected, (state, action) => {
      state.loading = false;
      state.allMonsters = {};
      state.error = action.error.message || 'Unknown error occurred.';
    });
  },
});

export const monsterActions = monsterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const monsterState = (state: RootState) => state.monster;

export default monsterSlice.reducer;
