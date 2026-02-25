import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Gem, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const { t } = useTranslation();
    const { signIn, user } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    if (user) {
        navigate('/admin/dashboard', { replace: true });
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signIn(email, password);
            toast.success('Welcome back!');
            navigate('/admin/dashboard');
        } catch (err) {
            toast.error(err.message || 'Login failed');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gold-gradient flex items-center justify-center mx-auto shadow-lg shadow-gold-500/20">
                        <Gem className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-heading font-bold text-white mt-4">{t('admin.login')}</h1>
                    <p className="text-gray-500 text-sm mt-1">Access the admin dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="card p-8 space-y-5">
                    <div>
                        <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">
                            {t('admin.email')}
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                            placeholder="admin@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">
                            {t('admin.password')}
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <Lock className="w-4 h-4" />
                                {t('admin.signIn')}
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-gray-600 text-xs mt-6">
                    Protected by Supabase Auth. Only authorized admins can sign in.
                </p>
            </div>
        </div>
    );
}
