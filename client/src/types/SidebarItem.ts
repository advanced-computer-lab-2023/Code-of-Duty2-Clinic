import { ReactElement } from "react";

type SidebarItem = {
    title: string;
    icon?: ReactElement;
    href?: string;
    items?: SidebarItem[];
};

export default SidebarItem;