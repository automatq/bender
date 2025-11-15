'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    packageType: 'single-page',
    price: '',
    userId: '',
    status: 'pending',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/signin');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    setUser(parsedUser);
    fetchData(token);
  }, []);

  const fetchData = async (token: string) => {
    try {
      const [projectsRes, usersRes, statsRes] = await Promise.all([
        fetch('/api/projects', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch('/api/admin/users', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch('/api/admin/stats', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      if (projectsRes.ok) setProjects(await projectsRes.json());
      if (usersRes.ok) setUsers(await usersRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleCreateProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      packageType: 'single-page',
      price: '',
      userId: '',
      status: 'pending',
      startDate: '',
      endDate: '',
    });
    setShowProjectModal(true);
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      packageType: project.packageType,
      price: project.price.toString(),
      userId: project.userId,
      status: project.status,
      startDate: project.startDate ? format(new Date(project.startDate), 'yyyy-MM-dd') : '',
      endDate: project.endDate ? format(new Date(project.endDate), 'yyyy-MM-dd') : '',
    });
    setShowProjectModal(true);
  };

  const handleSaveProject = async () => {
    const token = localStorage.getItem('token');
    const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
    const method = editingProject ? 'PATCH' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...projectForm,
          price: parseFloat(projectForm.price),
        }),
      });

      if (response.ok) {
        toast.success(editingProject ? 'Project updated!' : 'Project created!');
        setShowProjectModal(false);
        fetchData(token!);
      } else {
        toast.error('Failed to save project');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success('Project deleted!');
        fetchData(token!);
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
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
      <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-lg border-b border-yellow-600/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-yellow-600">Admin</span> Dashboard
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all font-semibold shadow-lg shadow-yellow-500/30"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="bg-white/50 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {['overview', 'projects', 'clients', 'calendar'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-yellow-600 text-yellow-600'
                    : 'border-transparent text-gray-600 hover:text-black'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === 'overview' && stats && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold text-black mb-8">Overview</h1>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-gradient-to-br from-yellow-500/90 to-yellow-600/90 backdrop-blur-xl rounded-xl shadow-lg p-6 text-white border border-yellow-400/30">
                <div className="text-3xl font-bold mb-1">
                  ${stats.totalRevenue.toLocaleString()}
                </div>
                <div className="text-yellow-100">Total Revenue</div>
              </div>
              <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm p-6 border border-white/20 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-black mb-1">{stats.totalProjects}</div>
                <div className="text-gray-600">Total Projects</div>
              </div>
              <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm p-6 border border-white/20 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-black mb-1">{stats.totalClients}</div>
                <div className="text-gray-600">Total Clients</div>
              </div>
              <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm p-6 border border-white/20 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {stats.projectStats.find((s: any) => s.status === 'in-progress')?._count || 0}
                </div>
                <div className="text-gray-600">In Progress</div>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-black mb-6">Revenue Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#eab308" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-5xl font-bold text-black">Projects</h1>
              <button
                onClick={handleCreateProject}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 shadow-lg shadow-yellow-500/30 transition-all"
              >
                + New Project
              </button>
            </div>

            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm p-6 border border-white/20 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-black mb-1">{project.title}</h3>
                      <p className="text-gray-600 mb-2">{project.description}</p>
                      <div className="text-sm text-gray-500">
                        Client: {project.user?.name} ({project.user?.email})
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                      <button
                        onClick={() => handleEditProject(project)}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Package:</span>
                      <span className="ml-2 font-semibold">{project.packageType}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Price:</span>
                      <span className="ml-2 font-semibold">${project.price.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Created:</span>
                      <span className="ml-2 font-semibold">
                        {format(new Date(project.createdAt), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Timeline:</span>
                      <span className="ml-2 font-semibold">
                        {project.startDate && project.endDate
                          ? `${format(new Date(project.startDate), 'MMM dd')} - ${format(
                              new Date(project.endDate),
                              'MMM dd'
                            )}`
                          : 'Not set'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'clients' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold text-black mb-8">Clients</h1>
            <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm overflow-hidden border border-white/20">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Projects</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{client.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{client.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{client._count.projects}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {format(new Date(client.createdAt), 'MMM dd, yyyy')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'calendar' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold text-black mb-8">Project Calendar</h1>
            <div className="bg-white/70 backdrop-blur-xl rounded-xl shadow-sm p-8 border border-white/20">
              <div className="space-y-4">
                {projects
                  .filter((p) => p.startDate && p.endDate)
                  .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                  .map((project) => (
                    <div key={project.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-bold text-black">{project.title}</h3>
                        <p className="text-sm text-gray-600">{project.user?.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">
                          {format(new Date(project.startDate), 'MMM dd, yyyy')} -{' '}
                          {format(new Date(project.endDate), 'MMM dd, yyyy')}
                        </div>
                        <span
                          className={`inline-block mt-1 px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-black mb-6">
              {editingProject ? 'Edit Project' : 'New Project'}
            </h2>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:border-yellow-600 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                  <select
                    value={projectForm.userId}
                    onChange={(e) => setProjectForm({ ...projectForm, userId: e.target.value })}
                    className="w-full px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:border-yellow-600 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="">Select Client</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:border-yellow-600 bg-white/50 backdrop-blur-sm"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Package Type</label>
                  <select
                    value={projectForm.packageType}
                    onChange={(e) => setProjectForm({ ...projectForm, packageType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                  >
                    <option value="single-page">Single Page</option>
                    <option value="multi-page">Multi Page</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    value={projectForm.price}
                    onChange={(e) => setProjectForm({ ...projectForm, price: e.target.value })}
                    className="w-full px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:border-yellow-600 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                    className="w-full px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:border-yellow-600 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={projectForm.startDate}
                    onChange={(e) => setProjectForm({ ...projectForm, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:border-yellow-600 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={projectForm.endDate}
                    onChange={(e) => setProjectForm({ ...projectForm, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:border-yellow-600 bg-white/50 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowProjectModal(false)}
                className="flex-1 py-3 border border-white/30 rounded-lg font-semibold hover:bg-white/50 backdrop-blur-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProject}
                className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 shadow-lg shadow-yellow-500/30"
              >
                {editingProject ? 'Update' : 'Create'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
