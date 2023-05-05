import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../../app/store';

export type Monster = Record<Id, MonsterInfo>;

export type MonsterInfo = {
  name: string;
  image: string;
  supertype: string;
  hp?: number;
  types?: string[];
  subtypes?: string[];
};

export type Id = string;

export interface MonsterState {
  loading: boolean;
  selectedId: string;
  activeTags: string[];
  allMonsters: Monster;
  error: string;
  allSupertypes: string[];
  allTypes: string[];
  allSubtypes: string[];
}

const initialState: MonsterState = {
  loading: false,
  selectedId: '',
  activeTags: [],
  allMonsters: {},
  error: '',
  allSupertypes: ['Energy', 'Pokémon', 'Trainer'],
  allTypes: [
    "Colorless",
    "Darkness",
    "Dragon",
    "Fairy",
    "Fighting",
    "Fire",
    "Grass",
    "Lightning",
    "Metal",
    "Psychic",
    "Water"
  ],
  allSubtypes: [
    "ACE SPEC",
    "BREAK",
    "Baby",
    "Basic",
    "EX",
    "Eternamax",
    "Fusion Strike",
    "GX",
    "Goldenrod Game Corner",
    "Item",
    "LEGEND",
    "Level-Up",
    "MEGA",
    "Pokémon Tool",
    "Pokémon Tool F",
    "Prime",
    "Prism Star",
    "Radiant",
    "Rapid Strike",
    "Restored",
    "Rocket's Secret Machine",
    "SP",
    "Single Strike",
    "Special",
    "Stadium",
    "Stage 1",
    "Stage 2",
    "Star",
    "Supporter",
    "TAG TEAM",
    "Team Plasma",
    "Technical Machine",
    "Tera ex",
    "Ultra Beast",
    "V",
    "V-UNION",
    "VMAX",
    "VSTAR",
    "ex",
    "ex-3"
  ],
};

export const fetchMonsters = createAsyncThunk(
  'monster/fetchMonsters',
  async (params: { page: number; pageSize: number }) => {
    const { page, pageSize } = params;
    return (
      axios
        .get(
          `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}`
        )
        // data.data is not a typo. Monsters are an array assigned to a key named 'data' in the response.
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
    select: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
    selectTag: (
      state,
      action: PayloadAction<{ tag: string; isSelected: boolean }>
    ) => {
      const { tag, isSelected } = action.payload;

      let arr = state.activeTags;

      if (isSelected) {
        arr.push(tag);
      } else {
        arr = arr.filter((item) => {
          return item !== tag;
        });
      }
      state.activeTags = arr;
    },
  },
  // Codevolution on YouTube: https://tinyurl.com/ej9ztw9e
  extraReducers: (builder) => {
    builder.addCase(fetchMonsters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMonsters.fulfilled, (state, action) => {
      state.loading = false;
      state.allMonsters = Object.assign(state.allMonsters, action.payload); // Append new monsters to existing collection.
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
