import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import SkeletonLoader from '../../component/skeleton';

import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCommunity } from '../../store/community';
import { setMessage } from '../../store/message';
import { setMessageFn } from '../utils';

const CommunityHome = () => {

    const communitiesData = useSelector(state => state.community);
    const contract = useSelector(state => state.contract);
    const [communities, setCommunities] = useState(Array(50).fill(0));
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const setCommunityData = bindActionCreators(setCommunity, dispatch);
    const setMessageData = bindActionCreators(setMessage, dispatch);

    useEffect(() => {
        setTimeout(() => { setLoading(false); }, 5000);
        setMessageFn(setMessageData, { status: 'success', message: 'Welcome ' });
    }, []);

    function navTo(to) {
        if(loading) return;
        navigate(`/app/community/page/${to}`)
    };

    return (
        <div className='community-Home'>
            <div className='cmH-header'>
                <div className='cmhh'>
                    <h1>Communities</h1>
                    <p>Browse our largest communities</p>
                </div>
                <div className='cmh-btn cursor' onClick={() => navigate('/app/community/create')}>Create community</div>
            </div>
            <div className='communities'>
                <ul>
                    {communities.map((val, idx) => (
                        <li key={`cm-${idx}`} className={`cmts-li ${loading?'':'cursor'}`} onClick={() => navTo(idx)}>
                            <div className='cmtsl-img'>
                                {loading ? <SkeletonLoader /> : <div className='d-'></div>}
                            </div>

                            {loading && <div className='cmtsl-txt'>
                                <div className='cmts-name cmts-loading'><SkeletonLoader /></div>
                                <div className='cmts-niche cmts-loading'><SkeletonLoader /></div>
                                <div className='cmts-members cmts-loading'><SkeletonLoader /></div>
                            </div>}

                            {!loading && <div className='cmtsl-txt'>
                                <span className='cmts-name'>Ethereum</span>
                                <span className='cmts-niche'>Crypto and Web3</span>
                                <span className='cmts-members'>600M Users</span>
                            </div>}
                        </li>
                    ))}
                </ul>
            </div>
            {/* Pagination div goes here */}
        </div>
    );
};

export default CommunityHome;