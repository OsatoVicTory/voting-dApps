import { useState } from 'react';
import MultiChoiceInputWithDropdown from '../../component/multiChoice';
import banner from '../../images/phone_banner.png';
import logo from '../../images/idonk_no_bg_1.png';
import './styles.css';
import { createSafeUserRegistrationContractInstance, createUserContractInstance } from '../../services/contracts_creators';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/user';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import { decodeData, encodeToByte, setMessageFn } from '../../utils';
import { setMessage } from '../../store/message';
import { SiAwselasticloadbalancing } from 'react-icons/si';

const Signup = () => {
    const lists = ['Crypto', 'Block Chain', 'Web3', 'Ethereum', 'Arbitrum', 'NFTs', 'Sepolia', 'Testnets'];
    const [user, setUserChoice] = useState({ interests: [] });
    const contract = useSelector(state => state.contract);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const setUserData = bindActionCreators(setUser, dispatch);
    const setMessageData = bindActionCreators(setMessage, dispatch);

    function selectFn(values) {
        setUserChoice({ ...user, interests: values });
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setUserChoice({ ...user, [name]: value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if(loading) return;

        setLoading(true);
        try {
            const data = encodeToByte(
                JSON.stringify({ 
                    email: user.email, 
                    about: user.about, 
                    interests: user.interests 
                })
            );
            const userContractInstance = await createUserContractInstance(contract.signer);
            const nameTaken = await userContractInstance.nameTaken(user.name);
            if(nameTaken) {
                console.log('Name taken');
                setLoading(false);
                return setMessageFn(setMessageData, { status: 'error', message: 'Name is already taken. Choose another please.'});
            }
            const safeUserRegContractInstance = await createSafeUserRegistrationContractInstance(contract.signer);
            await userContractInstance.registerUser(`${user.name}`, data);
            await safeUserRegContractInstance.registerUser();
            const res = await userContractInstance.getMetaData();
            const userRes = JSON.parse(res);
            const metaData = decodeData(userRes.metaData, 'bytes');
            setUserData({ ...userRes, ...metaData });
            navigate('/app');
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            setMessageFn(setMessageData, { status: 'error', message: 'There was an error. Check internet and try again.'});
        }
    };

    return (
        <div className='signup'>
            <div className='sign-up'>
                <main>
                    <div className='signup-content'>
                        <div className='signup-logo'>
                            <img src={logo} alt='logo' />
                        </div>
                        <h3>Set up Account</h3>
                        <p>Note that records here cannot be modified later on</p>
                        <form className='signup-form' onSubmit={handleSubmit}>
                            <div className='sf-filed'>
                                <label>Username</label>
                                <input placeholder='Enter username' name='name' onChange={handleChange} />
                            </div>
                            <div className='sf-filed'>
                                <label>E-mail</label>
                                <input placeholder='Enter email' name='email' type='email' onChange={handleChange} />
                            </div>
                            <div className='sf-filed'>
                                <label>About</label>
                                <textarea placeholder='Write a description about your self' name='about' onChange={handleChange} />
                            </div>
                            <div className='sf-filed'>
                                <label>Interests</label>
                                <div className='sf-drp'>
                                    <MultiChoiceInputWithDropdown class_name={'sf-filed-input'} placeholder={'Select your interests'}
                                    dropdownLists={lists} selected={user.interests} selectFn={selectFn} />
                                </div>
                            </div>
                            <div className='sf-submit'>
                                <input type='submit' value={loading ? 'Creating Account...' : 'Create Account'} className='cursor' />
                            </div>
                        </form>
                    </div>
                </main>
                <aside className='signup-banner'>
                    <div className='sb'>
                        <img src={banner} alt='banner' />
                        <div className='sb-txt'>
                            <h1>Let's get you started <br /> on your quest for knowledge.</h1>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Signup;