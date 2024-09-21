import { useState } from 'react';
import MultiChoiceInputWithDropdown from '../../component/multiChoice';
import './styles.css';

const Signup = () => {
    const lists = Array(5).fill('Ethereum');
    const [user, setUser] = useState({ interests: [] });

    function selectFn(values) {
        setUser({ ...user, interests: values });
    };

    function handleChange(e) {
        return;
    };

    return (
        <div className='signup'>
            <div className='sign-up'>
                <header></header>
                <main>
                    <div className='signup-content'>
                        <h3>Sign up</h3>
                        <form className='signup-form'>
                            <div className='sf-filed'>
                                <label>Username</label>
                                <input placeholder='Enter username' onChange={handleChange} />
                            </div>
                            <div className='sf-filed'>
                                <label>E-mail</label>
                                <input placeholder='Enter email' type='email' onChange={handleChange} />
                            </div>
                            <div className='sf-filed'>
                                <label>Password</label>
                                <input placeholder='Enter password' type='password' onChange={handleChange} />
                            </div>
                            <div className='sf-filed'>
                                <label>Interests</label>
                                <div className='sf-drp'>
                                    <MultiChoiceInputWithDropdown class_name={'sf-filed-input'}
                                    dropdownLists={lists} selected={user.interests} selectFn={selectFn} />
                                </div>
                            </div>
                            <div className='sf-submit'>
                                <input type='submit' value='Sign up' className='cursor' />
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Signup;