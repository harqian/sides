'use client';

import { useState } from 'react';
import { ComparisonPoint, UserPreferences } from '@/types/comparison';
import { getPersonalizedColor } from '@/lib/colors/colorUtils';
import { Pencil, Check, X } from 'lucide-react';

interface EditablePointProps {
  point: ComparisonPoint;
  itemId: string;
  userPreferences: UserPreferences;
  onUpdate: (pointId: string, updates: { text?: string; weight?: number }) => void;
  onDelete: (pointId: string) => void;
}

export default function EditablePoint({ point, itemId, userPreferences, onUpdate, onDelete }: EditablePointProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(point.text);
  const [editWeight, setEditWeight] = useState(point.weight);

  const style = getPersonalizedColor(point, userPreferences);

  const handleSave = () => {
    onUpdate(point.id, {
      text: editText,
      weight: editWeight
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(point.text);
    setEditWeight(point.weight);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div
        className="rounded-lg p-3 border-l-4 transition-all"
        style={{
          backgroundColor: style.backgroundColor,
          opacity: style.opacity,
          borderColor: style.backgroundColor,
          borderLeftWidth: style.borderWidth
        }}
      >
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-xs font-medium opacity-70 mt-2">
              {point.type === 'pro' ? '✓' : point.type === 'con' ? '✗' : '○'}
            </span>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 text-sm min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                fontSize: style.fontSize,
                fontWeight: style.fontWeight
              }}
            />
          </div>
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-700">Weight:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={editWeight}
                onChange={(e) => setEditWeight(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs text-gray-500">/10</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={handleSave}
                className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                title="Save"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1.5 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                title="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg p-3 border-l-4 transition-all group relative"
      style={{
        backgroundColor: style.backgroundColor,
        opacity: style.opacity,
        borderColor: style.backgroundColor,
        borderLeftWidth: style.borderWidth,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight
      }}
    >
      <div className="flex items-start gap-2">
        <span className="text-xs font-medium opacity-70 mt-0.5">
          {point.type === 'pro' ? '✓' : point.type === 'con' ? '✗' : '○'}
        </span>
        <p className="flex-1 text-gray-900">{point.text}</p>
        <span className="text-xs opacity-60 font-medium">
          {point.weight}/10
        </span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 hover:bg-white/50 rounded"
            title="Edit"
          >
            <Pencil className="w-3 h-3 text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(point.id)}
            className="p-1 hover:bg-red-100 rounded"
            title="Delete"
          >
            <X className="w-3 h-3 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
