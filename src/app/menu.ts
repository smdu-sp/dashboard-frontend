import { Dashboard, Business, Handyman, Home, Person } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';

export interface IMenuOption {
    title:  string;
    href:   string;
    name:   string;
    icon:   any; 
};

export interface IMenu {
    userOptions:    IMenuOption[];
    adminOptions:   IMenuOption[];
}


export const menu: IMenu = {
    userOptions: [
        {
            title: 'Página Inicial',
            href: '/',
            name: '/',
            icon: Home,
        },
        {
            title: 'Tickets para avaliar',
            href: '/avaliacao',
            name: 'avaliacao',
            icon: StarIcon,
        },
    ],
    adminOptions: [
        {
            title: 'Usuários',
            href: '/usuarios',
            name: 'usuarios',
            icon: Person,
        },
        {
            title: 'Dashboard',
            href: '/dashboard',
            name: 'dashboard',
            icon: Dashboard,
        }            
    ]
}