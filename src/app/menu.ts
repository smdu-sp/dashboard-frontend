import { Dashboard, Business, Handyman, Home, Person, FileOpen } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';

export interface IMenuOption {
    title:  string;
    href:   string;
    name:   string;
    icon:   any; 
};

export interface IMenu {
    adminOptions:   IMenuOption[];
    userOptions:    IMenuOption[];
    devOptions:     IMenuOption[];
}


export const menu: IMenu = {
    adminOptions: [
        {
            title: 'Dashboard',
            href: '/',
            name: '/',
            icon: Dashboard,
        },
        {
            title: 'Relatórios',
            href: '/relatorios',
            name: 'relatorios',
            icon: FileOpen,
        }        
    ],
    userOptions: [
        {
            title: 'Tickets para avaliar',
            href: '/avaliacao',
            name: 'avaliacao',
            icon: StarIcon,
        }
    ],
    devOptions: [
        {
            title: 'Usuários',
            href: '/usuarios',
            name: 'usuarios',
            icon: Person,
        }
    ]
}