// Source Imports
import React, { useState } from "react";
import ExpandedCategoryPage from "../components/Explore/ExpandedCategoryPage";
import MainExplorePage from "../components/Explore/MainExplorePage";


export default function SupplementInfoPage(): JSX.Element {
    const [expand, setExpand] = useState<"none" | "Exercise" | "General Health" | "Brain Health" | "Bone and Joint" | "Anxiety/Sleep">("none");

    return(
        <>
            { expand === "none" ? 
                <MainExplorePage setExpand={setExpand}></MainExplorePage>
                : 
                <ExpandedCategoryPage setExpand={setExpand} expand={expand}></ExpandedCategoryPage>
            }
        </>
    );
}
