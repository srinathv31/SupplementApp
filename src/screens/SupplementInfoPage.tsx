// Source Imports
import React, { useState } from "react";
import ExpandedCategoryPage from "../components/Explore/ExpandedCategoryPage";
import MainExplorePage from "../components/Explore/MainExplorePage";
import { AppProps } from "../interfaces/Props";


export default function SupplementInfoPage(AllProps: AppProps): JSX.Element {
    const [expand, setExpand] = useState<"none" | "Exercise" | "General Health" | "Brain Health" | "Bone and Joint" | "Anxiety/Sleep">("none");

    return(
        <>
            { expand === "none" ? 
                <MainExplorePage AllProps={AllProps} setExpand={setExpand}></MainExplorePage>
                : 
                <ExpandedCategoryPage AllProps={AllProps} setExpand={setExpand} expand={expand}></ExpandedCategoryPage>
            }
        </>
    );
}
