import React, { FC, useEffect, useState } from 'react';

import GroupsNavbar from './GroupsNavbar';
import GroupsTable from './GroupsTable';
import { Group } from '../../models/group.model';
import { getGroups } from '../../requests/groups.request';
import { getGroupsApi } from '../../config/variables';

const Groups: FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupsName, setGroupsName] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [serverError, setServerError] = useState<boolean>(false);
  const [filteredGroup, setFilteredGroup] = useState<Group[]>([]);

  useEffect(() => {
    getGroupsData();
  }, []);

  const getGroupsData = async () => {
    try {
      const groups = await getGroups(getGroupsApi);
      const groupsName = groups.map((group) => group.group);
      setGroups(groups);
      setFilteredGroup(groups);
      setGroupsName(groupsName);
    } catch (e) {
      setServerError(true);
    }
  };

  const filterGroupByName = (name: string) => {
    const filteredGroup = groups.filter((group) => group.group === name);
    setFilteredGroup(name ? filteredGroup : groups);
  };

  return (
    <div className="groups">
      {serverError ? (
        <h3 style={{ marginTop: 30 }}>500 Internal Server Error</h3>
      ) : groups.length === 0 ? (
        <h3 style={{ marginTop: 30 }}>Loading...</h3>
      ) : (
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
      )}
    </div>
  );
};

export default Groups;
