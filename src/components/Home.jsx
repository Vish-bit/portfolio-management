import posts from "../data/posts.js";
import { Link } from 'react-router-dom';
import { SquareArrowOutUpRight } from 'lucide-react';

const Home = () => {
    return (
        <main className="flex-1 bg-gray-100 py-4 px-32">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Home</h1>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
                <div className="bg-white p-5 rounded-md shadow">
                    <h2 className="font-medium text-xs text-gray-800 mb-2 flex items-center justify-between">
                        <span>Get started</span>
                        <SquareArrowOutUpRight size="12" color="#99a1af" className="cursor-pointer"/>
                    </h2>
                    <p className="text-xs text-gray-600">
                        Read our getting started guide to get the most out of your subscription.
                    </p>
                </div>
                <div className="bg-white p-5 rounded-md shadow">
                    <h2 className="font-medium text-xs text-gray-800  mb-2 flex items-center justify-between">
                        <span>Community</span>
                        <SquareArrowOutUpRight size="12" color="#99a1af" className="cursor-pointer"/>
                    </h2>
                    <p className="text-xs text-gray-600">
                        Join the conversation in our exclusive community on Slack.
                    </p>
                </div>
                <div className="bg-white p-5 rounded-md shadow">
                    <h2 className="font-medium text-xs text-gray-800 mb-2 flex items-center justify-between">
                        <span>Visit website</span>
                        <SquareArrowOutUpRight size="12" color="#99a1af" className="cursor-pointer"/>
                    </h2>
                    <p className="text-xs text-gray-600">
                        Keep up with our latest content directly on our website.
                    </p>
                </div>
            </div>

            {/* Latest Posts */}
            <h2 className="text-md font-semibold mb-4">Latest Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post, idx) => (
                    <div key={idx} className="">
                        <p className="font-medium text-gray-400 text-xs mb-2">{post.date}</p>
                        <h3 className="font-semibold text-gray-800 text-sm mb-2">{post.title}</h3>
                        <p className="text-gray-500 text-xs mb-2 text-justify">{post.summary}</p>
                        <Link to="#" className="text-green-600 text-xs font-medium">
                            Read full post
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Home;