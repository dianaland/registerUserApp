import React from "react";
import "./Picture.css";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import {RANDOMUSER, StepTypes} from "./Profileform";

interface OwnProps {
    isLoading: boolean;
    editMode: boolean;
    progress: number;
    image?: string; //define Media Entity?
    step: StepTypes;
}


const Picture: React.FunctionComponent<OwnProps> = ({isLoading, editMode, progress, image, step}) => {


    let loadingClassName = `${progress >= 25 && "Picture-load1"} ${progress >= 50 && "Picture-load2"}
            ${progress >= 75 && "Picture-load3"} ${progress >= 100 && "Picture-load4"}`

    return <div className={`Picture-outerWrapper ${isLoading && editMode && loadingClassName} `}>
        {image && RANDOMUSER &&
        <img src={image} className={`${step !== StepTypes.CREATE && image.length > 1 && "Picture-image"} `}
             alt={"User"}/>}
        <div
            className={"Picture-innerWrapper"}>
            {!RANDOMUSER && <PersonOutlineIcon style={{color: "#22222280", width: 96, height: 109}}/>}
            {(isLoading && editMode) && <div className={"Picture-percentageText"}>{`${progress}%`}</div>}
        </div>
    </div>

}

export default Picture;