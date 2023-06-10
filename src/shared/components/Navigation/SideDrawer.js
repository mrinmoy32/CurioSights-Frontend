import React from 'react';
import  ReactDOM from 'react-dom';

import './SideDrawer.css';

const SideDrawer = props =>{

    const content = <aside className='side-drawer'>{props.children}</aside>;
    //creating react portal
    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'))
    
};

export default SideDrawer;