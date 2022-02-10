import React, { FC, useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
  styled,
} from '@material-ui/core';

import './Groups.scss';
import { Group } from '../models/groups.model';
import { ScheduleType } from '../models/items.model';

interface GroupsTableProps {
  filteredGroup: Group[];
  selectedGroup: string;
}

const GroupsTable: FC<GroupsTableProps> = ({
  selectedGroup,
  filteredGroup,
}) => {
  const [groupsCount, setGroupsCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [orderTime, setOrderTime] = useState<boolean>(true);
  const [orderABC, setOrderABC] = useState<boolean>(true);

  useEffect(() => {
    const [items] = filteredGroup.map((group) => group.items.length);
    setGroupsCount(items);
  }, [filteredGroup]);

  function sortNamesForGroup() {
    filteredGroup.map((group) =>
      group.items.sort((a, b) =>
        orderABC
          ? a.job_name.localeCompare(b.job_name)
          : b.job_name.localeCompare(a.job_name),
      ),
    );
    setOrderABC(!orderABC);
  }

  function sortItemsForGroup(schedule: ScheduleType = 'last_schedule') {
    filteredGroup.map((group) =>
      group.items.sort((a, b) =>
        orderTime
          ? new Date(b[schedule]).getTime() - new Date(a[schedule]).getTime()
          : new Date(a[schedule]).getTime() - new Date(b[schedule]).getTime(),
      ),
    );
    setOrderTime(!orderTime);
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getTime = (timestamp: string) => {
    const time = new Date(timestamp).toLocaleTimeString('en-US', {
      timeZone: 'America/New_York',
    });
    const date = new Date(timestamp).toLocaleDateString('en-US', {
      timeZone: 'America/New_York',
    });

    return date + ' ' + time;
  };

  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#1f1f04',
    },
  }));

  const getDetermineStatus = (last: string, prev: string) => {
    const className = 'table__item__status__';
    const style = 'table__item__status__style';

    if (last <= prev || Number(last) - Number(prev) < 1000 || !prev) {
      return {
        className: `${className + 'success'} ${style}`,
        statusName: 'Success',
      };
    }
    if (Number(last) - Number(prev) < 3600000) {
      return {
        className: `${className + 'warning'} ${style}`,
        statusName: 'Warning',
      };
    }
    return {
      className: `${className + 'failed'} ${style}`,
      statusName: 'Failed',
    };
  };

  return (
    <>
      <p
        style={{
          width: '40%',
          borderBottom: '#1f1f04 solid 4px',
          textAlign: 'center',
          paddingBottom: 10,
          fontWeight: 'bold',
          fontSize: 22,
        }}
      >
        {selectedGroup === '' ? 'All Groups' : selectedGroup}
      </p>
      <TablePagination
        style={{ color: '#e1c676' }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={groupsCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TableContainer className={'table'}>
        <Table style={{ minWidth: '1045px' }}>
          <TableHead>
            <TableRow className={'table__header'}>
              {selectedGroup === '' && <TableCell>Group</TableCell>}
              <TableCell>Status</TableCell>
              <TableCell>
                <TableSortLabel
                  direction={orderABC ? 'asc' : 'desc'}
                  onClick={() => sortNamesForGroup()}
                >
                  Job Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  direction={orderTime ? 'asc' : 'desc'}
                  onClick={() => sortItemsForGroup()}
                >
                  Last Schedule
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  direction={orderTime ? 'asc' : 'desc'}
                  onClick={() => sortItemsForGroup('previous_schedule')}
                >
                  Previous Schedule
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  direction={orderTime ? 'asc' : 'desc'}
                  onClick={() => sortItemsForGroup('expected_schedule')}
                >
                  Expected Schedule
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGroup.map((group) =>
              group.items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <StyledTableRow key={item.job_name} className={'table__body'}>
                    {selectedGroup === '' && (
                      <TableCell>{group.group}</TableCell>
                    )}
                    <TableCell>
                      <p
                        className={
                          getDetermineStatus(
                            item.last_schedule,
                            item.previous_schedule,
                          ).className
                        }
                      >
                        {
                          getDetermineStatus(
                            item.last_schedule,
                            item.previous_schedule,
                          ).statusName
                        }
                      </p>
                    </TableCell>
                    <TableCell className="table__body__item">
                      {item.job_name}
                    </TableCell>
                    <TableCell className="table__body__item">
                      {getTime(item.last_schedule)}
                    </TableCell>
                    <TableCell className="table__body__item">
                      {item.previous_schedule
                        ? getTime(item.previous_schedule)
                        : ''}
                    </TableCell>
                    <TableCell className="table__body__item">
                      {getTime(item.expected_schedule)}
                    </TableCell>
                  </StyledTableRow>
                )),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GroupsTable;
