import React, { FC, useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";

import './GroupsTable.scss'
import { getGroups } from '../requests/groups.request'
import { getUsersUrl } from "../config/variables";
import { IGroup } from '../models/groups.model'
import { TStatus } from "../models/tasks.model";

const GroupsTable: FC = () => {
    const [groups, setGroups] = useState<IGroup[]>([])
    const getGroupsData = async () => {
        const groups = await getGroups(getUsersUrl)
        setGroups(groups)
    }
    useEffect(() => {
        getGroupsData()
    }, [])

    const getClassName = (status: TStatus) => {
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
        return `table__task__status__${ statusType } table__task__status__style`
    }

    return (
        <TableContainer className={'table'}>
            <Table style={{ minWidth: '940px' }}>
                <TableHead>
                    <TableRow className={'table__header'}>
                        <TableCell>Group</TableCell>
                        <TableCell>Task</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Last Download</TableCell>
                        <TableCell>Last Check</TableCell>
                        <TableCell>Expected Refresh Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        groups.map(group => group.tasks.map(task => (
                            <TableRow key={ task._id } className={'table__body'}>
                                <TableCell>{ group.name }</TableCell>
                                <TableCell style={{ minWidth: '150px' }}>{ task.name }</TableCell>
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
    );
};

export default GroupsTable;

