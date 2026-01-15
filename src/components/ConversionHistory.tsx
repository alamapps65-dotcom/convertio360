import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, Clock, FileText } from 'lucide-react';
import { ConversionHistory as ConversionHistoryType } from '../types';
import { supabase } from '../lib/supabase';

export default function ConversionHistory() {
  const [history, setHistory] = useState<ConversionHistoryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('conversion_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00FF00]"></div>
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8">
        <p className="text-center text-gray-500">
          No conversion history yet. Start converting files to see them here!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Recent Conversions
        </h2>
        <p className="text-gray-400">
          Your latest file conversions
        </p>
      </div>

      <div className="space-y-3">
        {history.map(item => (
          <div
            key={item.id}
            className="bg-[#1a1f2e] rounded-xl border border-gray-800 p-5 hover:border-gray-700 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-lg bg-[#00FF00]/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#00FF00]" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate mb-1">
                    {item.file_name}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="px-2 py-0.5 bg-gray-800 rounded text-[#00FF00]">
                      {item.from_format}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="px-2 py-0.5 bg-gray-800 rounded text-[#00FF00]">
                      {item.to_format}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{formatFileSize(item.file_size)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-2 text-[#00FF00] mb-1">
                    {item.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium capitalize">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
