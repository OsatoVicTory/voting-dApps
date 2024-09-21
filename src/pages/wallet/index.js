import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import './wallet.css';
import { FaDollarSign, FaArrowDown } from 'react-icons/fa';
import { BsFillSendFill } from 'react-icons/bs';
import { TOKEN_NAME } from '../../config';
import WalletModal from './modal';

const Wallet = ({ toggleSidebar }) => {

    const amount = 12.98;
    const [modalType, setModalType] = useState(null);

    const history = [
    ...Array(5).fill({type:'Sent',amount:150,address:'0x5274tygr8e7wg278041g1w078',time:'16 Sep 2024, 12:15 p.m'}),
    ...Array(5).fill({type:'Received',amount:20050,address:'0x5274tygr8e7wg278041g1w078',time:'16 Sep 2024, 11:15 a.m'}),
    ];

    function formatAmount(amount) {
        if(amount >= 1E9) return (amount / 1E9).toFixed(2) + 'B';
        else if(amount >= 1E6) return (amount / 1E6).toFixed(2) + 'M';
        else if(amount >= 1E3) return (amount / 1E5).toFixed(2) + 'K';
        else return amount;
    };
    
    return (
        <div className='Wallet'>
            <div className='wallet-header'>
                <GiHamburgerMenu className='wh-hamburger cursor' onClick={()=>toggleSidebar()} />
                <h2>Wallet</h2>
            </div>
            <div className='wallet-main-wrapper'>
                <div className='wallet-details'>
                    <h4>Total Balance</h4>
                    <h1>{formatAmount(amount) + ' ' + TOKEN_NAME}</h1>
                </div>
                <div className='wallet-main'>
                    <div className='wallet-actions'>
                        <div>
                            <div className='wallet-action' onClick={() => setModalType('Receive')}>
                                <FaArrowDown className='wa-icons' />
                                <span>Receive</span>
                            </div>
                            <div className='wallet-action' onClick={() => setModalType('Send')}>
                                <BsFillSendFill className='wa-icons' />
                                <span>Send</span>
                            </div>
                            <div className='wallet-action' onClick={() => setModalType('Buy')}>
                                <FaDollarSign className='wa-icons' />
                                <span>Buy</span>
                            </div>
                        </div>
                    </div>
                    <div className='wallet-history'>
                        <div className='wh'>
                            <h4>Transaction history</h4>
                        </div>
                        <ul>
                            {history.map((val, idx) => (
                                <li key={`hist-${idx}`} className='wh-li'>
                                    <div className='whl-img'>
                                        {val.send ?
                                            <BsFillSendFill className='whl-icon' /> :
                                            <FaArrowDown className='whl-icon' /> 
                                        }
                                    </div>
                                    <div className='whl-txt'>
                                        <span className='whl-type'>{val.type}</span>
                                        <span className='whl-address'>
                                            {(val.type === 'Received' ? 'From: ' : 'To: ') + val.address}
                                        </span>
                                    </div>
                                    <div className='whl-det'>
                                        <span className='whl-amount'>{val.amount + ' ' + TOKEN_NAME}</span>
                                        <span className='whl-time'>{val.time}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {modalType && <WalletModal modalType={modalType} closeModal={() => setModalType(null)} />}
        </div>
    );
};

export default Wallet;