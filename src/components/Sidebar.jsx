import React from 'react';
import { useLearning } from '../context/LearningContext';
import {
  LayoutDashboard,
  ClipboardCheck,
  BookOpen,
  PenTool,
  Mic,
  BrainCircuit,
  Bookmark,
  Bot,
  BarChart3,
  History,
  Settings,
  LogOut,
  PanelLeftClose,
  AlertTriangle,
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { activeTab, setActiveTab, stats } = useLearning();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'assessment',
      label: 'Initial Assessment',
      icon: ClipboardCheck,
      badge: stats.estimatedLevel === 'Not Assessed' ? 'Start' : null,
      badgeColor: 'bg-brand-100 text-brand-700',
    },
    { id: 'tutor', label: 'AI Personal Tutor', icon: Bot, isHighlight: true },
    { id: 'grammar', label: 'Grammar Practice', icon: BrainCircuit },
    { id: 'writing', label: 'Writing Studio', icon: PenTool },
    { id: 'speaking', label: 'Speaking & Pronunciation', icon: Mic },
    { id: 'reading', label: 'Reading & Comprehension', icon: BookOpen },
    { id: 'vocabulary', label: 'Vocabulary Builder', icon: Bookmark },
    { id: 'analytics', label: 'Progress & Analytics', icon: BarChart3 },
    { id: 'history', label: 'Learning History', icon: History },
    { id: 'settings', label: 'Profile & Settings', icon: Settings },
  ];

  const handleSelect = (tabId) => {
    setActiveTab(tabId);
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header with collapse button */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-sm font-bold text-base">
              IQ
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900">Fluent</span>
              <span className="font-extrabold text-lg text-brand-600">IQ</span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Hide sidebar"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
            title="Hide sidebar"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Learning Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                } ${item.isHighlight && !isActive ? 'hover:bg-brand-50/50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-brand-600'
                        : item.isHighlight
                        ? 'text-brand-500'
                        : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.isHighlight && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* AI Mistake Memory pill */}
        {stats.activeMistakesCount > 0 && (
          <div className="px-4 py-2 mx-3 mb-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
            <div className="flex items-center gap-1.5 font-semibold mb-0.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Mistake Memory</span>
            </div>
            <p className="text-[11px] text-amber-700">
              {stats.activeMistakesCount} active pattern{stats.activeMistakesCount > 1 ? 's' : ''} to review.
            </p>
          </div>
        )}

        {/* Logout button */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={() => handleSelect('landing')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Return to Landing / Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
