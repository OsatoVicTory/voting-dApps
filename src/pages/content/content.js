import { useState } from 'react';
import './content.css';
import { BiUpvote, BiSolidUpvote, BiSolidDownvote, BiDownvote } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import StakeContentModal from './stakeModal';

const Content = () => {

    const groupings = ['string', 'powershell', 'web3', 'ethereum'];
    const [voted, setVoted] = useState(''); 
    const [modal, setModal] = useState('');
    const navigate = useNavigate();
    function clickFn(type) { 
        setModal(type);
        setVoted(type); 
    };
    function closeModal() { setModal(''); }

    return (
        <div className="post-content">
            <div className='content-header'>
                <AiOutlineClose className='ch-icon cursor' onClick={()=>navigate(-1)} />
            </div>
            <div className='pc-main'>
                <h4>The balance of my wallet is enough for gas fee and more transactions on the blockchain</h4>
                <p>Posted 10 mins ago</p>
                <span className='pc-txt'>Happiness is mine {new Array(200).fill('happiness is mine').join(' ')}</span>
                <div className="pc-groupings">
                    <div className='pl-groupings'>
                        {groupings.map((val, idx) => (<div className='pl-group' key={`plg-${idx}`}>{val}</div>))}
                    </div>
                </div>
                <div className='pc-base'>
                    <div className="pc-voting">
                        <div className="pcv cursor" onClick={()=>clickFn('up')}>
                            {voted === 'up' ? <BiSolidUpvote className="pcv-icon" /> : <BiUpvote className="pcv-icon" />}
                            <span className="pcv-txt">20</span>
                        </div>
                        <div className="pcv cursor down-vote" onClick={()=>clickFn('down')}>
                            {voted === 'down' ? <BiSolidDownvote className="pcv-icon" /> : <BiDownvote className="pcv-icon" />}
                            <span className="pcv-txt">20</span>
                        </div>
                    </div>
                    <div className="pc-details">
                        <div className="pd-img"></div>
                        <div className='pd-txt'>
                            <span className="pd-poster">John Doe</span>
                            <span className="pd-post-time">Mar 18, 2024 at 18:05</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {modal && <StakeContentModal closeModal={closeModal} voteType={voted} />}
        </div>
    );
};

export default Content;