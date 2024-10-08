import { useRef, useEffect, useState, useMemo } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { MdEdit, MdOutlineArrowDropDown, MdSend } from "react-icons/md";
import '../content/postModal.css';
import MultiChoiceInputWithDropdown from "../../component/multiChoice";
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FaFile } from "react-icons/fa6";
import { generateHTMLString, parseContentData, setMessageFn } from "../../utils";
import { setMessage } from "../../store/message";
import { postingContent } from "../../store/contents";
import { sendFile } from "../../services";
import { MB } from "../../config";
import { createContentContractInstance, createContentCreatorContractInstance, createUserContractInstance } from "../../services/contracts_creators";

// destination is communityName if we are coming from a community

const CommunityPostModal = ({ closeModal, destination, community_id, setFeeds, feeds }) => {

    const dispatch = useDispatch();
    const setMessageData = bindActionCreators(setMessage, dispatch);
    const postContentData = bindActionCreators(postingContent, dispatch);
    const contract = useSelector(state => state.contract);
    const user = useSelector(state => state.user);

    const modalRef = useRef();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [open, setOpen] = useState(true);
    const [sendLoading, setSendLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [postContent, setPostContent] = useState({});
    const [postFile, setPostFile] = useState({});
    const [selected, setSelected] = useState([]);
    const [postDestination, setPostDestination] = useState(destination||'Your feed');
    const [postDestinationDropdown, setPostDestinationDropdown] = useState(false);
    const dropdownRef = useRef();
    const selectRef = useRef();
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
            if(postFile?.type && postFile.type.startsWith('image/')) URL.revokeObjectURL(postFile);
            document.removeEventListener("click", clickFn, true);
        }
    }, []);

    function handleFileChange(e) {
        const file = e.target.files[0];
        if(!file?.size) return;
        if(file.size > (MB * 1024 * 1024)) {
            return setMessageFn(setMessageData, { status: 'error', message: `File cannot be more than ${MB}MB` });
        }
        if(postFile?.type?.startsWith('image/')) URL.revokeObjectURL(postFile);
        setPostFile(file);
    };

    const getImageURL = useMemo(() => {
        if(postFile.type && postFile.type.startsWith('image/')) return URL.createObjectURL(postFile);
        return null;
    }, [postFile.name]);

    function handleChange(e) {
        setPostContent(e);
    };

    const handleSend = async () => {
        if(sendLoading) return setMessageFn(setMessageData, { status: 'error', message: 'Currently sending a request.' });

        setSendLoading(true);
        // if no title, setMessage to alert user to fix it
        try {
            let [secure_url, public_id, filename, filesize] = ['', '', '', ''];
            if(postFile?.size) {
                const formData = new FormData();
                formData.append('file', postFile);
                formData.append('filename', postFile.name);
                formData.append('file_type', postFile.type.startsWith('image/') ? 'image' : 'doc');

                const { data } = await sendFile(formData);
                secure_url = data.data.secure_url;
                public_id = data.data.public_id;
                filename = postFile.name;
                filesize = data.data.filesize
            }
            const sub_data = {
                secure_url, public_id, content: generateHTMLString(postContent),
                filename, tags: selected, title, filesize
            }
            const contractInstance = await createContentCreatorContractInstance(contract.signer);
            // if user has not adjusted postDestination to Your feed then
            // if we are from community page, postDestination will be community name
            // so use community id, but if user has changed its destination to feed
            // then community_id argument should be 0

            // %x2 rep comma ','
            const stringifiedData = `[secure_url=${sub_data.secure_url}%x2public_id=${sub_data.public_id}%x2content=${sub_data.content}%x2filename=${sub_data.filename}%x2tags=[${sub_data.tags}]%x2title=${sub_data.title}%x2filesize=${sub_data.filesize}]`;
            await contractInstance.addContent(
                stringifiedData, 
                '', 
                postDestination === 'Your feed' ? 0 : community_id || 0
            );
            const content_id = await contractInstance.getDraft();

            // const contentContractInstance = await createContentContractInstance(contract.signer);
            // const resp = await contentContractInstance.getContent(content_id);
            // console.log('new content data =>', resp, typeof resp);
            // const res = parseContentData(resp);

            const cmmty_id = postDestination === 'Your feed' ? 0 : community_id || 0;
            const date = Math.floor(new Date().getTime() / 1000);

            const duplicate_contentData = `{"content_id":"${content_id+1n+''}","author":"${contract.address}","sub_data":"${stringifiedData}","content":"","community_id":"${cmmty_id}","verified":false,"timestamp":${date}}`;

            const res = parseContentData(duplicate_contentData);

            console.log('parsed new content data =>', res);
            const userContractInstance = await createUserContractInstance(contract.signer);
            const author = await userContractInstance.getUsername(res.author);

            if(postDestination === 'Your feed') postContentData({ ...res, author });
            else setFeeds([{ ...res, author }, ...feeds]);

            setMessageFn(setMessageData, { status: 'success', message: 'Post sent successfully.' });
            closeModal(); 
        } catch(err) {
            console.log(err);
            setSendLoading(false);
            setMessageFn(setMessageData, { status: 'error', message: 'Error sending your post. Retry.' });
        }
    };
    

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
                                        {community_id && <div className="pmcd-communities">
                                            <div className="pmcd-subheading">Community</div>
                                            <div className="pmdc-li" onClick={() => postDestinationFn(destination)}>
                                                <div className="pmdcl-img"></div>
                                                <div className="pmdcl-txt">
                                                    {destination}
                                                </div>
                                            </div>
                                        </div>}
                                        {/* {community_id && <div className="pmcd-communities">
                                            <div className="pmcd-subheading">Your communities</div>
                                            {communities.map((val, idx) => (
                                                <div className="pmdc-li" key={`pmcdcl-${idx}`}
                                                onClick={() => postDestinationFn(val.name)}>
                                                    <div className="pmdcl-img"></div>
                                                    <div className="pmdcl-txt">
                                                        {val.name}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>} */}
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>

                    <div className="pMc-field">
                        <label>Post title</label>
                        <input placeholder="Enter a title" required
                        onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    
                    <div className="pMc-field">
                        <label>{`Add File (either image or document file not more than ${MB}MB in size)`}</label>
                        <div className="pMc-file">
                            <label htmlFor="post-file" className="post-file-label">
                                {postFile.name && <div className="post-file-content">
                                    {
                                    postFile.type.startsWith('image/') ?
                                        <div className="file-doc-">
                                            <img src={getImageURL} alt='post-img-alt' />
                                            <div className="file-doc image-bg"></div>
                                        </div> :
                                        <div className="file-doc-">
                                            <FaFile className="fd-icon" />
                                            <div className="file-desc">{postFile.name}</div>
                                        </div>
                                    }
                                    </div>
                                }
                                {
                                    !postFile.name ?
                                    <div className="file-doc">
                                        <FaFile className="fd-icon" />
                                        <div className="file-desc">
                                            {`Select file`}
                                        </div>
                                    </div> :
                                    <div className="file-doc-edit cursor">
                                        <MdEdit className="fd-icon" />
                                    </div>
                                }
                            </label>
                            <input type="file" id="post-file" onChange={handleFileChange} />
                        </div>
                    </div>

                    <div className="pMc-field">
                        <label>Post category</label>
                        <MultiChoiceInputWithDropdown class_name={"pMc-select"} placeholder={'Select the categories'}
                        dropdownLists={options} selected={selected} selectFn={selectFn} height={200} />

                    </div>
                    <div className="pMc-field">
                        <label>Post contents</label>

                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onChange={handleChange}
                            onEditorStateChange={(eState) => setEditorState(eState)}
                        />
                        
                    </div>
                </div>
                <div className="pMc-base">
                    <div className="pMc-send cursor" onClick={() => handleSend()}>
                        <MdSend className="pMcs-icon" />
                        <span className="pMcs-txt">{sendLoading ? 'Posting...' : 'Post'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityPostModal;