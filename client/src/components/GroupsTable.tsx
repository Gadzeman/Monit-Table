import React, { FC } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";

import './Groups.scss'
import { TStatus } from "../models/tasks.model";
import { GroupsTableProps } from "../models/props.model";

const GroupsTable: FC<GroupsTableProps> = ({ selectedGroup, filteredGroup }) => {
    const getClassName = (status: TStatus) => {
        const className = 'table__task__status__'
        let statusType: TStatus
        switch (status) {
            case "created":
                statusType = 'created'
                break
            case "failed":
                statusType = 'failed'
                break
            default:
                statusType = 'creating'
        }
        return `${ className + statusType } ${ className + 'style' }`
    }

    return (
        <>
            <p style={{ width: '40%', borderBottom: 'white solid 1px', textAlign: 'center', paddingBottom: 10 }}>
                { selectedGroup === '' ? 'All' : selectedGroup }
            </p>
            <TableContainer className={'table'}>
                <Table style={{ minWidth: '940px' }}>
                    <TableHead>
                        <TableRow className={'table__header'}>
                            { selectedGroup === '' && <TableCell>Group</TableCell> }
                            <TableCell>Task</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Last Download</TableCell>
                            <TableCell>Last Check</TableCell>
                            <TableCell>Expected Refresh Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            filteredGroup.map(group => group.tasks.map(task => (
                                <TableRow key={ task._id } className={'table__body'}>
                                    { selectedGroup === '' && <TableCell>{ group.name }</TableCell> }
                                    <TableCell style={{ minWidth: '100px', width: '200px' }}>{ task.name }</TableCell>
                                    <TableCell><p className={ getClassName(task.status) }>
                                        { task.status === 'created' ? 'success' : task.status }
                                    </p></TableCell>
                                    <TableCell>{ task.last_download }</TableCell>
                                    <TableCell>{ task.last_check === null ? '...' : task.last_check }</TableCell>
                                    <TableCell>{ task.expected_refresh_date === null ? '...' : task.expected_refresh_date }</TableCell>
                                </TableRow>
                            )))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default GroupsTable;

