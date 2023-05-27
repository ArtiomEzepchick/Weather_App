import React from "react"
import classNames from "classnames"

import "./index.scss"

type Props = {
    isModalOpen: boolean;
    children: JSX.Element;
}

const Overlay: React.FC<Props> = ({ isModalOpen, children }) => {
    return (
        <div className={classNames("overlay", isModalOpen && "show")}>
            {children}
        </div>
    )
}

export default Overlay