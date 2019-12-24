import { SubMenu } from "../components/NavBar/SubMenu/SubMenu";
import { MenuItem } from "../components/NavBar/MenuItem/MenuItem";
import { LetterIcon } from '../components/NavBar/LetterIcon/LetterIcon';

export const navItems = [
    {
        title: 'Voucher',
        shortHand: 'V',
        Component: SubMenu,
        to: '/a/voucher',
        CollapsedIcon: LetterIcon,
        items: [
            {
                title: 'Active',
                Component: MenuItem,
                to: '/a/voucher/active'
            },
            {
                title: 'Manage Voucher',
                Component: MenuItem,
                to: '/a/voucher/manage'
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
                title: 'Active',
                Component: MenuItem,
                to: '/a/combo/active'
            },
            {
                title: 'Manage Combo',
                Component: MenuItem,
                to: '/a/combo/manage'
            }
        ]
    },
    {
        title: 'Campaign',
        shortHand: 'CP',
        Component: MenuItem,
        to: '/a/campaign/manage',
    },
    {
        title: 'Policy',
        shortHand: 'P',
        Component: MenuItem,
        to: '/a/policy'
    },
    {
        title: 'Report',
        shortHand: 'R',
        Component: MenuItem,
        to: '/a/report',
        CollapsedIcon: LetterIcon
    }
]