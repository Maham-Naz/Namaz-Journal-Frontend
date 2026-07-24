import { useState, useRef } from 'react';
import { Download, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../../utils/api';

export default function DataSettings() {
  const [exportLoading, setExportLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    setExportLoading(true);
    setMessage('');
    setError('');
    try {
      const response = await api.get('/prayers/export');
      const data = response.data;
      
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `namaz-journal-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setMessage(`Successfully exported ${data.length} records.`);
    } catch (err) {
      setError('Failed to export data. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportLoading(true);
    setMessage('');
    setError('');

    try {
      const text = await file.text();
      const json = JSON.parse(text);
      
      if (!Array.isArray(json)) {
        throw new Error('Invalid JSON format. Expected an array.');
      }

      const response = await api.post('/prayers/import', json);
      const { successCount, errorCount } = response.data;
      
      setMessage(`Imported successfully. ${successCount} added/updated, ${errorCount} skipped.`);
    } catch (err: any) {
      setError(err.message || 'Failed to import data. Please check your file.');
    } finally {
      setImportLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="max-w-2xl bg-white dark:bg-slate-800 p-4 sm:p-6 lg:p-8 rounded-3xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 space-y-6 sm:space-y-8">
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">Data Management</h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Export your prayer records for backup, or import them from another device.</p>
      </div>

      {message && (
        <div className="p-3.5 sm:p-4 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 rounded-xl flex items-center gap-3 border border-emerald-100">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          <p className="text-xs sm:text-sm font-medium">{message}</p>
        </div>
      )}

      {error && (
        <div className="p-3.5 sm:p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 border border-red-100">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-xs sm:text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Export Card */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col items-center text-center gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 bg-blue-100 text-blue-600 rounded-full">
            <Download className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">Export Backup</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3 sm:mb-4">Download all your records as a JSON file.</p>
          </div>
          <button 
            onClick={handleExport}
            disabled={exportLoading || importLoading}
            className="w-full py-2 text-sm sm:text-base bg-white dark:bg-slate-800 border border-slate-300 text-slate-700 dark:text-slate-200 font-medium rounded-xl hover:bg-slate-100 dark:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {exportLoading ? 'Exporting...' : 'Export JSON'}
          </button>
        </div>

        {/* Import Card */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col items-center text-center gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 bg-emerald-100 text-emerald-600 rounded-full">
            <Upload className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">Import Data</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3 sm:mb-4">Restore records from a previous JSON backup.</p>
          </div>
          
          <input 
            type="file" 
            accept=".json" 
            ref={fileInputRef} 
            onChange={handleImport} 
            className="hidden" 
          />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={exportLoading || importLoading}
            className="w-full py-2 text-sm sm:text-base bg-emerald-600 border border-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            {importLoading ? 'Importing...' : 'Select JSON File'}
          </button>
        </div>
      </div>
      
      <div className="bg-amber-50 border border-amber-100 p-3.5 sm:p-4 rounded-xl text-amber-800 text-xs sm:text-sm flex gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-500" />
        <p><strong>Note on Imports:</strong> Importing data will overwrite any existing records you have for those specific dates. Use with caution.</p>
      </div>
    </div>
  );
}
