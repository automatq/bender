'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';

export default function ClientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/signin');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchProjects(token);
  }, []);

  const fetchProjects = async (token: string) => {
    try {
      const response = await fetch('/api/projects', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
      <Toaster position="top-center" />

      {/* Navigation */}
      <nav className="bg-white/50 backdrop-blur-xl shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-black">
            <span className="text-yellow-600">Elite</span>Web
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-black to-gray-900 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-black mb-2">My Projects</h1>
          <p className="text-xl text-gray-600 mb-8">
            Track your projects and stay updated on progress
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm p-6 border border-white/20 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-black mb-1">{projects.length}</div>
              <div className="text-gray-600">Total Projects</div>
            </div>
            <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm p-6 border border-white/20 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {projects.filter((p) => p.status === 'in-progress').length}
              </div>
              <div className="text-gray-600">In Progress</div>
            </div>
            <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm p-6 border border-white/20 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {projects.filter((p) => p.status === 'completed').length}
              </div>
              <div className="text-gray-600">Completed</div>
            </div>
          </div>

          {/* Projects List */}
          <div className="space-y-6">
            {projects.length === 0 ? (
              <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm p-12 text-center border border-white/20">
                <p className="text-gray-600 text-lg mb-4">No projects yet</p>
                <a
                  href="/pricing"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 shadow-lg shadow-yellow-500/30 transition-all"
                >
                  Browse Packages
                </a>
              </div>
            ) : (
              projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm p-6 border border-white/20 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-black mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Package:</span>
                      <span className="ml-2 font-semibold text-black">
                        {project.packageType}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Price:</span>
                      <span className="ml-2 font-semibold text-black">
                        ${project.price.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Created:</span>
                      <span className="ml-2 font-semibold text-black">
                        {format(new Date(project.createdAt), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>

                  {project.startDate && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        Timeline:{' '}
                        {format(new Date(project.startDate), 'MMM dd, yyyy')} -{' '}
                        {project.endDate
                          ? format(new Date(project.endDate), 'MMM dd, yyyy')
                          : 'TBD'}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
