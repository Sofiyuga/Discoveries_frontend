import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import PioneerPage from "./pages/PioneerPage/PioneerPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
import PioneersPage from "./pages/PioneersPage/PioneersPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import DiscoveryConstructor from "./components/DiscoveryConstructor/DiscoveryConstructor";
import DiscoveryPage from "./pages/DiscoveryPage/DiscoveryPage";
import DiscoveriesPage from "./pages/DiscoveriesPage/DiscoveriesPage";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && !is_moderator && location.pathname.endsWith("pioneers") && <DiscoveryConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/geohistory">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/pioneers" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/pioneers" element={<PioneersPage />} />

                                    <Route path="/pioneers/:id" element={<PioneerPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/discoveries/:id" element={<DiscoveryPage />} />

                                    <Route path="/discoveries" element={<DiscoveriesPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App
