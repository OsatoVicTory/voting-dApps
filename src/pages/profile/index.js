import { FaArrowUpLong } from 'react-icons/fa6';
import '../signup/styles.css';
import './profile.css';
import { BiSolidCommentDetail } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Route, Routes } from 'react-router-dom';
import ProfileHome from './profile';
import EditUser from './editUser';

const Profile = ({ toggleSidebar }) => {
    
    return (
        <div className='profile'>
            <div className="profile-content">
                <div className="profile-header">
                    <GiHamburgerMenu className='profile-hamburger cursor' onClick={()=>toggleSidebar()} />
                    <h2>Profile</h2>
                </div>
                <Routes>
                    <Route path='/' element={<ProfileHome />} />
                    <Route path='/edit' element={<EditUser />} />
                </Routes>
            </div>
        </div>
    );
};

export default Profile;