import { useRef, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './postModal.css';
import { MdSend } from 'react-icons/md';

const StakeContentModal = ({ closeModal, voteType }) => {

    const modalRef = useRef();

    function clickFn(e) {
        if(!modalRef.current) return;
        if(modalRef.current && !modalRef.current.contains(e.target)) closeModal(); 
    };

    useEffect(() => {
        document.addEventListener("click", clickFn, true);

        return () => document.removeEventListener("click", clickFn, true);
        
    }, []);

    return (
        <div className='stakeContentModal'>
            <div className='scm-content' ref={modalRef}>
                <div className='scm-header'>
                    <div className="pMc-top">
                        <span className="pMct-txt">Stake on your vote</span>
                        <AiOutlineClose className="pMc-icon cursor" onClick={() => closeModal()} />
                    </div>
                </div>
                <div className='scm-main'>
                    <div className="pMc-field">
                        <label>Stake an amount to {voteType}vote</label>
                        <input placeholder="Enter an amount" type='number' />
                    </div>
                </div>
                <div className="pMc-base" style={{marginTop: '45px'}}>
                    <div className="pMc-send cursor">
                        <MdSend className="pMcs-icon" />
                        <span className="pMcs-txt">Stake</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StakeContentModal;