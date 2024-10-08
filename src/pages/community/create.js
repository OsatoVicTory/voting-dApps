import { useState } from 'react';
import './create.css';
import { AiOutlineClose } from 'react-icons/ai';
import { MdArrowBack, MdOutlineArrowDropDown, MdSend } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import MultiChoiceInputWithDropdown from '../../component/multiChoice';
import { createCommunitiesContractInstance } from '../../services/contracts_creators';
import { delay, parseCommunityData, setMessageFn } from '../../utils';
import { setMessage } from '../../store/message';
import { addCommunity } from '../../store/community';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SiMetrodelaciudaddemexico } from 'react-icons/si';

const CommunityCreate = ({ closeModal }) => {

    const topicLists = ['Crypto', 'Block Chain', 'Web3', 'Ethereum', 'Arbitrum', 'NFTs', 'Sepolia', 'Testnets'];
    const userLists = Array(10).fill('Ethereum');
    // const [data, setData] = useState({ topics: [], admins: [] });
    const [data, setData] = useState({ topics: [] });
    const [dropdown, setDropdown] = useState(null);
    const [loading, setLoading] = useState(false);
    const [aux, setAux] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contract = useSelector(state => state.contract);
    const addCommunityData = bindActionCreators(addCommunity, dispatch);
    const setMessageData = bindActionCreators(setMessage, dispatch);

    function selectTopicFn(value, type='topics') {
        setData({ ...data, [type]: [...value] });
        setDropdown(null);
    };

    // Don't delete incase we add admins
    // function selectAdminFn(value, type='admins') {
    //     setData({ ...data, [type]: [...data[type], value] });
    //     setDropdown(null);
    // };

    function handleChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleCreate = async () => {
        if(loading) return;

        setLoading(true);
        try {
            const communityContractInstance = await createCommunitiesContractInstance(contract.signer);
            const permitCreate = await communityContractInstance.nameTaken(data.name);
            if(permitCreate) {
                setLoading(false);
                return setMessageFn(setMessageData, { status: 'error', message: 'Name is taken already. Choose another.'});
            }
            const stringifiedData = `[name=${data.name}%x2niche=${data.niche}%x2topics=[${data.topics}]%x2description=${data.description}]`;
            await communityContractInstance.createCommunity(data.name, stringifiedData);

            // just to pad and make data porpagated
            const date = Math.floor(new Date().getTime() / 1000);
            const resp = `{"creator":"${contract.address}","name":"${data.name}","meta_data":"${stringifiedData}","numbers of members":"1","created_at":${date}}`;
            
            const community_id = await communityContractInstance.getLastIndex();
            // console.log('community id', community_id);
            // const res = await communityContractInstance.getCommunity(community_id);
            console.log('community_id from getLastIndex =>', resp);
            const communityData = parseCommunityData(resp);
            addCommunityData({ ...communityData, community_id: community_id+1n+'' });
            setLoading(false); 
            setMessageFn(setMessageData, { status: 'success', message: 'Community created successfully.' });
            closeModal();
        } catch (err) {
            console.log(err);
            setLoading(false); 
            setMessageFn(setMessageData, { status: 'error', message: 'There was an error. Check internet and try again.'});
        }
    };

    return (
        <div className='community-Create'>
            <div className='community-Create-header'>
                <MdArrowBack className='cch-icon cursor' onClick={() => closeModal()} />
                <h1>Create Community</h1>
            </div>
            <div className='cmtc-fields'>
                <div className='cmtc-field'>
                    <label>Community Name</label>
                    <input placeholder='Name' name='name' onChange={handleChange} />
                </div>
                <div className='cmtc-field'>
                    <label>Community Category</label>
                    <input placeholder='Category like Sports, Entertainment etc' name='niche' onChange={handleChange} />
                </div>
                <div className='cmtc-field'>
                    <label>Community description</label>
                    <textarea placeholder='Description' name='description' onChange={handleChange} />
                </div>
                <div className='cmtc-field'>
                    <label>Topics</label>
                    <MultiChoiceInputWithDropdown class_name={"cmtc-select"} placeholder={'Select some topics'}
                    dropdownLists={topicLists} selected={data.topics} selectFn={selectTopicFn} height={200} />
                    
                </div>

                {/* No Admins for now */}
                {/* <div className='cmtc-field'>
                    <label>Community Admins</label>
                    <MultiChoiceInputWithDropdown class_name={"cmtc-select"} placeholder={'Select some admins'}
                    dropdownLists={userLists} selected={data.admins} selectFn={selectAdminFn} height={200} />

                </div> */}
            </div>
            <div className='community-create'>
                <div className='cmt-create-btn cursor' onClick={() => handleCreate()}>
                    {loading ? 'Creating...' : 'Create'}
                </div>
            </div>
        </div>
    );
};

export default CommunityCreate;