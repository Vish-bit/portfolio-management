import { Home, Briefcase, FlaskConical, Archive, UserPlus, Gift, User } from 'lucide-react';

const Sidebar = () => (
    <aside className="bg-white w-58 p-4 shadow-md hidden md:block">
        <nav className="space-y-4">
            <div>
                <img src="public\app-logo.svg" alt="logo" width="90" />
            </div>
            <a href="/" className="block text-gray-600 hover:text-green-700 text-xs font-medium flex items-center gap-2">
                <Home size="14" color="#6a7282" />
                <span>Home</span>
            </a>
            <a href="/portfolios" className="block text-gray-600 hover:text-green-700 text-xs font-medium flex items-center gap-2">
                <Briefcase size="14" color="#6a7282" />
                <span>Portfolios</span>
            </a>
            <a href="#" className="block text-gray-600 hover:text-green-700 text-xs font-medium flex items-center gap-2">
                <FlaskConical size="14" color="#6a7282" />
                <span>Experimentals</span>
            </a>
            <a href="#" className="block text-gray-600 hover:text-green-700 text-xs font-medium flex items-center gap-2">
                <Archive size="14" color="#6a7282" />
                <span>Slack Archives</span>
            </a>
            <a href="#" className="block text-gray-600 hover:text-green-700 text-xs font-medium flex items-center gap-2">
                <UserPlus size="14" color="#6a7282" />
                <span>Refer a friend</span>
            </a>
            <a href="#" className="block text-gray-600 hover:text-green-700 text-xs font-medium flex items-center gap-2">
                <Gift size="14" color="#6a7282" />
                <span>Gift a subscription</span>
            </a>
            <a href="#" className="block text-gray-600 hover:text-green-700 text-xs font-medium flex items-center gap-2">
                <User size="14" color="#6a7282" />
                <span>Account</span>
            </a>
        </nav>
    </aside>
)

export default Sidebar