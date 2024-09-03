import React from 'react';
import Sidebar from '../main/Sidebar';
import TopPanel from '../main/TopPanel';
import { Spacer } from '@nextui-org/react';

const AdminMain = ({ page: Page }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed top-0 bottom-0 left-0 w-80 h-screen bg-gray-100">
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 ml-80 pl-0">
        <TopPanel />
        <div className="pt-4 min-h-svh">
          <Page />
        </div>
      </div>

    </div>
  );
};

export default AdminMain;
