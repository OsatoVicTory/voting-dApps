import { GiHamburgerMenu } from 'react-icons/gi';
import './wallet.css';

const Wallet = ({ toggleSidebar }) => {

    return (
        <div className='Wallet'>
            <div className='wallet-header'>
                <GiHamburgerMenu className='wh-hamburger cursor' onClick={()=>toggleSidebar()} />
                <h2>Wallet</h2>
            </div>
            <div className='wallet-main'>
                <h1>Coming soon...</h1>
            </div>
        </div>
    );
};

export default Wallet;