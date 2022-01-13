import React, { FC } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";

import './Groups.scss'
import { GroupsTableProps } from "../models/props.model";

const GroupsTable: FC<GroupsTableProps> = ({ selectedGroup, filteredGroup }) => {
    const getTime = (time: number) => {
        const date = new Date(time * 1000)
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        const days = String(date.getDate()).padStart(2, '0')
        const month = months[date.getMonth()]

        return days + ' ' + month + ' ' + hours + ':' + minutes + ':' + seconds
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
                            <TableCell>Job Name</TableCell>
                            <TableCell>Last Schedule</TableCell>
                            <TableCell>Expected Schedule</TableCell>
                            <TableCell>Duration Millis</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            filteredGroup.map(group => group.items.map(item => (
                                <TableRow key={ item.job_name } className={'table__body'}>
                                    { selectedGroup === '' && <TableCell>{ group.group }</TableCell> }
                                    <TableCell style={{ minWidth: '100px', width: '200px' }}>{ item.job_name }</TableCell>
                                    <TableCell>{ getTime( parseInt(item.last_schedule) ) }</TableCell>
                                    <TableCell>{ getTime( parseInt(item.expected_schedule) ) }</TableCell>
                                    <TableCell>{ item.duration_millis }</TableCell>
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

