//client/src/components/NavOption/NavOption.tsx

//Core
import { useState, useEffect, MouseEventHandler } from "react";

//Style
import "./NavOption.css";


//Props type
type NavOptionProps = {
    color: string,
    label: string,
    onClick?: MouseEventHandler
}

export default function NavOption(props: NavOptionProps){



    return(
        <div className="NavOption" style={{color: props.color}} onClick={props.onClick}>
            {props.label}
        </div>
    )
}
