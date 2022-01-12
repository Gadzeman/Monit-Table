import React, { FC } from 'react';

import './Groups.scss'
import { GroupsNavbarProps } from "../models/props.model";

const GroupsNavbar: FC<GroupsNavbarProps> = ({ groupsName, setSelectedGroup, filterGroupByName }) => {
    const handleGroup = (group: string) => {
        setSelectedGroup(group)
        filterGroupByName(group)
    }

    return (
        <div className='navbar'>
            <p className='navbar__item' onClick={() => handleGroup('')}>All</p>
            {
                groupsName.map(group =>
                    <p className='navbar__item' onClick={() => handleGroup(group)} key={ group }>{ group }</p>
                )
            }
        </div>
    );
};

export default GroupsNavbar;
