// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: 'fa-solid fa-table-columns',
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: 'fa-solid fa-user',
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  {
    title: 'Short Film',
    path: '/dashboard/shortfilm',
    icon: 'fa-solid fa-film',
  },
  {
    title: 'Audio Story',
    path: '/dashboard/audiostory',
    icon: 'fa-solid fa-headphones',
  },
  {
    title: 'Web Series',
    path: '/dashboard/webseries',
    icon: 'fa-solid fa-photo-film',
  },
  {
    title: 'Cast & Crew',
    path: '/dashboard/Cast&Crew',
    icon: 'fa-solid fa-users',
  },

  {
    title: 'login',
    path: '/login',
    icon: "fa-solid fa-right-to-bracket",
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
