import React from 'react';
 import nodata from '../assets/2953962.jpg'
const Notfound = () => {
    return (
      <div className=" flex justify-center py-20">
        <img className="h-auto " src={nodata} />
      </div>
    );
};

export default Notfound;