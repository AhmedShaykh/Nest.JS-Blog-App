import { useEffect, useState } from "react";
import axiosInstance from "@/lib/service";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Post {
    _id: any;
    title: string;
    user: string;
    content: string;
    date: string;
    summary: string;
};

const Home = () => {

    const [posts, setPosts] = useState<Post[]>([]);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchPost = async () => {

            try {

                let res = await axiosInstance.get("/post");

                setPosts(res.data);

                console.log("id", res.data);

            } catch (error) {

                console.log("Failed To Load Profile.", error);

            }

        };

        fetchPost();

    }, []);

    const shuffle = (arr: Post[]) => [...arr].sort(() => 0.5 - Math.random());

    const randomIndex = Math.floor(Math.random() * posts.length);

    const featuredPost: any = posts[randomIndex];

    const trendingPosts = shuffle(posts).slice(1, 4);

    const otherPosts = shuffle(posts).slice(2);

    const tags = ["#React", "#Tailwind", "#Next.JS", "#Express", "#Nest.JS"];

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-10"
            >
                <h1 className="text-5xl font-extrabold! text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 tracking-wider text-center pt-10 pb-5">
                    Welcome to BlogVerse
                </h1>

                <p className="text-white/60 text-center mt-2">
                    Where developers write, share, and glow ✨
                </p>
            </motion.div>

            <div className="flex flex-wrap gap-3 justify-center mb-10">
                {tags.map((tag) => (
                    <motion.div
                        key={tag}
                        whileHover={{ scale: 1.1 }}
                        className="px-4 py-1 bg-white/10 border border-white/10 text-white text-sm rounded-full backdrop-blur-md hover:bg-purple-500/30 transition"
                    >
                        {tag}
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-start mb-6">
                <button
                    onClick={() => navigate("/create")}
                    className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl shadow-lg transition-all"
                >
                    <PlusCircle size={18} />

                    Create New Post
                </button>
            </div>

            {featuredPost && (
                <div className="my-14">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-gradient-to-br from-pink-500/10 via-purple-600/10 to-blue-500/10 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-lg"
                    >
                        <h2 className="text-2xl font-bold text-white/80 mb-2">
                            🌟 Featured Post
                        </h2>

                        <h3 className="text-xl font-semibold text-purple-300">
                            {featuredPost.title}
                        </h3>

                        <p className="text-white/60 mt-2">
                            {featuredPost.summary}
                        </p>

                        <button
                            className="mt-4 px-4 py-2 bg-blue-600/60 text-white rounded-md hover:bg-pink-500/60 transition-all text-sm cursor-pointer"
                            onClick={() => navigate(`/post/${featuredPost._id}`)}
                        >
                            Read Featured
                        </button>
                    </motion.div>
                </div>
            )}

            {trendingPosts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trendingPosts.map((post: Post) => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition backdrop-blur"
                        >
                            <h3 className="text-xl font-semibold text-white/80 mb-4">
                                Trending 🔥
                            </h3>

                            <h4 className="text-lg font-semibold text-white">
                                {post.title}
                            </h4>

                            <p className="text-sm text-white/60 mt-1 line-clamp-2">
                                {post.content}
                            </p>

                            <button
                                onClick={() => navigate(`/post/${post._id}`)}
                                className="mt-2 text-blue-400 hover:underline text-sm"
                            >
                                Read More →
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                {otherPosts.map((post) => (
                    <motion.div
                        key={post._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-md hover:shadow-purple-700/40 hover:scale-[1.01] transition-all duration-300"
                    >
                        <h2 className="text-2xl font-semibold text-purple-300">
                            {post.title}
                        </h2>

                        <p className="text-sm text-white/40 mt-1">
                            {new Date(post.date).toDateString()}
                        </p>

                        <p className="text-white/80 mt-4 line-clamp-3">
                            {post.content}
                        </p>

                        <button
                            onClick={() => navigate(`/post/${post._id}`)}
                            className="mt-4 text-sm text-blue-400 hover:underline"
                        >
                            Read More →
                        </button>

                    </motion.div>
                ))}
            </div>
        </>
    )
};

export default Home;