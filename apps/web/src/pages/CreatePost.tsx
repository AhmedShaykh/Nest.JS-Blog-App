import { useState, type FormEvent } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import axiosInstance from "@/lib/service";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreatePost = () => {

    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();

        if (!title.trim() || !content.trim()) {

            alert("Please fill in both the title and content fields.");

            return;

        }

        try {

            const res = await axiosInstance.post("/post", {
                title,
                content,
                isPublished: true
            });

            if (res.data) {

                navigate("/");

            }

        } catch (error) {

            console.log("Failed to add post:", error);

        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4 sm:px-6 py-10 flex justify-center items-start">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-3xl"
            >
                <Card className="rounded-2xl">
                    <CardContent className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4 sm:mb-6">
                            Create A New Post
                        </h1>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                placeholder="Post Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="bg-white/5 border border-white/20 text-white placeholder:text-white/40"
                            />

                            <Textarea
                                placeholder="Write your post content here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="bg-white/5 border border-white/20 text-white placeholder:text-white/40"
                            />

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold shadow-md transition-all duration-300"
                            >
                                Publish Post
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
};

export default CreatePost;