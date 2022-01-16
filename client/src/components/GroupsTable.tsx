import React, { FC, useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, TableSortLabel, styled } from "@material-ui/core";

import './Groups.scss'
import { Group } from "../models/groups.model";
import { ScheduleType, StatusType } from "../models/items.model";

interface GroupsTableProps {
    filteredGroup: Group[],
    selectedGroup: string
}

const GroupsTable: FC<GroupsTableProps> = ({ selectedGroup, filteredGroup}) => {
    const [groupsCount, setGroupsCount] = useState<number>(0)
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [orderTime, setOrderTime] = useState<boolean>(true)
    const [orderABC, setOrderABC] = useState<boolean>(true)

    useEffect(() => {
        const [items] = filteredGroup.map(group => group.items.length)
        setGroupsCount(items)
    }, [filteredGroup])

    const getTime = (timestamp: string) => {
        const time = new Date(timestamp).toLocaleTimeString('en-US')
        const date = new Date(timestamp).toLocaleDateString('en-US')

        return date + ' ' + time
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {
            backgroundColor: '#1f1f04',
        },
    }));

    const getClassName = (status: StatusType) => {
        const className = 'table__item__status__'
        let statusType: StatusType
        switch (status) {
            case "created":
                statusType = 'created'
                break
            case "failed":
                statusType = 'failed'
                break
            default:
                statusType = 'warning'
        }

        return `${ className + statusType } ${ className + 'style' }`
    }

    function sortNamesForGroup() {
        filteredGroup.map(group => group.items.sort((a, b) => orderABC ?
            a.job_name.localeCompare(b.job_name) :
            b.job_name.localeCompare(a.job_name)
        ))
        setOrderABC(!orderABC)
    }

    function sortItemsForGroup (schedule: ScheduleType = 'last_schedule') {
        filteredGroup.map(group => group.items.sort((a, b) => orderTime ?
            new Date(schedule !== 'last_schedule' ? b.expected_schedule : b.last_schedule).getTime() -
            new Date(schedule !== 'last_schedule' ? a.expected_schedule : a.last_schedule).getTime() :
            new Date(schedule !== 'last_schedule' ? a.expected_schedule : a.last_schedule).getTime() -
            new Date(schedule !== 'last_schedule' ? b.expected_schedule : b.last_schedule).getTime()
        ))
        setOrderTime(!orderTime)
    }

    return (
        <>
            <p style={{ width: '40%', borderBottom: '#1f1f04 solid 4px', textAlign: 'center', paddingBottom: 10, fontWeight: 'bold', fontSize: 22 }}>
                { selectedGroup === '' ? 'All Groups' : selectedGroup }
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
                    <Table style={{ minWidth: '940px' }}>
                        <TableHead>
                            <TableRow className={'table__header'}>
                                { selectedGroup === '' && <TableCell>Group</TableCell> }
                                <TableCell>Status</TableCell>
                                <TableCell><TableSortLabel direction={orderABC ? 'asc' : 'desc'} onClick={() => sortNamesForGroup()}>
                                    Job Name
                                </TableSortLabel></TableCell>
                                <TableCell><TableSortLabel direction={orderTime ? 'asc' : 'desc'} onClick={() => sortItemsForGroup()}>
                                    Last Schedule
                                </TableSortLabel></TableCell>
                                <TableCell><TableSortLabel direction={orderTime ? 'asc' : 'desc'} onClick={() => sortItemsForGroup('expected_schedule')}>
                                    Expected Schedule
                                </TableSortLabel></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                filteredGroup
                                    .map(group => group.items
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(item => (
                                    <StyledTableRow key={ item.job_name } className={'table__body'}>
                                        { selectedGroup === '' && <TableCell>{ group.group }</TableCell> }
                                        <TableCell><p className={ getClassName('warning') }>Warning</p></TableCell>
                                        <TableCell className='table__body__item'>{ item.job_name }</TableCell>
                                        <TableCell className='table__body__item'>{ getTime( item.last_schedule) }</TableCell>
                                        <TableCell className='table__body__item'>{ getTime( item.expected_schedule) }</TableCell>
                                    </StyledTableRow>
                                )))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        </>
    );
};

export default GroupsTable;

