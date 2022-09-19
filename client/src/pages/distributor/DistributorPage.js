import React from 'react';
import { Outlet } from 'react-router-dom';

const DistributorPage = () => {
  return (
    <div className="my-3">
      <div className="w-100 my-3 text-center">
        <div className="flex">
          <h3>Distributor</h3>
          <p>Distributor list</p>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default DistributorPage;
