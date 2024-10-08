import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdHome, MdAccountBalanceWallet, MdAccountCircle, MdGroups } from 'react-icons/md';
import './voting.css';
import { AiOutlineClose } from 'react-icons/ai';
import logo from './images/idonk_no_bg_1.png';

const Sidebar = ({ toggleSidebar, setShowSidebar }) => {

    const [route, setRoute] = useState('/');
    const navigate = useNavigate();
    const path = useLocation().pathname;
    const fn = (val) => { navigate(`/app/${val}`); };

    useEffect(() => {
        if(path.includes('wallet')) setRoute('wallet');
        else if(path.includes('profile')) setRoute('profile');
        else if(path.includes('community')) setRoute('community');
        else setRoute('/');

        setShowSidebar(false);

    }, [path]);

    return (
        <div className="sidebar">
            <div className='sb-header'>
                <AiOutlineClose className='sb-icon cursor' onClick={()=>toggleSidebar()}/>
                <img src={logo} alt='idonk-logo' />
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
                <div className={`sb-main-li cursor ${route==='community'}`} onClick={()=>fn('community')}>
                    <div className='md-groups'><MdGroups className='sb-icon' /></div>
                    <span className='sb-main-txt'>Community</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;