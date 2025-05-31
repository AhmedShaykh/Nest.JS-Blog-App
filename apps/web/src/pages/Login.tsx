import { useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = async (e: any) => {

        e.preventDefault();

        setLoading(true);

        try {

            const success = await login(email, password);

            if (success) {

                navigate("/");

            }

        }
        catch (error: any) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

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
                            LOGIN
                        </h2>

                        <form className="space-y-4" onSubmit={handleLogin}>
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
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold shadow-md transition-all duration-300"
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </Button>
                        </form>

                        <p className="text-sm text-white/50 mt-4 text-center">
                            {`Don’t have an account?`} {" "}

                            <span className="text-blue-400 hover:underline cursor-pointer" onClick={() => navigate("/signup")}>
                                Register
                            </span>
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
};

export default Login;