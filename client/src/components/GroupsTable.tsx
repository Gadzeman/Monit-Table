import React, { FC } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, styled } from "@material-ui/core";

import './Groups.scss'
import { Group } from "../models/groups.model";
import { StatusType } from "../models/items.model";

interface GroupsTableProps {
    groups: Group[],
    filteredGroup: Group[],
    selectedGroup: string
}

const GroupsTable: FC<GroupsTableProps> = ({ selectedGroup, filteredGroup, groups}) => {
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

    const getTime = (timestamp: string) => {
        const time = new Date(timestamp).toLocaleTimeString('en-US')
        const date = new Date(timestamp).toLocaleDateString('en-US')

        return date + ' ' + time
    }

    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {
            backgroundColor: '#1f1f04',
        },
    }));

    return (
        <>
            <p style={{ width: '40%', borderBottom: 'white solid 1px', textAlign: 'center', paddingBottom: 10, fontWeight: 'bold', fontSize: 22 }}>
                { selectedGroup === '' ? 'All Groups' : selectedGroup }
            </p>
            <TableContainer className={'table'}>
                <Table style={{ minWidth: '940px' }}>
                    <TableHead>
                        <TableRow className={'table__header'}>
                            { selectedGroup === '' && <TableCell>Group</TableCell> }
                            <TableCell>Status</TableCell>
                            <TableCell>Job Name</TableCell>
                            <TableCell>Last Schedule</TableCell>
                            <TableCell>Expected Schedule</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            filteredGroup.map(group => group.items.map(item => (
                                <StyledTableRow key={ item.job_name } className={'table__body'}>
                                    { selectedGroup === '' && <TableCell>{ group.group }</TableCell> }
                                    <TableCell><p className={ getClassName('warning') }>Warning</p></TableCell>
                                    <TableCell style={{ minWidth: '100px', width: '300px' }}>{ item.job_name }</TableCell>
                                    <TableCell>{ getTime( item.last_schedule) }</TableCell>
                                    <TableCell>{ getTime( item.expected_schedule) }</TableCell>
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

