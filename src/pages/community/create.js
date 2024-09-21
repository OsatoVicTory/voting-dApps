import { useState } from 'react';
import './create.css';
import { AiOutlineClose } from 'react-icons/ai';
import { MdArrowBack, MdOutlineArrowDropDown, MdSend } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import MultiChoiceInputWithDropdown from '../../component/multiChoice';

const CommunityCreate = () => {

    const topicLists = Array(10).fill('Crypto and Web3');
    const userLists = Array(10).fill('Ethereum');
    const [data, setData] = useState({ topics: [], admins: [] });
    const [dropdown, setDropdown] = useState(null);
    const [topicDropdownList, setTopicDropdownList] = useState(topicLists);
    const [userDropdownList, setUserDropdownList] = useState(userLists);
    const navigate = useNavigate();

    // function handleChange(e) {
    //     const { name, value } = e.target;
    //     if(name == 'topics') setTopicDropdownList(topicLists.filter(val => val.startsWith(value)));
    //     else setUserDropdownList(userLists.filter(val => val.startsWith(value)));
    // }
    function selectTopicFn(value, type='topics') {
        setData({ ...data, [type]: [...data[type], value] });
        setDropdown(null);
    };
    function selectAdminFn(value, type='admins') {
        setData({ ...data, [type]: [...data[type], value] });
        setDropdown(null);
    };

    return (
        <div className='community-Create'>
            <div className='community-Create-header'>
                <MdArrowBack className='cch-icon cursor' onClick={() => navigate(-1)} />
                <h1>Create Community</h1>
            </div>
            <div className='cmtc-fields'>
                <div className='cmtc-field'>
                    <label>Name</label>
                    <input placeholder='Name' />
                </div>
                <div className='cmtc-field'>
                    <label>Community description</label>
                    <textarea placeholder='Description' />
                </div>
                <div className='cmtc-field'>
                    <label>Topics</label>
                    <MultiChoiceInputWithDropdown class_name={"cmtc-select"} placeholder={'Select some topics'}
                    dropdownLists={topicDropdownList} selected={data.topics} selectFn={selectTopicFn} height={200} />
                    
                </div>
                <div className='cmtc-field'>
                    <label>Community Admins</label>
                    <MultiChoiceInputWithDropdown class_name={"cmtc-select"} placeholder={'Select some admins'}
                    dropdownLists={userDropdownList} selected={data.admins} selectFn={selectAdminFn} height={200} />

                </div>
            </div>
            <div className='community-create'>
                <div className='cmt-create-btn cursor'>
                    Create
                </div>
            </div>
        </div>
    );
};

export default CommunityCreate;