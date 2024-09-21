import { BiSolidCommentDetail } from "react-icons/bi";
import { FaArrowUpLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ProfileHome = () => {

    const navigate = useNavigate();
    const posts = new Array(20).fill({ title: 'Image rotation in pillow', date: 'Dec 30, 2015' });

    return (
        <div className="profileHome">
            <div className="profile-desc">
                <div className="profile-pic">
                    <div></div>
                </div>
                <div className='profile-details'>
                    <h3>John Doe</h3>
                    <span>Joined 2 months ago</span>
                </div>
                <div className='profile-edit'>
                    <div className='p-edit-button cursor' onClick={() => navigate('/app/profile/edit')}>Edit profile</div>
                </div>
            </div>
            <div className='profile-data'>
                <div className='profile-stats'>
                    <h4>Stats</h4>
                    <div className='stats'>
                        <div className='stats-div'>
                            <span className='sd-value'>3.980</span>
                            <span className='sd-name'>Reputation</span>
                        </div>
                        <div className='stats-div'>
                            <span className='sd-value'>1.980</span>
                            <span className='sd-name'>Posts</span>
                        </div>
                        <div className='stats-div'>
                            <span className='sd-value'>980</span>
                            <span className='sd-name'>Upvotes</span>
                        </div>
                        <div className='stats-div'>
                            <span className='sd-value'>180</span>
                            <span className='sd-name'>Mentions</span>
                        </div>
                    </div>
                </div>
                <div className='profile-about'>
                    <h4>About</h4>
                    <span className='about-txt'>
                        Software engineer, contributing PSF member
                    </span>
                </div>
            </div>
            <div className='profile-posts'>
                <h4>Top Posts</h4>
                <ul className='p-posts'>
                    {posts.map((val, idx) => (
                        <li key={`posts-${idx}`} className='p-posts-li'>
                            <BiSolidCommentDetail className='pp-icon' />
                            <div className='p-posts-upvotes'>
                                <FaArrowUpLong className='ppu-icon' /> 
                                <span className='ppu-cnt'>3</span>
                            </div>
                            <div className='pp-title cursor'>{val.title}</div>
                            <div className='pp-date'>{val.date}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProfileHome;