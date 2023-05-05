import React, { useEffect } from 'react';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridEventListener,
} from '@mui/x-data-grid';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  MonsterInfo,
  Id,
  monsterState,
  monsterActions,
  fetchMonsters,
} from './monsterSlice';

import Logo from '../../../src/images/logo.svg';

// Change types to a string to make it more convenient to display in MUI Data Grid.
export type MonsterRow = { id: Id } & MonsterInfo;

const MonsterRoster: React.FunctionComponent = () => {
  const monsters = useAppSelector(monsterState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMonsters({ page: 1, pageSize: 100 }));
  }, []);

  const handleEvent: GridEventListener<'rowClick'> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details // GridCallbackDetails
  ) => {
    dispatch(monsterActions.select(params.row.id));
  };

  const fillDataGrid = () => {
    const arr: MonsterRow[] = [];

    Object.entries(monsters.allMonsters).forEach(([key, value]) => {
      arr.push({
        ...value,
        id: key,
      });
    });

    return arr;
  };

  const rows: GridRowsProp = fillDataGrid();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'hp', headerName: 'HP', width: 30 },
    { field: 'supertype', headerName: 'Supertype', width: 150 },
    { field: 'types', headerName: 'Types', width: 200 },
    { field: 'subtypes', headerName: 'Subtypes', width: 200 },
  ];

  return (
    <div className="roster">
      {monsters.loading && (
        <div>
          <img
            src={Logo}
            width="30"
            height="30"
            className="spinner"
            alt="Loading monsters..."
          />
        </div>
      )}
      {!monsters.loading && monsters.error && (
        <div>Error: {monsters.error}</div>
      )}
      {!monsters.loading && monsters.allMonsters ? (
        <DataGrid rows={rows} columns={columns} onRowClick={handleEvent} />
      ) : null}
    </div>
  );
};

MonsterRoster.displayName = 'MonsterRoster';

export default MonsterRoster;
