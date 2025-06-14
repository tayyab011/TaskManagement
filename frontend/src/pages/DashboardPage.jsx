import React from 'react';
import Layout from '../components/MasterLayout.jsx/Layout';
import FullscreenLoader from '../components/MasterLayout.jsx/FullscreenLoader';
import LoginPage from './LoginPage';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
    return (
      <Layout>
        {/*    <FullscreenLoader/> */}
        <hr />
        <div className='my-12'>
         <Dashboard/>
        </div>
      </Layout>
    );
};

export default DashboardPage;