import Loadable from 'react-loadable'

export const Home = Loadable({
    loader: () => import('../containers/Home'),
    loading: any => null,
    delay: 300
})

export const Topic = Loadable({
    loader: () => import('../containers/Topic'),
    loading: any => null,
    delay: 300 
})

export const User = Loadable({
    loader: () => import('../containers/User'),
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
    loader: () => import('../containers/Messages'),
    loading: any => null,
    delay: 300
})

export const Release = Loadable({
    loader: () => import('../pages/release/Release'),
    loading: any => null,
    delay: 300
})