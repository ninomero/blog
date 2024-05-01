"use client";

import { Button } from "@nextui-org/react";
import React, { FunctionComponent } from "react";
import { Link as Scroll } from "react-scroll";

interface Props {
    children: React.ReactNode;
}

const ScrollTop: FunctionComponent<Props> = ({ children }) => {
    return (
        <Scroll to='top' smooth={true} duration={600} offset={-100}>{children}</Scroll>
    );
}

export default ScrollTop