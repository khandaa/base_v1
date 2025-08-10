import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFeatureToggle } from '../contexts/FeatureToggleContext';

/**
 * useGate - unified access gate for UI
 * opts: { permission?: string | string[], feature?: string, roleAnyOf?: string[] }
 * returns { allowed, loading }
 */
export default function useGate(opts = {}) {
  const { permission, feature, roleAnyOf = [] } = opts;
  const { isAuthenticated, permissions, roles, isLoading } = useAuth();
  const { isFeatureEnabled, loading: ftLoading } = useFeatureToggle();

  const allowed = useMemo(() => {
    if (!isAuthenticated) return false;

    // Role check (any-of)
    if (Array.isArray(roleAnyOf) && roleAnyOf.length > 0) {
      const hasRole = roleAnyOf.some(r => roles?.includes(r));
      if (hasRole) return true;
    }

    // Permission check (any-of)
    if (permission) {
      const required = Array.isArray(permission) ? permission : [permission];
      const hasPerm = required.some(p => permissions?.includes(p));
      if (!hasPerm) return false;
    }

    // Feature check
    if (feature) {
      if (!isFeatureEnabled(feature)) return false;
    }

    return true;
  }, [isAuthenticated, permissions, roles, permission, feature, roleAnyOf, isFeatureEnabled]);

  return { allowed, loading: isLoading || ftLoading };
}
