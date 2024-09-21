import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import './community.css';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import PostModal from '../content/postModal';

const CommunityPage = ({ toggleSidebar }) => {

    const [route, setRoute] = useState('Feed');
    const [modal, setModal] = useState(false);
    const communityName = 'Ethereum';
    const topics = ['Web3', 'Ethereum', 'Arbitrum', 'Sepolia', 'Crypto', 'Funny', 'Metamask'];
    const admins = ['osato', 'victory', 'victor', 'vitalicadruskypondoruv', ...Array(6).fill('anthony_durovic')];
    const feeds = admins;
    function closeModal() { setModal(false); }

    return (
        <div className='community-Page'>
            {/* <div className='cm-header'>
                <GiHamburgerMenu className='cmh-hamburger cursor' onClick={() => toggleSidebar()} />
                <h2>Community</h2>
            </div> */}
            <div className='community'>
                <div className='community-header'>
                    <div className='ch'>
                        <div className='ch-img'></div>
                        <h3>Ethereum</h3>
                        <div className='ch-right'>
                            <div className='chr cursor' onClick={() => setModal('create')}>
                                <FaPlus className='chr-icon' />
                                <span>Create Post</span>
                            </div>
                            <div className='chr join cursor'>Join</div>
                        </div>
                    </div>
                </div>
                <div className='cm-nav'>
                    <div className={`cm-nav-btn cursor ${route==='Feed'?true:false}`} onClick={() => setRoute('Feed')}>Feed</div>
                    <div className={`cm-nav-btn cursor ${route==='About'?true:false}`} onClick={() => setRoute('About')}>About</div>
                </div>
                <div className='community-main'>
                    <div className={`cm-Feed ${route==='Feed'?true:false} hide_scrollbar`}>
                        <ul>
                            {feeds.map((val, idx) => (
                                <li key={`feed-${idx}`} className='feed-li'>
                                    <div className='fl-top'>
                                        <div className='flt-img'></div>
                                        <span className='flt-poster'>Victory</span>
                                        <span className='flt-time'>10 hrs ago</span>
                                    </div>
                                    <div className='fl-mid'>
                                        <div className='fl-mid-txt'>
                                            Happiness is mine {new Array(200).fill('happiness is mine').join(' ')}
                                        </div>
                                    </div>
                                    <div className='fl-base'>
                                        <div className='flb-left'>
                                            {topics.map((val, idx) => (
                                                <div key={`flb-${idx}`}>{val}</div>
                                            ))}
                                        </div>
                                        <div className='flb-right'>
                                            <div className='flb-votes'>
                                                <BiUpvote className="flbv-icon" />
                                                <span>23</span>
                                            </div>
                                            <div className='flb-votes'>
                                                <BiDownvote className="flbv-icon" />
                                                <span>23</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`cm-About ${route==='About'?true:false}`}>
                        <h4>About community</h4>
                        <div className='cm-dets'>
                            <span className='cmd-title'>Ethereum Network</span>
                            <span className='cmd-desc'>All abouth ETH. Arbitrum, Linear, Polygon and Mainnet</span>
                        </div>
                        <div className='cm-data'>
                            <div className='cmd-metric'>
                                <span className='cmdm-value'>63K</span>
                                <span className='cmdm-name'>Members</span>
                            </div>
                            <div className='cmd-metric'>
                                <span className='cmdm-value'>2.2K</span>
                                <span className='cmdm-name'>Posts</span>
                            </div>
                        </div>
                        <div className='cm-admins'>
                            <span>ADMINISTRATORS</span>
                            <div>
                                {admins.map((val, idx) => (
                                    <div className='cma-li' key={`cm-${idx}`}>
                                        <div className='cmal-img'></div>
                                        <span className='cmal-txt'>{val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='cm-Topics'>
                            <span>TOPICS</span>
                            <div className='cm-topics'>
                                {topics.map((val, idx) => (  
                                    <div key={`topic-${idx}`}>{val}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {modal && <PostModal closeModal={closeModal} destination={communityName} />}
        </div>
    );
};

export default CommunityPage;