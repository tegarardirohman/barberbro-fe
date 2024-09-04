import React from 'react';
import Sidebar from '../components/main/Sidebar';
import MainContent from '../components/main/MainContent';
import TopPanel from '../components/main/TopPanel';
import { Spacer } from '@nextui-org/react';

const StaffMain = ({ page: Page }) => {
  return (
    <div className="flex">
      {/* SideBarCustomer */}
      <div className="fixed top-0 bottom-0 left-0 w-80 h-screen bg-gray-100">
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 ml-80 pl-4">
        <TopPanel />
        <div className="pt-4 min-h-svh">
          <Page />
        </div>
      </div>

    </div>
  );
};

export default StaffMain;
