
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, User } from '../types';
import { storageService } from '../services/storageService';

interface DashboardProps {
  user: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [forms, setForms] = useState<Form[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setForms(storageService.getForms());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this form and all its responses?')) {
      storageService.deleteForm(id);
      setForms(storageService.getForms());
    }
  };

  const handleShare = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#/form/${id}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Feedback Form',
        text: 'Please fill out this evaluation.',
        url: url
      }).catch(() => {
        // Fallback to clipboard if share is cancelled or fails
        copyToClipboard(id, url);
      });
    } else {
      copyToClipboard(id, url);
    }
  };

  const copyToClipboard = (id: string, url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Your Feedback Forms</h1>
          <p className="text-slate-500 mt-1">Manage and track your active evaluations.</p>
        </div>
        {user && (
          <Link 
            to="/create" 
            className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-95"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Create New Form</span>
          </Link>
        )}
      </div>

      {!user ? (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-12 text-center">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-indigo-600 text-2xl">
            <i className="fa-solid fa-lock"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Ready to evaluate?</h2>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">Log in to start creating custom feedback forms for your events or courses.</p>
          <p className="text-xs text-slate-400">P.S. You can still view public forms if you have their links!</p>
        </div>
      ) : forms.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-20 text-center">
          <i className="fa-solid fa-file-circle-plus text-5xl text-slate-300 mb-4"></i>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">No forms yet</h2>
          <p className="text-slate-500 mb-6">Create your first evaluation form to start collecting insights.</p>
          <Link to="/create" className="text-indigo-600 font-medium hover:underline">Start creating now &rarr;</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map(form => (
            <div 
              key={form.id} 
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${form.isPublished ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {form.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => handleShare(form.id, e)}
                      className="text-slate-400 hover:text-indigo-600 relative"
                      title="Share form"
                    >
                      <i className={`fa-solid ${copiedId === form.id ? 'fa-check text-green-500' : 'fa-share-nodes'}`}></i>
                      {copiedId === form.id && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                          Copied!
                        </span>
                      )}
                    </button>
                    <button 
                      onClick={(e) => { e.preventDefault(); navigate(`/edit/${form.id}`); }}
                      className="text-slate-400 hover:text-indigo-600"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button 
                      onClick={(e) => handleDelete(form.id, e)}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{form.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-4">{form.description}</p>
                <div className="flex items-center text-xs text-slate-400 space-x-4">
                  <span><i className="fa-regular fa-calendar-check mr-1"></i> {new Date(form.createdAt).toLocaleDateString()}</span>
                  <span><i className="fa-solid fa-list-check mr-1"></i> {form.questions.length} Questions</span>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl flex justify-between gap-3">
                <Link 
                  to={`/form/${form.id}`} 
                  className="flex-1 text-center bg-white border border-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-50"
                >
                  View
                </Link>
                <Link 
                  to={`/analytics/${form.id}`} 
                  className="flex-1 text-center bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
                >
                  Results
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
