import { lazy } from "react";
import Loadable from "../../components/Loading/Loadable";

const MainLayout = Loadable(lazy(() => import('../../components/Layout/MainLayout')));

// Auths
const SignInPage = Loadable(lazy(() => import('../../screens/SignIn')));
const HomePage = Loadable(lazy(() => import('../../screens/Home')));
const AttendancePage = Loadable(lazy(() => import('../../screens/Attendance')));
const ProfilePage = Loadable(lazy(() => import('../../screens/Profile')));




const appRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'attendances', element: <AttendancePage /> },
            { path: 'accounts', element: <ProfilePage /> },
        ],
    },
    {
        path: 'auths',
        children: [
            { path: 'sign-in', element: <SignInPage /> },
        ],
    }
];

export default appRoutes;