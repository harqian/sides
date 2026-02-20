'use client';

import { useState, useRef, useEffect } from 'react';
import { useComparisonStore } from '@/lib/store';
import { refineComparisonWithServer } from '@/lib/ai/client';
import { Mic, MicOff, Send, Loader2, Sparkles } from 'lucide-react';

export default function RefinementPanel() {
  const { comparison, setComparison } = useComparisonStore();
  const [instructions, setInstructions] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcriptPiece = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcriptPiece + ' ';
            } else {
              interimTranscript += transcriptPiece;
            }
          }

          setTranscript(prev => prev + finalTranscript);
          if (interimTranscript) {
            setInstructions(prev => {
              const base = prev || transcript;
              return base + interimTranscript;
            });
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setError(`Speech recognition error: ${event.error}`);
          setIsRecording(false);
        };

        recognitionRef.current.onend = () => {
          setIsRecording(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [transcript]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setInstructions(transcript);
    } else {
      setError(null);
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleSubmit = async () => {
    if (!instructions.trim() || !comparison) return;

    setIsProcessing(true);
    setError(null);

    try {
      const updatedComparison = await refineComparisonWithServer(comparison, instructions.trim());
      setComparison(updatedComparison);
      setInstructions('');
      setTranscript('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!comparison) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="font-bold text-gray-900">AI Refinement</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Tell the AI how to modify your comparison. You can type or use voice input.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <div className="relative">
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g., 'Add more emphasis on battery life', 'Remove all price-related points', 'Make the comparison focus on long-term value'..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px] resize-y"
            disabled={isProcessing || isRecording}
          />
          {isRecording && (
            <div className="absolute top-2 right-2 flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium animate-pulse">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              Recording...
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!instructions.trim() || isProcessing}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Apply Changes
            </>
          )}
        </button>
      </div>

      <div className="mt-4 p-3 bg-purple-50 rounded-lg">
        <h4 className="text-xs font-medium text-purple-900 mb-2">Example Instructions:</h4>
        <ul className="text-xs text-purple-700 space-y-1">
          <li>• "Increase the weight of all performance-related points"</li>
          <li>• "Add a new category for environmental impact"</li>
          <li>• "Rewrite the price points to be more detailed"</li>
          <li>• "Remove neutral points and focus on pros and cons"</li>
        </ul>
      </div>
    </div>
  );
}
