import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import './wallet.css';
import { FaDollarSign, FaArrowDown } from 'react-icons/fa';
import { BsFillSendFill } from 'react-icons/bs';
import WalletModal from './modal';
import WalletLoading from './loading';
import NoData from '../../component/nodata';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setWallet } from '../../store/wallet';
import { getTokenAmount, setMessageFn } from '../../utils';
import { setMessage } from '../../store/message';
import { createERC20ContractInstance } from '../../services/contracts_creators';
import ErrorPage from '../../component/error';
import SkeletonLoader from '../../component/skeleton';

const Wallet = ({ toggleSidebar }) => {

    const amount = 12.98;
    const [modalType, setModalType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [noData, setNoData] = useState(false);
    const wallet = useSelector(state => state.wallet);
    const contract = useSelector(state => state.contract);

    const dispatch = useDispatch();
    const setWalletData = bindActionCreators(setWallet, dispatch);
    const setMessageData = bindActionCreators(setMessage, dispatch);

    const fetchWallet = async () => {
        if(!contract.signer) return setError(true);

        if(error) setError(false);
        setLoading(true);

        try {
            const walletContractInstance = await createERC20ContractInstance(contract.signer);
            const res = await walletContractInstance.balanceOf(contract.address);
            // res is type bigInt
            const name = await walletContractInstance.name();
            const symbol = await walletContractInstance.symbol();
            const decimals = await walletContractInstance.decimals();
            const resAmt = getTokenAmount(res, decimals);
            
            // decimals is BigInt
            setWalletData({ amount: resAmt, symbol, decimals, name, actualAmount: res });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    // const transfer = () => {
        // walletContractInstance.transfer(receiver_addy, bigIntAmount)
    // }

    useEffect(() => {
        fetchWallet();
    }, []);

    const history = [
    ...Array(5).fill({type:'Sent',amount:150,address:'0x5274tygr8e7wg278041g1w078',time:'16 Sep 2024, 12:15 p.m'}),
    ...Array(5).fill({type:'Received',amount:20050,address:'0x5274tygr8e7wg278041g1w078',time:'16 Sep 2024, 11:15 a.m'}),
    ];

    // do not remove
    function formatAmount(amount) {
        if(amount >= 1E9) return (amount / 1E9).toFixed(2) + 'B';
        else if(amount >= 1E6) return (amount / 1E6).toFixed(2) + 'M';
        else if(amount >= 1E3) return (amount / 1E5).toFixed(2) + 'K';
        else return amount;
    };

    const setModalTypeFn = (type) => {
        if(!wallet.amount) {
            setMessageFn(setMessageData, { status: 'error', message: 'Have not fetched wallet data.' });
        }
        setModalType(type);
    };
    
    return (
        <div className='Wallet'>
            <div className='wallet-header'>
                <GiHamburgerMenu className='wh-hamburger cursor' onClick={()=>toggleSidebar()} />
                <h2>Wallet</h2>
            </div>
            {
            error ?

            <div className='wallet-main-wrapper'><ErrorPage text={'Error'} /></div> :

            <div className='wallet-main-wrapper'>
                <div className='wallet-details'>
                    <h4>Total Balance</h4>
                    {loading ? 
                        <div className='wallet-amount-loading'><SkeletonLoader /></div> :
                        <h1>{formatAmount(wallet.amount) + ' ' + wallet.symbol}</h1>
                    }
                </div>
                <div className='wallet-main'>
                    <div className='wallet-actions'>
                        <div>
                            <div className='wallet-action' onClick={() => setModalTypeFn('Receive')}>
                                <FaArrowDown className='wa-icons' />
                                <span>Receive</span>
                            </div>
                            <div className='wallet-action' onClick={() => setModalTypeFn('Send')}>
                                <BsFillSendFill className='wa-icons' />
                                <span>Send</span>
                            </div>
                            <div className='wallet-action' onClick={() => setModalTypeFn('Buy')}>
                                <FaDollarSign className='wa-icons' />
                                <span>Buy</span>
                            </div>
                        </div>
                    </div>
                    <div className='wallet-history'>
                        <div className='wh'>
                            <h4>Transaction history</h4>
                        </div>
                        {noData ?
                            <NoData text={'No transaction history'} /> :
                            loading ? 
                                <WalletLoading /> :
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
                                                <span className='whl-amount'>{val.amount + ' ' + wallet.symbol}</span>
                                                <span className='whl-time'>{val.time}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                        }
                    </div>
                </div>
            </div>
            }
            {modalType && <WalletModal modalType={modalType} closeModal={() => setModalType(null)} />}
        </div>
    );
};

export default Wallet;