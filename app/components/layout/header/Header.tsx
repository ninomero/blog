import React from 'react'
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { getCategories } from '@/libs/microcms';
import { use } from "react";
import ScrollTop from '../../elements/transition/ScrollTop';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const Header = () => {
    // カテゴリの取得
    const categories = use(getCategories({ limit: 50 }));

    const title = "Blog";

    return (
        <Navbar disableAnimation isBordered>
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <p className="font-bold text-inherit title">
                        <a href='/'>
                            {title}
                        </a>
                    </p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    <p className="font-bold text-inherit title">
                        <a href='/'>
                            {title}
                        </a>
                    </p>
                </NavbarBrand>
                <NavbarBrand className="gap-4" >
                    {categories.contents.map((item, index) => (
                        <NavbarItem key={`${item}-${index}`}>
                            <Link className="text-sm" color="foreground" size="lg" href={`/category/${item.id}`}>
                                {item.name}
                            </Link>
                        </NavbarItem>
                    ))}
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <ScrollTop>
                        <KeyboardDoubleArrowUpIcon />
                    </ScrollTop>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {categories.contents.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color="foreground"
                            href={`/category/${item.id}`}
                            size="lg"

                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

export default Header