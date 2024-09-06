import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdHome, MdAccountBalanceWallet, MdAccountCircle } from 'react-icons/md';
import './voting.css';
import { AiOutlineClose } from 'react-icons/ai';

const Sidebar = ({ toggleSidebar, setShowSidebar }) => {

    const [route, setRoute] = useState('/');
    const navigate = useNavigate();
    const path = useLocation().pathname;
    const fn = (val) => { navigate(`/${val}`); };

    useEffect(() => {
        if(path.includes('wallet')) setRoute('wallet');
        else if(path.includes('profile')) setRoute('profile');
        else setRoute('/');

        setShowSidebar(false);

    }, [path]);

    return (
        <div className="sidebar">
            <div className='sb-header'>
                <AiOutlineClose className='sb-icon cursor' onClick={()=>toggleSidebar()}/>
                <h4>stack overvote</h4>
            </div>
            <div className='sb-main'>
                <div className={`sb-main-li cursor ${route==='/'}`} onClick={()=>fn('')}>
                    <MdHome className='sb-icon' />
                    <span className='sb-main-txt'>Home</span>
                </div>
                <div className={`sb-main-li cursor ${route==='wallet'}`} onClick={()=>fn('wallet')}>
                    <MdAccountBalanceWallet className='sb-icon' />
                    <span className='sb-main-txt'>Wallet</span>
                </div>
                <div className={`sb-main-li cursor ${route==='profile'}`} onClick={()=>fn('profile')}>
                    <MdAccountCircle className='sb-icon' />
                    <span className='sb-main-txt'>Profile</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;