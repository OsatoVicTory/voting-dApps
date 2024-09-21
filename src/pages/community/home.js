import { useNavigate } from 'react-router-dom';
import './home.css';

const CommunityHome = () => {

    const communities = Array(50).fill(0);
    const navigate = useNavigate();

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
                        <li key={`cm-${idx}`} className='cmts-li cursor' onClick={() => navigate(`/app/community/page/${idx}`)}>
                            <div className='cmtsl-img'></div>
                            <div className='cmtsl-txt'>
                                <span className='cmts-name'>Ethereum</span>
                                <span className='cmts-niche'>Crypto and Web3</span>
                                <span className='cmts-members'>600M Users</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Pagination div goes here */}
        </div>
    );
};

export default CommunityHome;