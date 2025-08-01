import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FaUsers, FaUserTag, FaShieldAlt, FaList } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { loggingAPI, userAPI, roleAPI, permissionAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import FileUploadWidget from '../fileupload/FileUploadWidget';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { currentUser, permissions, hasPermission } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    userCount: 0,
    roleCount: 0,
    permissionCount: 0,
    activityCount: 0
  });
  const [activityData, setActivityData] = useState({
    labels: [],
    datasets: []
  });
  const [actionTypeData, setActionTypeData] = useState({
    labels: [],
    datasets: []
  });
  
  // Define which permissions are needed for each card
  const cardPermissions = {
    users: ['user_view', 'user_manage'],
    roles: ['role_view', 'role_manage'],
    permissions: ['permission_view', 'permission_assign'],
    activities: ['logs_view']
  };

  // Use useMemo to prevent infinite loop from permission checks
  const hasAnyPermission = useMemo(() => {
    return permissions && permissions.length > 0;
  }, [permissions]);
  
  // Use useMemo for card permission check
  const canAccessAnyCard = useMemo(() => {
    return Object.values(cardPermissions).some(permissionSet => 
      hasPermission(permissionSet)
    );
  }, [cardPermissions, hasPermission]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Only fetch data if user has necessary permissions
        if (!hasAnyPermission || !canAccessAnyCard) {
          setLoading(false);
          return;
        }

        setLoading(true);
        
        // Fetch user data only if user has permission
        let userResponse = { data: { total: 0 } };
        if (hasPermission(cardPermissions.users)) {
          userResponse = await userAPI.getUsers({ limit: 1 });
        }
        
        // Fetch role data only if user has permission
        let roleResponse = { data: { count: 0, roles: [] } };
        if (hasPermission(cardPermissions.roles)) {
          roleResponse = await roleAPI.getRoles();
        }
        
        // Fetch permission data only if user has permission
        let permissionResponse = { data: { count: 0, permissions: [] } };
        if (hasPermission(cardPermissions.permissions)) {
          permissionResponse = await permissionAPI.getPermissions();
        }
        
        // Fetch logs data only if user has permission
        let logsResponse = { data: [] };
        let statsResponse = { data: { total_logs: 0 } };
        if (hasPermission(cardPermissions.activities)) {
          logsResponse = await loggingAPI.getLogs({ limit: 10 });
          statsResponse = await loggingAPI.getStats();
        }
        
        // Set stats with proper data access
        setStats({
          userCount: userResponse.data?.total || 0,
          roleCount: roleResponse.data?.count || (roleResponse.data?.roles ? roleResponse.data.roles.length : 0),
          permissionCount: permissionResponse.data?.count || 
                         (permissionResponse.data?.permissions ? permissionResponse.data.permissions.length : 0),
          activityCount: statsResponse.data?.total_logs || 0
        });
        
        // Prepare activity data for charts
        if (statsResponse.data?.daily_activity) {
          const labels = statsResponse.data.daily_activity.map(item => item.date);
          const data = statsResponse.data.daily_activity.map(item => item.count);
          
          setActivityData({
            labels,
            datasets: [
              {
                label: 'Activity Logs',
                data,
                borderColor: 'rgba(25, 118, 210, 0.8)',
                backgroundColor: 'rgba(25, 118, 210, 0.2)',
                tension: 0.3,
                fill: true
              }
            ]
          });
        }
        
        // Prepare action type data for charts
        if (statsResponse.data?.action_counts) {
          const labels = statsResponse.data.action_counts.map(item => item.action);
          const data = statsResponse.data.action_counts.map(item => item.count);
          
          setActionTypeData({
            labels,
            datasets: [
              {
                label: 'Actions',
                data,
                backgroundColor: [
                  'rgba(25, 118, 210, 0.7)',
                  'rgba(67, 160, 71, 0.7)',
                  'rgba(255, 167, 38, 0.7)',
                  'rgba(229, 57, 53, 0.7)',
                  'rgba(156, 39, 176, 0.7)',
                  'rgba(0, 188, 212, 0.7)',
                ],
                borderWidth: 1
              }
            ]
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [hasAnyPermission, canAccessAnyCard, hasPermission]);  // Include necessary dependencies

  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Activity Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Actions by Type'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Variables already defined above

  return (
    <Container fluid className="p-3">
      <Row className="mb-4">
        <Col>
          <h2>Dashboard</h2>
          <p className="text-muted">Welcome back, {currentUser?.firstName}!</p>
        </Col>
      </Row>
      
      {!hasAnyPermission ? (
        <Row className="mb-4">
          <Col md={12}>
            <Card className="text-center">
              <Card.Body className="p-5">
                <Card.Title className="mb-4">No Permissions Available</Card.Title>
                <Card.Text>
                  You do not have any permissions on this application.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row className="dashboard-stats mb-4">
          {/* Users Card - only shown if user has required permissions */}
          {hasPermission(cardPermissions.users) && (
            <Col md={3}>
              <Card 
                className="stat-card bg-primary text-white" 
                onClick={() => navigate('/users')}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">Users</h6>
                      <h2 className="mb-0">{stats.userCount}</h2>
                    </div>
                    <FaUsers size={32} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )}
          
          {/* Roles Card - only shown if user has required permissions */}
          {hasPermission(cardPermissions.roles) && (
            <Col md={3}>
              <Card 
                className="stat-card bg-success text-white"
                onClick={() => navigate('/roles')} 
                style={{ cursor: 'pointer' }}
              >
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">Roles</h6>
                      <h2 className="mb-0">{stats.roleCount}</h2>
                    </div>
                    <FaUserTag size={32} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )}
          
          {/* Permissions Card - only shown if user has required permissions */}
          {hasPermission(cardPermissions.permissions) && (
            <Col md={3}>
              <Card 
                className="stat-card bg-warning text-white"
                onClick={() => navigate('/permissions')} 
                style={{ cursor: 'pointer' }}
              >
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">Permissions</h6>
                      <h2 className="mb-0">{stats.permissionCount}</h2>
                    </div>
                    <FaShieldAlt size={32} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )}
          
          {/* Activities Card - only shown if user has required permissions */}
          {hasPermission(cardPermissions.activities) && (
            <Col md={3}>
              <Card 
                className="stat-card bg-info text-white"
                onClick={() => navigate('/logs')} 
                style={{ cursor: 'pointer' }}
              >
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">Activities</h6>
                      <h2 className="mb-0">{stats.activityCount}</h2>
                    </div>
                    <FaList size={32} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      )}
      
      {/* Activity Charts - only shown if user has logs permissions */}
      {hasPermission(cardPermissions.activities) && (
        <Row className="mb-4">
          <Col md={8}>
            <Card className="chart-container">
              <Card.Body>
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <Line options={lineChartOptions} data={activityData} />
                )}
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="chart-container">
              <Card.Body>
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <Bar options={barChartOptions} data={actionTypeData} />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      
      {/* Recent Activity - only shown if user has logs permissions */}
      {hasPermission(cardPermissions.activities) && (
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header className="bg-white">
                <h5 className="mb-0">Recent Activity</h5>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <div className="text-center py-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Action</th>
                          <th>Module</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* This would be populated with actual data from the API */}
                        <tr>
                          <td>System</td>
                          <td>User Login</td>
                          <td>Authentication</td>
                          <td>{new Date().toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* File Upload Widget - only shown if user has appropriate permissions */}
      {hasPermission(['file_upload']) && (
        <Row className="mt-4">
          <Col>
            <FileUploadWidget />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;
