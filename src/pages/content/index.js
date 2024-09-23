import { useState } from 'react';
import { Contract, BrowserProvider } from "ethers";
import { Routes, Route } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdAccountBalanceWallet } from 'react-icons/md';
import './contentList.css';
import Content from './content';
import Contentlist from './contentList';
import PostModal from './postModal';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setContract } from '../../store/contract';
import abi from '../../contractABI.json';
import { CONTRACT_ADDRESS } from '../../config';
import { setMessage } from '../../store/message';
import { setMessageFn } from '../utils';

const ContentList = ({ toggleSidebar }) => {

    const [search, setSearch] = useState('');
    const [modal, setModal] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const contract = useSelector(state => state.contract);

    const dispatch = useDispatch();
    const setContractData = bindActionCreators(setContract, dispatch);
    const setMessageData = bindActionCreators(setMessage, dispatch);

    async function loadContract() {
        const contractAddress = CONTRACT_ADDRESS;
        // Ensure window.ethereum is available
        if (!window.ethereum) {
          throw new Error("No crypto wallet found. Please install MetaMask.");
        }
        setConnecting(true);
        const provider = await new BrowserProvider(window.ethereum);
        const signer_val = await provider.getSigner();
        const signerAddress = await signer_val.getAddress();
        const contractInstance = await new Contract(contractAddress, abi, signer_val);
        const userPoints = await contractInstance.getPoints(signerAddress);
        const userTasks = await contractInstance.getTasks(signerAddress);
        // to get token amount as per 1E18 use getTokenAmount function from util
        // setSigner(signer);
        // setUser(signerAddress);
        setContractData({ ...contractInstance, address: signerAddress });
        setMessageFn(setMessageData, { status: 'success', message: 'Welcome '+signerAddress });
        setConnecting(false);
    };
    
    
    function connectWallet() {
        // needed
        // if(user) return setMessageFn(setMessage, 'Wallet active, refresh page to connect new wallet');
        
        if (!window.ethereum) return setMessageFn(setMessage, 'Install Metamask extension!');

        loadContract().catch(error => {
            console.error('Error connecting wallet', error);
            setMessageFn(setMessageData, { status: 'error', message: 'Error connecting wallet' });
            setConnecting(false);
        });
    };

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
                <div className="header-wallet cursor" onClick={() => connectWallet()}>
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