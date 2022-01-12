import React, { FC, useEffect, useState } from 'react';

import GroupsNavbar from "./GroupsNavbar";
import GroupsTable from "./GroupsTable";
import { getGroups } from '../requests/groups.request'
import { getUsersUrl } from "../config/variables";
import { IGroup } from '../models/groups.model'

const Groups: FC = () => {
    const [groups, setGroups] = useState<IGroup[]>([])
    const [groupsName, setGroupsName] = useState<string[]>([])
    const [selectedGroup, setSelectedGroup] = useState<string>('')
    const [filteredGroup, setFilteredGroup] = useState<IGroup[]>([])

    const getGroupsData = async () => {
        const groups = await getGroups(getUsersUrl)
        const groupsName = groups.map(group => group.name)
        setGroups(groups)
        setFilteredGroup(groups)
        setGroupsName(groupsName)
    }

    useEffect(() => {
        getGroupsData()
    }, [])

    const filterGroupByName = (name: string) => {
        const filteredGroup = groups.filter(group => group.name === name)
        if (!name) {
            setFilteredGroup(groups)

            return
        }
        setFilteredGroup(filteredGroup)
    }

    return (
        <div className='groups'>
            {
                groups.length === 0
                    ?
                    <h3 style={{ marginTop: 30 }}>Loading...</h3>
                    :
                    <>
                        <GroupsNavbar groupsName={groupsName} setSelectedGroup={setSelectedGroup} filterGroupByName={filterGroupByName} />
                        <GroupsTable selectedGroup={selectedGroup} filteredGroup={filteredGroup} />
                    </>
            }
        </div>
    );
};

export default Groups;
