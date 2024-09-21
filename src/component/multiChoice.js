import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineArrowDropDown } from "react-icons/md";
import './multiChoice.css';

const MultiChoiceInputWithDropdown = ({ class_name, dropdownLists, selected, selectFn, height, placeholder }) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const rawLists = dropdownLists.map(val => ({ val, checked: selected.includes(val) }));
    const [lists, setLists] = useState(rawLists);
    const [pos, setPos] = useState({ top: '50px' });
    const [selectedLists, setSelectedLists] = useState([...selected]);

    useEffect(() => {
        const ele = document.getElementById("mciwd-input");
        if(ele) {
            const { top, bottom } = ele.getBoundingClientRect();
            if(window.innerHeight - bottom <= (height||200)) setPos({ bottom: '50px' });
            else setPos({ top: '50px' });
        }
    }, []);

    function handleChange(e) {
        const { value } = e.target;
        setLists(rawLists.filter(val => val.val.toLowerCase().startsWith(value.toLowerCase())));
    };

    const selectfn = (val) => {
        const arr = [...selectedLists];
        setLists(lists.map(list => {
            // if(list.checked) arr.push(list.val);
            if(lists.val === val) return { ...list, checked: !list.checked };
            return list;
        }));
        arr.push(val);
        setSelectedLists(arr);
    };

    function dropDownClick() {
        selectFn(lists.filter(val => val.checked).map(val => val.val));
        setShowDropdown(!showDropdown);
    };

    return (
        <div className={`${class_name||'m_ci_w-d'} multi-choice-input-with-dropdown`}>
            <div className="mciwd-input-box" id="mciwd-input">
                <div className="mciwd-input">
                    <div className="mciwdi">
                        {selectedLists.length === 0 ?
                        <span className="mciwdi-placeholder">{placeholder}</span> :
                        selectedLists.map((val, idx) => (
                            <div className="mciwd-div" key={`mciwd-${idx}`}>
                                <span>{val.val}</span>
                                <AiOutlineClose className='mciwd-div-icon cursor' />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mciwd-icon-div cursor" onClick={() => dropDownClick()}>
                    <MdOutlineArrowDropDown className={`mciwd-icon ${showDropdown}`} />
                </div>
            </div>
            <div className={`mciwd-dropdown ${showDropdown}`} style={{...pos}}>
                <div className='hide_scrollbar'>
                    <div className="mciwdd">
                        <div className="mciwdd-div for-input">
                            <input className='mciwdd-input' placeholder="Search" onChange={handleChange} />
                        </div>
                        <div className='mciwdd-overflow hide_scrollbar'>
                            <div>
                                {lists.map((val, idx) => (
                                    <div className="mciwdd-div" key={`mciwdd-${idx}`} onClick={() => selectfn(val)}>
                                        <span>{val.val}</span>
                                        <FaCircleCheck className="mciwddd-icon cursor" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiChoiceInputWithDropdown;