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
} from '../../features/monsterSlice';

import Logo from '../../../src/images/logo.svg';

// Change types to a string to make it more convenient to display in MUI Data Grid.
export type MonsterRow = { id: Id } & { types: string } & Omit<
    MonsterInfo,
    'types'
  >;

const Roster: React.FunctionComponent = () => {
  const monsters = useAppSelector(monsterState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMonsters());
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
        types: monsters.allMonsters[key].types.join(', '),
      });
    });

    return arr;
  };

  const rows: GridRowsProp = fillDataGrid();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'hp', headerName: 'HP', width: 30 },
    { field: 'types', headerName: 'Energy', width: 200 },
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

Roster.displayName = 'Roster';

export default Roster;
