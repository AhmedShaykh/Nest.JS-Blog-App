import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import ProfilePage from "./pages/ProfilePage";
import PostPage from "./pages/PostPage";
import Layout from "./Components/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Signup />} />

                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <Home />
                                </Layout>
                            </ProtectedRoute>
                        } />

                    <Route
                        path="/create"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <CreatePost />
                                </Layout>
                            </ProtectedRoute>
                        } />

                    <Route
                        path="/post/:id"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <PostPage />
                                </Layout>
                            </ProtectedRoute>
                        } />

                    <Route
                        path="/profile/"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <ProfilePage />
                                </Layout>
                            </ProtectedRoute>
                        } />
                </Routes>
            </BrowserRouter>
        </>
    )
};

export default App;