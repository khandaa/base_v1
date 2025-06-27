import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUsers, FaUserTag, FaShieldAlt, FaList } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
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
  const { currentUser } = useAuth();
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

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch user count
        const userResponse = await userAPI.getUsers({ limit: 1 });
        
        // Fetch role count
        const roleResponse = await roleAPI.getRoles();
        
        // Fetch permission count
        const permissionResponse = await permissionAPI.getPermissions();
        
        // Fetch activity logs and stats
        const logsResponse = await loggingAPI.getLogs({ limit: 10 });
        const statsResponse = await loggingAPI.getStats();
        
        // Set stats
        setStats({
          userCount: userResponse.data.total || 0,
          roleCount: roleResponse.data.length || 0,
          permissionCount: permissionResponse.data.length || 0,
          activityCount: statsResponse.data.total_activities || 0
        });
        
        // Prepare activity data for charts
        if (statsResponse.data.activity_by_day) {
          const labels = statsResponse.data.activity_by_day.map(item => item.date);
          const data = statsResponse.data.activity_by_day.map(item => item.count);
          
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
        if (statsResponse.data.activity_by_action) {
          const labels = statsResponse.data.activity_by_action.map(item => item.action_type);
          const data = statsResponse.data.activity_by_action.map(item => item.count);
          
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
  }, []);

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

  return (
    <Container fluid className="p-3">
      <Row className="mb-4">
        <Col>
          <h2>Dashboard</h2>
          <p className="text-muted">Welcome back, {currentUser?.firstName}!</p>
        </Col>
      </Row>
      
      <Row className="dashboard-stats mb-4">
        <Col md={3}>
          <Card className="stat-card bg-primary text-white">
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
        
        <Col md={3}>
          <Card className="stat-card bg-success text-white">
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
        
        <Col md={3}>
          <Card className="stat-card bg-warning text-white">
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
        
        <Col md={3}>
          <Card className="stat-card bg-info text-white">
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
      </Row>
      
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
    </Container>
  );
};

export default Dashboard;
