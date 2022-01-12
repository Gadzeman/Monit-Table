import { IGroup } from "./groups.model";

export interface GroupsNavbarProps {
    groupsName: string[],
    setSelectedGroup: (name: string) => void,
    filterGroupByName: (name: string) => void
}

export interface GroupsTableProps {
    filteredGroup: IGroup[],
    selectedGroup: string
}
