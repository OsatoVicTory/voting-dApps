import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdAccountBalanceWallet } from 'react-icons/md';
import './contentList.css';
import Content from './content';
import Contentlist from './content_list';
import PostModal from './postModal';
import { GiHamburgerMenu } from 'react-icons/gi';

const ContentList = ({ toggleSidebar }) => {

    const [search, setSearch] = useState('');
    const [modal, setModal] = useState(false);

    function closeModal() { setModal(false); }
    function openModal() { setModal(true); }
    function handleChange(e) { setSearch(e.target.value); };

    return (
        <div className='content-list'>
            <header>
                <GiHamburgerMenu className='content-hamburger cursor' onClick={()=>toggleSidebar()} />
                <div className="header-search">
                    <div className='hs'>
                        <AiOutlineSearch className={`hs-icon ${search?true:false}`} />
                        <input className={`hs-input ${search?true:false}`} placeholder='Search...' onChange={handleChange} />
                        <div className={`hs-search-button ${search?true:false} cursor`}>
                            <AiOutlineSearch className='hs-icon' />
                        </div>
                    </div>
                </div>
                <div className="header-wallet cursor">
                    <MdAccountBalanceWallet className='hw-icon' />
                    <span className='hw-txt'>Connect</span>
                </div>
            </header>
            <Routes>
                <Route path='/' element={<Contentlist openModal={openModal} />} />
                <Route path='/post/:id' element={<Content />} />
            </Routes>
            
            {modal && <PostModal closeModal={closeModal} />}
        </div>
    );
};

export default ContentList;