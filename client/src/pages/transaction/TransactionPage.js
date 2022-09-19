import React from 'react';
import { Outlet } from 'react-router-dom';

const TransactionPage = () => {
  return (
    <div className="my-3">
      <div className="w-100 my-3 text-center">
        <div className="flex">
          <h3>Transaction</h3>
          <p>Transaction list</p>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default TransactionPage;
