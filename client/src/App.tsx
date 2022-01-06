import React, {FC} from 'react';
import './App.scss';
import GroupsTable from './components/GroupsTable'

const App: FC = () => {
    return (
        <div className="app">
            <GroupsTable />
        </div>
    )
}

export default App;
