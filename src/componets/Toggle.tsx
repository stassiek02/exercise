import {useState} from "react";

export const Toggle =()=>{
const [isToggleOn, setToggleOn] = useState(false);
    return (
        <button className={`switch ${isToggleOn ? 'active' : ''}`} onClick={()=>setToggleOn(prev=>!prev)}>
            <div className={'switch-knob'}></div>
        </button>
    );
};