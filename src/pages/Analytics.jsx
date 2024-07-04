import React from 'react';
import Show from './Show';
import PurchaseAnalytics from './PurchaseAnalytics';
import UserAnalytics from './UserAnalytics';
import Back from './Back';

const Analytics = () => {
  return (
    <div>
     <Back />
     <Show />
     <PurchaseAnalytics />
     <UserAnalytics />
    </div>
  );
};

export default Analytics;
