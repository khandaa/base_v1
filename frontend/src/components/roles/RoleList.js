import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaUserTag, FaShieldAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { roleAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRoles, setFilteredRoles] = useState([]);
  
  const { hasPermission } = useAuth();
  const navigate = useNavigate();

  const canCreateRole = hasPermission(['role_create']);
  const canEditRole = hasPermission(['role_update']);
  const canDeleteRole = hasPermission(['role_delete']);

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (roles.length > 0 && searchTerm) {
      const filtered = roles.filter(role => 
        role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRoles(filtered);
    } else {
      setFilteredRoles(roles);
    }
  }, [roles, searchTerm]);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await roleAPI.getRoles();
      setRoles(response.data);
      setFilteredRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error('Failed to load roles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async (roleId, roleName) => {
    // Prevent deletion of system roles
    if (['Admin', 'System'].includes(roleName)) {
      toast.error(`The ${roleName} role cannot be deleted as it is a system role.`);
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete the "${roleName}" role? This action cannot be undone.`)) {
      try {
        await roleAPI.deleteRole(roleId);
        toast.success(`Role "${roleName}" deleted successfully`);
        
        // Remove role from local state
        setRoles(roles.filter(role => role.role_id !== roleId));
      } catch (error) {
        console.error('Error deleting role:', error);
        toast.error('Failed to delete role. It may be assigned to users or have other dependencies.');
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col md={6}>
          <h2>Role Management</h2>
          <p className="text-muted">Manage system roles and their permissions</p>
        </Col>
        <Col md={6} className="text-md-end">
          {canCreateRole && (
            <Button 
              variant="primary" 
              as={Link} 
              to="/roles/create"
              className="d-inline-flex align-items-center"
            >
              <FaPlus className="me-2" /> Add New Role
            </Button>
          )}
        </Col>
      </Row>
      
      <Card className="mb-4">
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <InputGroup>
                <Form.Control 
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Button variant="outline-secondary">
                  <FaSearch />
                </Button>
              </InputGroup>
            </Col>
          </Row>
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover bordered className="align-middle">
                <thead>
                  <tr>
                    <th width="5%">#</th>
                    <th width="20%">Role Name</th>
                    <th width="30%">Description</th>
                    <th width="25%">Permissions</th>
                    <th width="20%">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoles.length > 0 ? (
                    filteredRoles.map((role, index) => (
                      <tr key={role.role_id}>
                        <td>{index + 1}</td>
                        <td>
                          <Link to={`/roles/${role.role_id}`} className="d-flex align-items-center text-decoration-none">
                            <FaUserTag className="me-2 text-primary" />
                            {role.name}
                          </Link>
                          {['Admin', 'System'].includes(role.name) && (
                            <Badge bg="secondary" className="ms-2">System</Badge>
                          )}
                        </td>
                        <td>{role.description}</td>
                        <td>
                          {role.permissions && role.permissions.length > 0 ? (
                            <div className="d-flex flex-wrap">
                              {role.permissions.slice(0, 3).map(permission => (
                                <Badge key={permission.permission_id} bg="secondary" className="me-1 mb-1 badge-permission">
                                  {permission.name}
                                </Badge>
                              ))}
                              {role.permissions.length > 3 && (
                                <Badge bg="info" className="badge-permission">
                                  +{role.permissions.length - 3} more
                                </Badge>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted">No permissions</span>
                          )}
                        </td>
                        <td>
                          <div className="d-flex">
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              className="me-2" 
                              onClick={() => navigate(`/roles/${role.role_id}`)} 
                              title="View role details"
                            >
                              <FaShieldAlt />
                            </Button>
                            
                            {canEditRole && (
                              <Button 
                                variant="outline-info" 
                                size="sm" 
                                className="me-2" 
                                onClick={() => navigate(`/roles/edit/${role.role_id}`)} 
                                title="Edit role"
                              >
                                <FaEdit />
                              </Button>
                            )}
                            
                            {canDeleteRole && !['Admin', 'System'].includes(role.name) && (
                              <Button 
                                variant="outline-danger" 
                                size="sm" 
                                onClick={() => handleDeleteRole(role.role_id, role.name)}
                                title="Delete role"
                              >
                                <FaTrash />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        {searchTerm ? 'No roles match your search criteria.' : 'No roles found.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
      
      <Card>
        <Card.Header className="bg-white">
          <h5 className="mb-0">About Roles</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h6>What are roles?</h6>
              <p className="text-muted">
                Roles are collections of permissions that define what actions users can perform in the system.
                Each user can be assigned multiple roles, and their effective permissions are the combination
                of all permissions from their assigned roles.
              </p>
            </Col>
            <Col md={6}>
              <h6>System Roles</h6>
              <p className="text-muted">
                System roles like "Admin" and "System" cannot be deleted as they are essential for system operation.
                The Admin role has all permissions by default. Be careful when modifying system roles as it may affect system functionality.
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RoleList;
