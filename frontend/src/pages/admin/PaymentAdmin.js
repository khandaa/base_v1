import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Tab,
  Tabs,
  Paper,
  Divider,
  Alert
} from '@mui/material';
import {
  QrCode2 as QrCodeIcon,
  Settings as SettingsIcon,
  Payments as PaymentsIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import QRCodeUpload from '../../components/payment/QRCodeUpload';
import QRCodeList from '../../components/payment/QRCodeList';
import PaymentFeatureToggle from '../../components/payment/PaymentFeatureToggle';

// Tab Panel Component
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`payment-tabpanel-${index}`}
      aria-labelledby={`payment-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const PaymentAdmin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingQrCode, setEditingQrCode] = useState(null);
  const [featureEnabled, setFeatureEnabled] = useState(null);
  const [permissionError, setPermissionError] = useState(null);
  
  const { hasPermission } = useAuth();
  
  // Check if user has required permissions
  const hasPaymentViewPermission = hasPermission('payment_view');
  const hasPaymentCreatePermission = hasPermission('payment_create');
  const hasPaymentEditPermission = hasPermission('payment_edit');
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Handle QR code upload success
  const handleUploadSuccess = () => {
    // Refresh the QR code list
    setRefreshTrigger(prev => prev + 1);
    // Switch to the manage tab
    setActiveTab(1);
  };
  
  // Handle edit QR code
  const handleEditQrCode = (qrCode) => {
    setEditingQrCode(qrCode);
    // Switch to the upload tab which will be in edit mode
    setActiveTab(0);
  };
  
  // Handle feature toggle change
  const handleFeatureToggle = (status) => {
    setFeatureEnabled(status);
  };
  
  // Check permissions and show error if lacking
  React.useEffect(() => {
    if (!hasPaymentViewPermission) {
      setPermissionError('You do not have permission to access payment management. Please contact your administrator.');
    }
  }, [hasPaymentViewPermission]);
  
  if (permissionError) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{permissionError}</Alert>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ mb: 3 }}>
        <Box sx={{ p: 3, pb: 1 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            <PaymentsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Payment Integration Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage QR codes, payment settings, and transactions for the payment integration feature.
          </Typography>
        </Box>
        
        <Divider />
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            aria-label="payment management tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab 
              icon={<QrCodeIcon />} 
              label="Upload QR Code" 
              disabled={!hasPaymentCreatePermission}
            />
            <Tab 
              icon={<QrCodeIcon />} 
              label="Manage QR Codes" 
              disabled={!hasPaymentViewPermission}
            />
            <Tab 
              icon={<SettingsIcon />} 
              label="Settings" 
              disabled={!hasPaymentEditPermission}
            />
          </Tabs>
        </Box>
        
        <TabPanel value={activeTab} index={0}>
          {hasPaymentCreatePermission ? (
            <QRCodeUpload 
              onSuccess={handleUploadSuccess}
              editMode={!!editingQrCode}
              qrCodeData={editingQrCode}
            />
          ) : (
            <Alert severity="warning">
              You do not have permission to upload QR codes.
            </Alert>
          )}
        </TabPanel>
        
        <TabPanel value={activeTab} index={1}>
          {hasPaymentViewPermission ? (
            <QRCodeList 
              onEdit={hasPaymentEditPermission ? handleEditQrCode : null}
              onRefreshNeeded={() => setRefreshTrigger(prev => prev + 1)}
              refreshTrigger={refreshTrigger}
            />
          ) : (
            <Alert severity="warning">
              You do not have permission to view QR codes.
            </Alert>
          )}
        </TabPanel>
        
        <TabPanel value={activeTab} index={2}>
          {hasPaymentEditPermission ? (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <PaymentFeatureToggle onToggle={handleFeatureToggle} />
              </Grid>
            </Grid>
          ) : (
            <Alert severity="warning">
              You do not have permission to change payment settings.
            </Alert>
          )}
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default PaymentAdmin;
