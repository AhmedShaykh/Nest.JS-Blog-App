import { useEffect, useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import axiosInstance from "@/lib/service";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    coverImage?: string;
    createdAt: string;
};

const PostPage = () => {

    const [error, setError] = useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(true);

    const [post, setPost] = useState<Post | null>(null);

    const [authorData, setAuthorData] = useState<any>({});

    const { id } = useParams<{ id: string }>();

    useEffect(() => {

        const fetchPostData = async () => {

            try {

                const response = await axiosInstance.get(`/post/${id}`);

                setPost(response.data);

                const authorResponse = await axiosInstance.get(`/user/${response.data.user._id}`);

                setAuthorData(authorResponse.data);

            } catch (error) {

                setError("Failed To Load Post.");

            } finally {

                setLoading(false);

            }

        };

        fetchPostData();

    }, [id]);

    if (loading) return <div className="text-white p-6">Loading...</div>;

    if (error) return <div className="text-red-400 p-6">{error}</div>;

    if (!post) return <div className="text-white p-6">No post found.</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4 sm:px-6 py-10 flex justify-center items-start">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl"
            >
                <Card className="relative backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="relative z-10 p-4 sm:p-8 space-y-6">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                            {post.title}
                        </h1>

                        <div className="text-sm text-white/60">
                            By {" "}

                            <span className="text-blue-400 cursor-pointer">
                                {authorData.name} {" "}
                            </span>

                            {new Date(post.createdAt).toLocaleDateString()}
                        </div>

                        {post.coverImage && (
                            <img
                                src={post.coverImage}
                                alt="Cover"
                                className="w-full rounded-xl border border-white/20 mt-4"
                            />
                        )}

                        <div className="prose prose-invert prose-p:text-white prose-headings:text-blue-300 max-w-none text-white">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
};

export default PostPage;