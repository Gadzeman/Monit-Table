import React, { FC, useEffect, useState } from 'react';

import GroupsNavbar from "./GroupsNavbar";
import GroupsTable from "./GroupsTable";
import { Group } from '../models/groups.model'
import { getGroups } from '../requests/groups.request'
import { getGroupsUrl } from "../config/variables";

const Groups: FC = () => {
    const [groups, setGroups] = useState<Group[]>([])
    const [groupsName, setGroupsName] = useState<string[]>([])
    const [selectedGroup, setSelectedGroup] = useState<string>('')
    const [filteredGroup, setFilteredGroup] = useState<Group[]>([])

    useEffect(() => {
        getGroupsData()
    }, [])

    const getGroupsData = async () => {
        const groups = await getGroups(getGroupsUrl)
        const groupsName = groups.map(group => group.group)
        setGroups(groups)
        setFilteredGroup(groups)
        setGroupsName(groupsName)
    }

    const filterGroupByName = (name: string) => {
        const filteredGroup = groups.filter(group => group.group === name)
        setFilteredGroup(name ? filteredGroup : groups)
    }
    console.log(groups)

    return (
        <div className='groups'>
            {
                groups.length === 0
                    ?
                    <h3 style={{ marginTop: 30 }}>Loading...</h3>
                    :
                    <>
                        <GroupsNavbar
                            groupsName={groupsName}
                            setSelectedGroup={setSelectedGroup}
                            filterGroupByName={filterGroupByName}
                        />
                        <GroupsTable
                            filteredGroup={filteredGroup}
                            selectedGroup={selectedGroup}
                        />
                    </>
            }
        </div>
    );
};

export default Groups;
