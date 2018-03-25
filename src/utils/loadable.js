import Loadable from 'react-loadable'

export const Home = Loadable({
    loader: () => import('../pages/home/Home'),
    loading: any => null,
    delay: 300
})

export const Topic = Loadable({
    loader: () => import('../containers/Topic'),
    loading: any => null,
    delay: 300 
})

export const User = Loadable({
    loader: () => import('../pages/user/User'),
    loading: any => null,
    delay: 300
})

export const Login = Loadable({
    loader: () => import('../containers/Login'),
    loading: any => null,
    delay: 300
})

export const Header = Loadable({
    loader: () => import('../components/header/Header'),
    loading: any => null,
    delay: 300
})

export const Collections = Loadable({
    loader: () => import('../pages/collections/Collections'),
    loading: any => null,
    delay: 300
})

export const Messages = Loadable({
    loader: () => import('../pages/messages/Messages'),
    loading: any => null,
    delay: 300
})