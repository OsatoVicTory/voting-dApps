import { useRef, useEffect, useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';
import { MdSend } from "react-icons/md";
import './postModal.css';

const PostModal = ({ closeModal }) => {

    const modalRef = useRef();
    const [open, setOpen] = useState(true);

    function clickFn(e) {
        if(!modalRef.current) return;
        if(modalRef.current && !modalRef.current.contains(e.target)) { 
            setOpen(false); 
            closeModal(); 
        }
    };

    useEffect(() => {
        document.addEventListener("click", clickFn, true);
        return () => document.removeEventListener("click", clickFn, true);
    }, []);

    return (
        <div className={`postModal ${open}`}>
            <div className="pM-content" ref={modalRef}>
                <div className="pMc-top">
                    <span className="pMct-txt">Add Post</span>
                    <AiOutlineClose className="pMc-icon cursor" onClick={()=>closeModal()} />
                </div>
                <div className="pMc-mid">
                    <textarea placeholder="Write a post" />
                </div>
                <div className="pMc-base">
                    <div className="pMc-send cursor">
                        <MdSend className="pMcs-icon" />
                        <span className="pMcs-txt">Post</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostModal;