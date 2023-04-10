import React from "react"
import { copyrightLinks } from "../../helpers/copyrightLinks/copyrightLinks"

import './index.scss'

const CopyrightInfo = (): JSX.Element => {
    return (
        <>
            <p>&#169; 2023 Made by Artsiom Ezepchik</p>
            <section className="copyright-links">
                <p>Contact me:</p>
                {copyrightLinks.map(({ href, iconClassName }): JSX.Element => (
                    <a key={href} target='blank' href={href}>
                        <i className={iconClassName} />
                    </a>
                ))}
            </section>
        </>
    )
}

export default CopyrightInfo