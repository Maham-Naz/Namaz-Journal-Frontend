import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, CheckCircle2, Circle } from 'lucide-react';
import api from '../../utils/api';

interface PrayerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  onUpdate: () => void;
}

export default function PrayerPanel({ isOpen, onClose, date, onUpdate }: PrayerPanelProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [fajr, setFajr] = useState(false);
  const [dhuhr, setDhuhr] = useState(false);
  const [asr, setAsr] = useState(false);
  const [maghrib, setMaghrib] = useState(false);
  const [isha, setIsha] = useState(false);
  const [notes, setNotes] = useState('');

  const formattedDate = date 
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    : '';

  const displayDate = date
    ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  useEffect(() => {
    if (isOpen && formattedDate) {
      fetchDailyRecord();
    }
  }, [isOpen, formattedDate]);

  const fetchDailyRecord = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/prayers/${formattedDate}`);
      const record = response.data.record;
      if (record) {
        setFajr(record.fajr);
        setDhuhr(record.dhuhr);
        setAsr(record.asr);
        setMaghrib(record.maghrib);
        setIsha(record.isha);
        setNotes(record.notes || '');
      } else {
        // Reset if no record
        setFajr(false); setDhuhr(false); setAsr(false);
        setMaghrib(false); setIsha(false);
        setNotes('');
      }
    } catch (error) {
      // Silently fail
    } finally {
      setLoading(false);
    }
  };

  const saveRecord = async (fieldToUpdate: string, value: boolean | string) => {
    setSaving(true);
    try {
      await api.put(`/prayers/${formattedDate}`, {
        fajr: fieldToUpdate === 'fajr' ? value : fajr,
        dhuhr: fieldToUpdate === 'dhuhr' ? value : dhuhr,
        asr: fieldToUpdate === 'asr' ? value : asr,
        maghrib: fieldToUpdate === 'maghrib' ? value : maghrib,
        isha: fieldToUpdate === 'isha' ? value : isha,
        notes: fieldToUpdate === 'notes' ? value : notes
      });
      onUpdate(); // Trigger calendar refresh
    } catch (error) {
      // Silently fail
    } finally {
      setSaving(false);
    }
  };

  const togglePrayer = (prayer: string, currentValue: boolean, setter: (val: boolean) => void) => {
    const newValue = !currentValue;
    setter(newValue);
    saveRecord(prayer, newValue);
  };

  // Debounce notes saving
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isOpen && formattedDate) {
        // Check if we actually need to save (avoid saving on initial load)
        // We'll trust the user typing and save after 1 second of no typing
        if (notes !== undefined) {
           saveRecord('notes', notes);
        }
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [notes]);

  const prayersList = [
    { id: 'fajr', name: 'Fajr', state: fajr, setter: setFajr },
    { id: 'dhuhr', name: 'Dhuhr', state: dhuhr, setter: setDhuhr },
    { id: 'asr', name: 'Asr', state: asr, setter: setAsr },
    { id: 'maghrib', name: 'Maghrib', state: maghrib, setter: setMaghrib },
    { id: 'isha', name: 'Isha', state: isha, setter: setIsha }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-slate-800 shadow-2xl z-50 flex flex-col border-l border-emerald-100"
          >
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b border-emerald-50 bg-emerald-950 text-white">
              <h2 className="text-lg sm:text-xl font-bold">Daily Prayers</h2>
              <button onClick={onClose} className="p-2 hover:bg-emerald-800 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-900">
              <div className="mb-4 sm:mb-6 flex justify-between items-center gap-2">
                <h3 className="text-xs sm:text-sm font-semibold text-emerald-600 uppercase tracking-wider">{displayDate}</h3>
                {saving && <span className="text-xs text-slate-400 flex items-center gap-1"><Save className="h-3 w-3 animate-pulse" /> Saving...</span>}
              </div>

              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden">
                    {prayersList.map((prayer, idx) => (
                      <div 
                        key={prayer.id}
                        onClick={() => togglePrayer(prayer.id, prayer.state, prayer.setter)}
                        className={`flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 cursor-pointer transition-colors ${
                          idx !== prayersList.length - 1 ? 'border-b border-slate-50' : ''
                        } hover:bg-emerald-50/50`}
                      >
                        <button className="focus:outline-none shrink-0">
                          {prayer.state ? (
                            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
                          ) : (
                            <Circle className="h-5 w-5 sm:h-6 sm:w-6 text-slate-300" />
                          )}
                        </button>
                        <span className={`text-base sm:text-lg font-medium ${prayer.state ? 'text-slate-800 dark:text-slate-100' : 'text-slate-600 dark:text-slate-300'}`}>
                          {prayer.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 sm:mt-8">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Daily Notes</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Reflections, missed rakats, or gratitude..."
                      className="w-full h-28 sm:h-32 p-3.5 sm:p-4 text-sm sm:text-base rounded-2xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none transition-all shadow-sm dark:shadow-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
