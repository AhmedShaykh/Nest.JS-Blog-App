import { useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Signup = () => {

    const token = localStorage.getItem("token");

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { signup } = useAuth();

    const handleSignup = async (e: any) => {

        e.preventDefault();

        try {

            const success = await signup(name, email, password);

            if (success) {

                navigate("/");

            }

        } catch (error) {

            console.log(error);

        }

    };

    if (token) {

        return <Navigate to="/" replace />;

    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4">
            <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <Card className="rounded-2xl p-6">
                    <CardContent>
                        <h2 className="text-3xl font-extrabold! text-white mb-6 text-center">
                            SIGN UP
                        </h2>

                        <form className="space-y-4" onSubmit={handleSignup}>
                            <Input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-white/5 border border-white/20 text-white placeholder:text-white/40"
                            />

                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white/5 border border-white/20 text-white placeholder:text-white/40"
                            />

                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-white/5 border border-white/20 text-white placeholder:text-white/40"
                            />

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-blue-500 hover:to-pink-500 text-white font-bold shadow-md transition-all duration-300"
                            >
                                Create Account
                            </Button>
                        </form>

                        <p className="text-sm text-white/50 mt-4 text-center">
                            Already have an account? {" "}

                            <span className="text-blue-400 hover:underline cursor-pointer" onClick={() => navigate("/login")}>
                                Login
                            </span>
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
};

export default Signup;