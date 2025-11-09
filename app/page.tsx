'use client';

import { useState, useEffect } from 'react';
import InputForm from '@/components/InputForm';
import ComparisonTable from '@/components/ComparisonTable';
import PriorityPanel from '@/components/customization/PriorityPanel';
import RefinementPanel from '@/components/RefinementPanel';
import UndoRedoButtons from '@/components/UndoRedoButtons';
import { useComparisonStore } from '@/lib/store';
import { Edit2, Check } from 'lucide-react';

export default function Home() {
  const { comparison, undo, redo, updateTitle } = useComparisonStore();
  const [showPriorityPanel, setShowPriorityPanel] = useState(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (modifier && (e.key === 'Z' || (e.shiftKey && e.key === 'z'))) {
        e.preventDefault();
        redo();
      } else if (modifier && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const handleTitleEdit = () => {
    setTitleInput(comparison?.title || '');
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    if (titleInput.trim()) {
      updateTitle(titleInput.trim());
    }
    setIsEditingTitle(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex items-center gap-3">
              {comparison && (
                <>
                  {isEditingTitle ? (
                    <>
                      <input
                        type="text"
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
                        className="text-xl font-bold border-b-2 border-blue-500 focus:outline-none bg-transparent"
                        autoFocus
                      />
                      <button
                        onClick={handleTitleSave}
                        className="p-1 hover:bg-green-100 rounded transition-colors"
                      >
                        <Check className="w-4 h-4 text-green-600" />
                      </button>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-gray-900">
                        {comparison.title || 'My Comparison'}
                      </h2>
                      <button
                        onClick={handleTitleEdit}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Edit title"
                      >
                        <Edit2 className="w-4 h-4 text-gray-500" />
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="flex-1 flex flex-col items-center">
              <h1 className="text-2xl font-bold text-gray-900">Sides</h1>
              <p className="text-xs text-gray-600">Compare options with personalized priorities</p>
            </div>
            <div className="flex-1 flex items-center justify-end gap-4">
              {comparison && <UndoRedoButtons />}
              {comparison && (
                <button
                  onClick={() => setShowPriorityPanel(!showPriorityPanel)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {showPriorityPanel ? 'Hide' : 'Show'} Priorities
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {!comparison ? (
          <InputForm />
        ) : (
          <div className="flex gap-6 h-[calc(100vh-180px)]">
            {showPriorityPanel && (
              <div className="w-80 flex-shrink-0 overflow-y-auto">
                <PriorityPanel />
              </div>
            )}
            <div className="flex-1 min-w-0 space-y-6 overflow-y-auto">
              <ComparisonTable />
              <RefinementPanel />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
