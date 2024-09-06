import { useState } from 'react';
import './content.css';
import { BiUpvote, BiSolidUpvote } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Content = ({ closeContent }) => {

    const groupings = ['string', 'powershell', 'web3', 'ethereum'];
    const [voted, setVoted] = useState(false); 
    const navigate = useNavigate();
    function clickFn() { setVoted(!voted); };

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
                        <div className="pcv cursor" onClick={()=>clickFn()}>
                            {voted ? <BiSolidUpvote className="pcv-icon" /> : <BiUpvote className="pcv-icon" />}
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
        </div>
    );
};

export default Content;