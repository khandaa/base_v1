import React from 'react';
import useGate from '../../hooks/useGate';

/**
 * Guard component
 * Usage:
 * <Guard permission="user.read" feature="payment" roleAnyOf={["Admin"]}>
 *   <ProtectedComponent />
 * </Guard>
 */
export default function Guard({ children, permission, feature, roleAnyOf }) {
  const { allowed, loading } = useGate({ permission, feature, roleAnyOf });

  if (loading) return null; // or a spinner
  if (!allowed) return null;
  return <>{children}</>;
}
