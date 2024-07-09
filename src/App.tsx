import {
    BrowserRouter,
    Outlet, Route,
    Routes,
    useNavigate
} from 'react-router-dom';
import Buy from './pages/Buy';
import {Dashboard as PageDashboard} from './pages/Dashboard';
import {HiChartPie, HiViewBoards} from "react-icons/hi"
import {Sidebar} from "flowbite-react";
import {AuthProvider, useAuth} from "./hooks/useAuth";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";
import MyProducts from "./components/MyProducts.tsx";
import {Login} from "./components/Login.tsx";
import SignUp from "./components/SignUp.tsx";
import MainNav from "./components/MainNav.tsx";
import HomePage from "./pages/HomePage.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="/product/:productId" element={<Buy/>}/>
                    </Route>
                    <Route path="/dashboard"
                           element={<ProtectedRoute><DashboardLayout/></ProtectedRoute>}>
                        <Route index element={<PageDashboard/>}/>
                        <Route path="/dashboard/products" element={<MyProducts/>}/>
                    </Route>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}


export function DashboardLayout() {
    const navigate = useNavigate()
    const {user} = useAuth()
    return (
        <div>
            <MainNav/>

            <div className='min-h-screen mx-auto container text-sm'>
                <div className="grid grid-cols-4 gap-x-8">
                    <div className='col-span-1 shadow'>
                        <Sidebar aria-label="Default sidebar example">
                            <Sidebar.Items>
                                <Sidebar.ItemGroup>
                                    <Sidebar.Item icon={HiChartPie}>
                                        {user?.name}
                                        <span className="block">{user?.email}</span>
                                    </Sidebar.Item>

                                </Sidebar.ItemGroup>
                                <Sidebar.ItemGroup>
                                    <Sidebar.Item onClick={() => navigate("/dashboard/products")}
                                                  icon={HiChartPie}>
                                        My Products
                                    </Sidebar.Item>
                                    <Sidebar.Item onClick={() => navigate("/dashboard")}
                                                  icon={HiViewBoards} label="all"
                                                  labelColor="dark">
                                        History
                                    </Sidebar.Item>
                                </Sidebar.ItemGroup>
                                <Sidebar.ItemGroup>
                                    <Sidebar.Item href="#" icon={HiChartPie}>
                                        Logout
                                    </Sidebar.Item>
                                </Sidebar.ItemGroup>
                            </Sidebar.Items>
                        </Sidebar>
                    </div>

                    <div className='col-span-3'>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Layout() {
    return (
        <div>
            <MainNav/>

            <div className='min-h-screen mx-auto container'>
                <Outlet/>
            </div>
        </div>
    );
}


