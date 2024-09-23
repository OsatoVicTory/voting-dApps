import { useNavigate } from 'react-router-dom';
import './contentList.css';
import ContentLoading from './loading';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setContents } from '../../store/contents';

const Contentlist = ({ openModal }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const groupings = ['string', 'powershell', 'web3', 'ethereum'];
    const contents = useSelector(state => state.contents);
    const contract = useSelector(state => state.contract);

    const dispatch = useDispatch();
    const setContentsData = bindActionCreators(setContents, dispatch);

    useEffect(() => {
        setTimeout(() => { setLoading(false); }, 5000);
    }, []);

    return (
        <main>
            <div className='post'>
                <h2>Top Posts</h2>
                <button className='post-button cursor' onClick={()=>openModal()}>Add post</button>
            </div>
            {loading ? <ContentLoading /> :
            <ul className='post-ul'>
                {groupings.map((val, idx) => (
                    <li className='post-list' key={`pl-${idx}`}>
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
                ))}
            </ul>}
        </main>
    );

};

export default Contentlist;