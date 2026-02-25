import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    LayoutDashboard, Package, FolderTree, MessageSquare,
    BarChart3, LogOut, Gem, ChevronRight, Menu, X
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, labelKey: 'admin.dashboard' },
    { path: '/admin/products', icon: Package, labelKey: 'admin.products' },
    { path: '/admin/categories', icon: FolderTree, labelKey: 'admin.categories' },
    { path: '/admin/inquiries', icon: MessageSquare, labelKey: 'admin.inquiries' },
    { path: '/admin/analytics', icon: BarChart3, labelKey: 'admin.analytics' },
];

export default function AdminLayout() {
    const { t } = useTranslation();
    const { signOut, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        toast.success('Signed out');
        navigate('/admin/login');
    };

    const Sidebar = ({ mobile = false }) => (
        <div className={`flex flex-col h-full ${mobile ? '' : 'w-64'}`}>
            <div className="p-6 border-b border-gray-800/50">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
                        <Gem className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-heading font-bold text-gradient text-lg">Jella Ganesh</span>
                </Link>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map(({ path, icon: Icon, labelKey }) => (
                    <Link
                        key={path}
                        to={path}
                        onClick={() => mobile && setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${location.pathname === path
                            ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                            : 'text-gray-500 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        {t(labelKey)}
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-800/50">
                <div className="text-xs text-gray-600 mb-2 px-4 truncate">{user?.email}</div>
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors w-full"
                >
                    <LogOut className="w-4 h-4" />
                    {t('admin.signOut')}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-950 flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 bg-gray-900/50 border-r border-gray-800/50 fixed h-screen">
                <Sidebar />
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
                    <div className="absolute left-0 top-0 h-full w-64 bg-gray-900 shadow-xl">
                        <Sidebar mobile />
                    </div>
                </div>
            )}

            {/* Main content */}
            <main className="flex-1 lg:ml-64">
                <header className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/50 px-4 lg:px-8 py-4 flex items-center gap-4">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400">
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <span>Jella Ganesh</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-gray-300 capitalize">
                            {location.pathname.split('/').pop()}
                        </span>
                    </div>
                </header>
                <div className="p-4 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
