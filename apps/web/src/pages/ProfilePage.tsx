import { useEffect, useState } from "react";
import axiosInstance from "@/lib/service";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

interface Post {
    _id: string;
    title: string;
    excerpt: string;
};

interface User {
    id: string;
    name: string;
    email: string;
};

const ProfilePage = () => {

    const [user, setUser] = useState<User | null>(null);

    const [posts, setPosts] = useState<Post[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<string | null>(null);

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    useEffect(() => {

        const fetchProfileData = async () => {
            try {

                let res;

                let posts;

                if (id) {

                    res = await axiosInstance.get(`/user/${id}`);

                    posts = await axiosInstance.get(`/post/author/${id}`);

                } else {

                    res = await axiosInstance.get(`/user/me`);

                    posts = await axiosInstance.get(`/post/posts`);

                }

                setUser(res.data);

                setPosts(posts.data);

            } catch (err: any) {

                setError(`Failed To Load Profile. , ${err}`);

            } finally {

                setLoading(false);

            }

        };

        fetchProfileData();

    }, []);

    if (loading) {

        return <div>Loading...</div>;

    }

    if (error) {

        return <div>{error}</div>;

    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-4xl p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl p-8 relative">
                        <div className="z-10 relative">
                            <h2 className="text-3xl font-bold text-white mb-6 text-center tracking-widest">
                                Profile
                            </h2>

                            {!user && (
                                <div className="text-white mb-8">
                                    Not Found
                                </div>
                            )}

                            {user && (
                                <div className="text-white mb-8">
                                    <p className="font-semibold text-lg">
                                        Username: {user.name}
                                    </p>

                                    <p className="text-sm text-white/70">
                                        Email: {user.email}
                                    </p>
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-white mb-6">
                                Posts
                            </h3>

                            {Array.isArray(posts) && posts.length > 0 ? (
                                <div className="space-y-4">
                                    {posts.map((post: Post) => (
                                        <div
                                            className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-md hover:bg-white/20 transition-all"
                                            key={post._id}
                                        >
                                            <h4 className="text-xl text-white font-semibold">
                                                {post.title}
                                            </h4>

                                            <p className="text-white/60">
                                                {post.excerpt}
                                            </p>

                                            <Button
                                                onClick={() => navigate(`/post/${post._id}`)}
                                                className="text-blue-400 hover:underline mt-4"
                                            >
                                                Read More
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-white/60">
                                    You have not written any posts yet.
                                </p>
                            )}
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
};

export default ProfilePage;