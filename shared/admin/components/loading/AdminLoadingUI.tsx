'use client';
import React from 'react';
import '@/shared/admin/styled/admin_common.css';
import  {  ClimbingBoxLoader  }  from  "react-spinners" ;

interface IsLoadingProps {
    isLoading: boolean;
}

const AdminLoadingUI = ({isLoading}: IsLoadingProps) => {
    return (
        <div className='admin-loading'>
            <ClimbingBoxLoader 
                color={"#ffffff"}
                loading={isLoading}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default AdminLoadingUI;