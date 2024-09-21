import { useState } from 'react';
import '../content/contentList.css';
import './home.css';
import { Route, Routes } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdAccountBalanceWallet } from 'react-icons/md';
import CommunityPage from './community';
import CommunityHome from './home';
import CommunityCreate from './create';

const Community = ({ toggleSidebar }) => {

    const [search, setSearch] = useState('');
    function handleChange(e) { setSearch(e.target.value); };

    return (
        <div className="Community">
            <header>
                <GiHamburgerMenu className='community- content-hamburger cursor' onClick={()=>toggleSidebar()} />
                <div className="community- header-search">
                    <div className='hs'>
                        <AiOutlineSearch className={`community- hs-icon ${search?true:false}`} />
                        <input className={`community- hs-input ${search?true:false}`} 
                        placeholder='Search communities...' onChange={handleChange} />
                        <div className={`community- hs-search-button ${search?true:false} cursor`}>
                            <AiOutlineSearch className='community- hs-icon' />
                        </div>
                    </div>
                </div>
                <div className="community- header-wallet cursor">
                    <MdAccountBalanceWallet className='community- hw-icon' />
                    <span className='community- hw-txt'>Connect</span>
                </div>
            </header>

            <Routes>
                <Route path='/' element={<CommunityHome />} />
                <Route path='/create' element={<CommunityCreate />} />
                <Route path='/page/:id' element={<CommunityPage />} />
            </Routes>

        </div>
    );
};

export default Community;