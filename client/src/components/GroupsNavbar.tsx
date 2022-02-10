import React, { FC } from 'react';

import './Groups.scss';

interface GroupsNavbarProps {
  groupsName: string[];
  setSelectedGroup: (name: string) => void;
  filterGroupByName: (name: string) => void;
}

const GroupsNavbar: FC<GroupsNavbarProps> = ({
  groupsName,
  setSelectedGroup,
  filterGroupByName,
}) => {
  const handleGroup = (group: string) => {
    setSelectedGroup(group);
    filterGroupByName(group);
  };

  return (
    <div className="navbar">
      <p className="navbar__item" onClick={() => handleGroup('')}>
        All Groups
      </p>
      {groupsName.map((group) => (
        <p
          className="navbar__item"
          onClick={() => handleGroup(group)}
          key={group}
        >
          {group}
        </p>
      ))}
    </div>
  );
};

export default GroupsNavbar;
