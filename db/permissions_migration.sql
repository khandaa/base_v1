-- Migration: Add feature toggle permissions
INSERT INTO permissions (name, description, category) VALUES
  ('feature_toggle_view', 'View feature toggles', 'Feature Management'),
  ('feature_toggle_edit', 'Create, edit, or delete feature toggles', 'Feature Management');
