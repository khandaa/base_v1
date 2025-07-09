import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Pagination, Badge, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaCalendarAlt, FaFileExport, FaEye, FaChartBar } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { loggingAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const ActivityLogs = () => {
  const { hasPermission, currentUser } = useAuth();
  const userRoles = currentUser?.roles || [];
  
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)); // Last 30 days
  const [endDate, setEndDate] = useState(new Date());
  const [selectedEntityType, setSelectedEntityType] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [entityTypes, setEntityTypes] = useState([]);
  const [actionTypes, setActionTypes] = useState([]);
  
  const canViewLogs = hasPermission(['activity_view']) || userRoles.some(role => ['Admin', 'full_access'].includes(role));
  const canExportLogs = hasPermission(['activity_export']) || userRoles.some(role => ['Admin', 'full_access'].includes(role));
  
  // Pagination settings
  const logsPerPage = 10;

  // Function to fetch activity logs with current filters and pagination
  const fetchLogs = async () => {
    try {
      setLoading(true);
      
      // Prepare filter parameters
      const params = {
        page: currentPage,
        limit: logsPerPage,
        search: searchTerm,
        start_date: startDate ? startDate.toISOString().split('T')[0] : null,
        end_date: endDate ? endDate.toISOString().split('T')[0] : null,
        entity_type: selectedEntityType || null,
        action: selectedAction || null
      };
      
      const response = await loggingAPI.getLogs(params);
      
      setLogs(response.data.logs || []);
      setTotalPages(Math.ceil(response.data.total / logsPerPage));
    } catch (error) {
      console.error('Error loading activity logs:', error);
      setError('Failed to load activity logs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (canViewLogs) {
      fetchLogs();
      loadFilters();
    } else {
      setLoading(false);
    }
  }, [currentPage, canViewLogs, logsPerPage]);

  const loadFilters = async () => {
    try {
      // Since getEntityTypes isn't available, we'll simulate it with static data
      const entityTypesResponse = { data: ['User', 'Role', 'Permission', 'Auth', 'System'] };
      // Since getActionTypes isn't available, we'll simulate it with static data
      const actionTypesResponse = { data: ['Create', 'Read', 'Update', 'Delete', 'Login', 'Logout', 'Import', 'Export'] };
      
      setEntityTypes(entityTypesResponse.data || []);
      setActionTypes(actionTypesResponse.data || []);
    } catch (error) {
      console.error('Error loading filters:', error);
      // Non-critical error, can continue with logs
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchLogs();
  };
  
  const handleFilterChange = () => {
    setCurrentPage(1);
    fetchLogs();
  };
  
  const handleClearFilters = () => {
    setSearchTerm('');
    setStartDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    setEndDate(new Date());
    setSelectedEntityType('');
    setSelectedAction('');
    setCurrentPage(1);
    setTimeout(() => fetchLogs(), 0); // Use setTimeout to ensure state updates before fetch
  };

  const handleExport = async () => {
    try {
      // Prepare filter parameters
      const params = {
        search: searchTerm,
        start_date: startDate ? startDate.toISOString().split('T')[0] : null,
        end_date: endDate ? endDate.toISOString().split('T')[0] : null,
        entity_type: selectedEntityType || null,
        action: selectedAction || null,
        format: 'csv' // or 'pdf', 'excel' depending on what backend supports
      };
      
      // Since exportLogs isn't directly available, we'll use getLogs and format it
      const response = await loggingAPI.getLogs(params);
      
      // Convert the response data to CSV format
      const csvData = convertToCSV(response.data.logs || []);
      
      // Create a download link and trigger it
      const url = window.URL.createObjectURL(new Blob([csvData]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `activity_logs_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting logs:', error);
      setError('Failed to export logs. Please try again later.');
    }
  };

  const renderPagination = () => {
    const pages = [];
    
    // Previous button
    pages.push(
      <Pagination.Item 
        key="prev" 
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Pagination.Item>
    );
    
    // Page numbers
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    
    // Next button
    pages.push(
      <Pagination.Item 
        key="next" 
        onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Next
      </Pagination.Item>
    );
    
    return <Pagination>{pages}</Pagination>;
  };

  if (!canViewLogs) {
    return (
      <Container fluid>
        <Alert variant="danger">
          <h4>Access Denied</h4>
          <p>You don't have permission to view activity logs.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>Activity Logs</h2>
          <p className="text-muted">View and analyze system activity logs</p>
        </Col>
        <Col xs="auto">
          {canExportLogs && (
            <Button variant="outline-primary" onClick={handleExport}>
              <FaFileExport className="me-2" /> Export Logs
            </Button>
          )}
          <Link to="/logs/analytics" className="btn btn-primary ms-2">
            <FaChartBar className="me-2" /> Analytics
          </Link>
        </Col>
      </Row>
      
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Filters</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row>
              <Col lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Search</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Search users, actions, or entities"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button type="submit" variant="primary">
                      <FaSearch />
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Col>
              
              <Col lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Date Range</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaCalendarAlt />
                    </InputGroup.Text>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      className="form-control"
                      placeholderText="Start Date"
                    />
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      className="form-control"
                      placeholderText="End Date"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              
              <Col lg={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Entity Type</Form.Label>
                  <Form.Select
                    value={selectedEntityType}
                    onChange={(e) => setSelectedEntityType(e.target.value)}
                  >
                    <option value="">All Entity Types</option>
                    {entityTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col lg={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Action</Form.Label>
                  <Form.Select
                    value={selectedAction}
                    onChange={(e) => setSelectedAction(e.target.value)}
                  >
                    <option value="">All Actions</option>
                    {actionTypes.map((action, index) => (
                      <option key={index} value={action}>
                        {action}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <div className="d-flex justify-content-end">
              <Button variant="outline-secondary" onClick={handleClearFilters} className="me-2">
                Clear Filters
              </Button>
              <Button variant="primary" onClick={handleFilterChange}>
                <FaFilter className="me-2" /> Apply Filters
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      
      <Card>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading activity logs...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : logs.length === 0 ? (
            <Alert variant="info">No activity logs found matching the current filters.</Alert>
          ) : (
            <>
              <Table responsive hover className="align-middle">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Entity Type</th>
                    <th>Entity ID</th>
                    <th>IP Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.log_id}>
                      <td>{new Date(log.timestamp).toLocaleString()}</td>
                      <td>
                        {log.user ? (
                          <Link to={`/users/${log.user_id}`}>
                            {log.user.first_name} {log.user.last_name}
                          </Link>
                        ) : (
                          <span className="text-muted">System</span>
                        )}
                      </td>
                      <td>
                        <Badge bg={getBadgeVariant(log.action)}>{log.action}</Badge>
                      </td>
                      <td>{log.entity_type}</td>
                      <td>{log.entity_id}</td>
                      <td>{log.ip_address || 'N/A'}</td>
                      <td>
                        <Link to={`/logs/${log.log_id}`} className="btn btn-sm btn-outline-primary">
                          <FaEye /> View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              
              <div className="d-flex justify-content-between align-items-center mt-3">
                <p className="mb-0">
                  Showing {logs.length} of {totalPages * logsPerPage} entries
                </p>
                {renderPagination()}
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

// Helper function to determine badge variant based on action
const getBadgeVariant = (action) => {
  const actionLower = action.toLowerCase();
  
  if (actionLower.includes('create')) return 'success';
  if (actionLower.includes('update') || actionLower.includes('edit')) return 'info';
  if (actionLower.includes('delete')) return 'danger';
  if (actionLower.includes('login') || actionLower.includes('logout')) return 'primary';
  
  return 'secondary';
};

// Helper function to convert array of objects to CSV format
const convertToCSV = (data) => {
  if (!data || data.length === 0) {
    return '';
  }
  
  // Extract column headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV header row
  const headerRow = headers.join(',');
  
  // Create CSV data rows
  const csvRows = data.map(item => {
    return headers.map(header => {
      // Handle special cases for nested objects, arrays, dates, etc.
      let value = item[header];
      
      // Format date fields
      if (header.includes('date') || header.includes('timestamp')) {
        value = value ? new Date(value).toLocaleString() : '';
      }
      
      // Format user objects
      if (header === 'user' && value) {
        value = `${value.first_name} ${value.last_name}`;
      }
      
      // Convert objects and arrays to strings
      if (typeof value === 'object' && value !== null) {
        value = JSON.stringify(value);
      }
      
      // Escape quotes and wrap in quotes if needed
      if (typeof value === 'string') {
        // Replace double quotes with two double quotes (CSV standard)
        value = value.replace(/"/g, '""');
        
        // If value contains commas, newlines or double quotes, wrap in double quotes
        if (value.includes(',') || value.includes('\n') || value.includes('"')) {
          value = `"${value}"`;
        }
      }
      
      return value === null || value === undefined ? '' : value;
    }).join(',');
  });
  
  // Combine header row and data rows
  return [headerRow, ...csvRows].join('\n');
};

export default ActivityLogs;
