import { useEffect, useRef, useState } from "react";
import './modal.css';
import { MdSend } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { TOKEN_NAME } from "../../config";

const WalletModal = ({ modalType, closeModal }) => {

    const modalRef = useRef();

    function clickFn(e) {
        if(!modalRef.current) return;
        if(modalRef.current && !modalRef.current.contains(e.target)) closeModal(); 
    };

    useEffect(() => {
        document.addEventListener("click", clickFn, true);

        return () => document.removeEventListener("click", clickFn, true);
    }, []);

    const Receive = () => {

        return (
            <div className="wm-Receive">
                <p>Copy your address</p>
                <div className="wmr-text">
                    <span>0x25tg472gh32476hf523fh69fo246n</span>
                </div>
                <div className="wmr">
                    <div className="wmr-button cursor">
                        <FaRegCopy className="wmrb-icon" />
                        <span>Copy</span>
                    </div>
                </div>
            </div>
        );
    };

    const Buy = () => {

        return (
            <div className="wm-Buy">
                <h2>Coming soon...</h2>
            </div>
        );
    };

    const Send = () => {

        const [sendOptions, setSendOptions] = useState({});
        function handleChange(e) {
            const { name, value } = e.target;
            setSendOptions({ ...sendOptions, [name]: value });
        };

        return (
            <div className="wm-Send">
                <p>Send tokens to an address</p>
                <div className="wmS-field">
                    <label>Receipient address</label>
                    <input placeholder="Enter address" name='address' onChange={handleChange} />
                </div>
                <div className="wmS-field">
                    <label>Amount</label>
                    <input placeholder="Enter amount" type='number' name="amount" onChange={handleChange} />
                </div>
                <div className="wmS-send">
                    <div className="wms-button cursor">
                        <MdSend className="wmsb-icon" />
                        <span>Send</span>
                    </div>
                </div>
            </div>
        );
    };

    const Component = { 'Receive': <Receive />, 'Buy': <Buy />, 'Send': <Send /> };

    return (
        <div className="wallet-modal">
            <div className="wm" ref={modalRef}>
                <div className="wm-header">
                    <h4>{modalType} {TOKEN_NAME}</h4>
                    <AiOutlineClose className="wmh-icon cursor" onClick={() => closeModal()} />
                </div>
                {Component[modalType]}
            </div>
        </div>
    )
};

export default WalletModal;