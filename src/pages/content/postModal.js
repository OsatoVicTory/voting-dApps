import { useRef, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineArrowDropDown, MdSend } from "react-icons/md";
import './postModal.css';
import MultiChoiceInputWithDropdown from "../../component/multiChoice";

// destination is communityName if we are coming from a community

const PostModal = ({ closeModal, destination }) => {

    const modalRef = useRef();
    const textRef = useRef();
    const dropdownSelectRef = useRef();
    const [open, setOpen] = useState(true);
    const [post, setPost] = useState({});
    const placeholderRef = useRef();
    const [selected, setSelected] = useState([]);
    const [postDestination, setPostDestination] = useState(destination||'Your feed');
    const [postDestinationDropdown, setPostDestinationDropdown] = useState(false);
    const dropdownRef = useRef();
    const selectRef = useRef();
    const textContentRef = useRef();
    const [showDropdown, setShowDropdown] = useState(false);
    const options = ['Javascript', 'Python', 'Typescript', 'Nodejs', 'Ethereum'];

    function clickFn(e) {
        if(!modalRef.current) return;
        if(modalRef.current && !modalRef.current.contains(e.target)) { 
            setOpen(false); 
            closeModal(); 
        }

        if(!selectRef.current || !dropdownRef.current) return;
        if(selectRef.current && !selectRef.current.contains(e.target) && !dropdownRef.current.contains(e.target)) {
            setPostDestinationDropdown(false);
        }
    };

    function postDestinationFn(val) {
        setPostDestinationDropdown(false);
        setPostDestination(val);
    };

    function selectFn(selectedArr) {
        setSelected(selectedArr);
    };

    useEffect(() => {
        document.addEventListener("click", clickFn, true);

        return () => {
            document.removeEventListener("click", clickFn, true);
        }
    }, []);

    function handleChange(e) {
        console.log(e);
        // e => { 
        //     blocks: [ 
        //         { 
        //             text, key-(peculiar to the package), type-(styling, whether span, bold, etc) 
        //         }, 
        //         ...
        //     ] 
        // }
    };
    
    const communities = ['Announcement', 'Ethereum', 'ChatGPT', 'Basketball', 'Machine Learning', 'Blockchain'];

    return (
        <div className={`postModal ${open}`}>
            <div className="pM-content" ref={modalRef}>
                <div className="pMc-top">
                    <span className="pMct-txt">Add Post</span>
                    <AiOutlineClose className="pMc-icon cursor" onClick={() => closeModal()} />
                </div>
                <div className="pMc-mid">
                    <div className="pMc-destination">
                        <div className="pMc-dest" ref={selectRef}>
                            <div className="pMcd-selected">
                                {!postDestinationDropdown ?
                                    <div className="pMcd-s-div" onClick={() => setPostDestinationDropdown(true)}>
                                        <div className="pMcds-img"></div>
                                        <span>{postDestination}</span>
                                        <MdOutlineArrowDropDown className="pMcds-icon" />
                                    </div> :
                                    <div className="pMcd-s-search">
                                        <AiOutlineSearch className="pMcds-icon -s" />
                                        <input placeholder="Select a community" />
                                    </div>
                                }
                            </div> 
                            {postDestinationDropdown && <div className="pMcd-dropdown" ref={dropdownRef}>
                                <div className="pmcd-dr-lists hide_scrollbar">
                                    <div>
                                        <div className="pmcd-user">
                                            <div className="pmcd-subheading">Your profile</div>
                                            <div className="pmdc-li" onClick={() => postDestinationFn('Your feed')}>
                                                <div className="pmdcl-img"></div>
                                                <div className="pmdcl-txt">
                                                    {'Your feed'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pmcd-communities">
                                            <div className="pmcd-subheading">Your communities</div>
                                            {communities.map((val, idx) => (
                                                <div className="pmdc-li" key={`pmcdcl-${idx}`}
                                                onClick={() => postDestinationFn(val)}>
                                                    <div className="pmdcl-img"></div>
                                                    <div className="pmdcl-txt">
                                                        {val}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>

                    <div className="pMc-field">
                        <label>Post title</label>
                        <input placeholder="Enter a title" />
                    </div>
                    <div className="pMc-field">
                        <label>Post category</label>
                        <MultiChoiceInputWithDropdown class_name={"pMc-select"} placeholder={'Select the categories'}
                        dropdownLists={options} selected={selected} selectFn={selectFn} height={200} />

                    </div>
                    <div className="pMc-field">
                        <label>Post contents</label>
                        {/* <textarea placeholder="Type your post" /> */}

                        <Editor
                            // editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onChange={handleChange}
                            // onEditorStateChange={this.onEditorStateChange}
                        />
                        
                    </div>
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