
import { SubMenu } from "../components/NavBar/SubMenu/SubMenu";
import { MenuItem } from "../components/NavBar/MenuItem/MenuItem";
import { LetterIcon } from '../components/NavBar/LetterIcon/LetterIcon';

export const navItems = [
    {
        title: 'Profile',
        shortHand: 'P',
        Component: MenuItem,
        to: '/a/user-profile',
        CollapsedIcon: LetterIcon,
    },
    {
        title: 'Voucher',
        shortHand: 'V',
        Component: SubMenu,
        to: '/a/voucher',
        CollapsedIcon: LetterIcon,
        items: [
            {
                title: 'Public',
                Component: MenuItem,
                to: '/a/voucher/voucher1'
            },
            {
                title: 'Privative',
                Component: MenuItem,
                to: '/a/voucher/voucher2'
            },
            {
                title: 'Buy',
                Component: MenuItem,
                to: '/a/voucher/voucher3'
            }
        ]
    },
    {
        title: "Combo",
        shortHand: 'CB',
        Component: SubMenu,
        to: '/a/combo',
        CollapsedIcon: LetterIcon,
        items: [
            {
                title: 'Combo1',
                Component: MenuItem,
                to: '/a/combo/combo1'
            },
            {
                title: 'Combo2',
                Component: MenuItem,
                to: '/a/combo/combo2'
            },
            {
                title: 'Combo3',
                Component: MenuItem,
                to: '/a/combo/combo3'
            },
            {
                title: 'Combo4',
                Component: MenuItem,
                to: '/a/combo/combo3'
            }
        ]
    },
    {
        title: 'Compaign',
        shortHand: 'CP',
        Component: SubMenu,
        to: '/a/compaign',
        items: [
            {
                title: 'Compaign1',
                Component: MenuItem,
                to: '/a/compaign/compaign1'
            },
            {
                title: 'Compaign2',
                Component: MenuItem,
                to: '/a/compaign/compaign2'
            },
            {
                title: 'Compaign3',
                Component: MenuItem,
                to: '/a/compaign/compaign3'
            }
        ]
    },
    {
        title: 'Report',
        shortHand: 'R',
        Component: MenuItem,
        to: '/a/report',
        CollapsedIcon: LetterIcon
    },
    {
        title: 'Account',
        shortHand: 'A',
        Component: MenuItem,
        to: '/a/account',
        CollapsedIcon: LetterIcon
    }
]
