import { useNavigate } from 'react-router-dom';
import './contentList.css';

const Contentlist = ({ openModal }) => {

    const navigate = useNavigate();
    const groupings = ['string', 'powershell', 'web3', 'ethereum'];

    return (
        <main>
            <div className='post'>
                <h2>Top Posts</h2>
                <button className='post-button cursor' onClick={()=>openModal()}>Add post</button>
            </div>
            <ul className='post-ul'>
                <li className='post-list'>
                    <div className='pl-top'>
                        <div className='pl-img'></div>
                        <span className='pl-txt'>John Doe</span>
                        <span className='post-time'>posted 10 min ago</span>
                    </div>
                    <div className='pl-mid cursor' onClick={()=>navigate(`/app/post/123456789`)}>
                        The balance of my wallet is enough for gas fee and more transactions on the blockchain
                    </div>
                    <div className='pl-base'>
                        <div className='pl-groupings'>
                            {groupings.map((val, idx) => (<div className='pl-group' key={`plg-${idx}`}>{val}</div>))}
                        </div>
                        <span className='pl-votes'>2 votes</span>
                    </div>
                </li>
            </ul>
        </main>
    );

};

export default Contentlist;