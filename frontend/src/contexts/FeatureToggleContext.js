import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

// Create a context for feature toggles
const FeatureToggleContext = createContext();

// Custom hook to use the feature toggle context
export const useFeatureToggle = () => useContext(FeatureToggleContext);

// Provider component for feature toggles
export const FeatureToggleProvider = ({ children }) => {
  const [featureToggles, setFeatureToggles] = useState({});
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Fetch all feature toggles from the API
  useEffect(() => {
    const fetchFeatureToggles = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/feature-toggles');

        // Convert array to a map for easier access
        const togglesMap = {};
        if (response.data && Array.isArray(response.data)) {
          response.data.forEach(toggle => {
            // Backend returns is_enabled as 0/1 (SQLite). Normalize to boolean.
            togglesMap[toggle.feature_name] = !!toggle.is_enabled;
          });
        }

        setFeatureToggles(togglesMap);
        setLoading(false);
      } catch (error) {
        console.warn('Feature toggles API not available, defaulting to disabled:', error.message);
        // Default to empty map (features disabled by default if not found)
        setFeatureToggles({});
        setLoading(false);
      }
    };

    fetchFeatureToggles();
  }, [isAuthenticated]);

  // Check if a feature is enabled
  const isFeatureEnabled = (featureName) => {
    if (featureToggles[featureName] !== undefined) {
      return featureToggles[featureName];
    }
    // Default to false for features not defined in the database (safer default)
    return false;
  };

  // The context value that will be provided
  const contextValue = {
    featureToggles,
    loading,
    isFeatureEnabled
  };

  return (
    <FeatureToggleContext.Provider value={contextValue}>
      {children}
    </FeatureToggleContext.Provider>
  );
};

export default FeatureToggleContext;
