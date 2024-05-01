import {
  IconDeviceTvOld,
  IconFriends,
  IconSmartHome,
  IconUsersGroup,
} from "@tabler/icons-react";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
const NavbarItems: MenuitemsType[] = [
  {
    title: "Home",
    icon: IconSmartHome,
    href: "/",
  },
  {
    title: "Watch",
    icon: IconDeviceTvOld,
    href: "/watch",
  },
  {
    title: "Groups",
    icon: IconUsersGroup,
    href: "/groups",
  },
  {
    title: "Friends",
    icon: IconFriends,
    href: "/friends",
  },
];

export default NavbarItems;
