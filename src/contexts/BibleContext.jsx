import React, { createContext, useContext, useState, useEffect } from 'react';
import { bibleService } from '../services/bibleService';
import { toast } from 'react-toastify';

const BibleContext = createContext();

export function BibleProvider({ children }) {
  const [versions, setVersions] = useState([]);
  const [books, setBooks] = useState([]);
  const [currentVersion, setCurrentVersion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load Bible versions and books on mount
  useEffect(() => {
    const initializeBible = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Initializing Bible data...');

        const [versionsData, booksData] = await Promise.all([
          bibleService.getVersions(),
          bibleService.getBooks()
        ]);

        console.log('Loaded versions:', versionsData);
        console.log('Loaded books:', booksData);

        setVersions(versionsData || []);
        setBooks(booksData || []);

        // Set default version to KJV
        const defaultVersion = versionsData?.find(v => v.name === 'KJV') || versionsData?.[0];
        if (defaultVersion) {
          setCurrentVersion(defaultVersion);
          console.log('Set default version:', defaultVersion);
        }
      } catch (err) {
        console.error('Error initializing Bible:', err);
        setError('Failed to load Bible data');
        toast.error('Using offline Bible data due to connection issues');

        // Set fallback data
        const fallbackVersions = [
          { id: '1', name: 'KJV', full_name: 'King James Version', language: 'English' }
        ];
        const fallbackBooks = [
          { id: '1', name: 'Genesis', testament: 'OT', position: 1, chapters: 50 },
          { id: '40', name: 'Matthew', testament: 'NT', position: 40, chapters: 28 },
          { id: '43', name: 'John', testament: 'NT', position: 43, chapters: 21 }
        ];
        
        setVersions(fallbackVersions);
        setBooks(fallbackBooks);
        setCurrentVersion(fallbackVersions[0]);
      } finally {
        setIsLoading(false);
      }
    };

    initializeBible();
  }, []);

  const changeVersion = (versionId) => {
    const version = versions.find(v => v.id === versionId);
    if (version) {
      setCurrentVersion(version);
      toast.success(`Changed to ${version.full_name}`);
    }
  };

  const value = {
    versions,
    books,
    currentVersion,
    isLoading,
    error,
    changeVersion,
    getChapter: bibleService.getChapter,
    searchVerses: bibleService.searchVerses,
    getVerseByReference: bibleService.getVerseByReference
  };

  return (
    <BibleContext.Provider value={value}>
      {children}
    </BibleContext.Provider>
  );
}

export const useBible = () => {
  const context = useContext(BibleContext);
  if (!context) {
    throw new Error('useBible must be used within a BibleProvider');
  }
  return context;
};