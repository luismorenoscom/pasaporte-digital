import { Routes, Route, Navigate } from "react-router-dom";
import VideoBackground from "./components/VideoBackground";
import ProtectedRoute from "./components/ProtectedRoute";
import IntroPage from "./pages/IntroPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import CompanyDashboardPage from "./pages/CompanyDashboardPage";
import PasaporteDigitalPage from "./pages/PasaporteDigitalPage";
import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage";
import UpdateDataPage from "./pages/UpdateDataPage";
import TopWinnersPage from "./pages/TopWinnersPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

// Nuevos dashboards por rol
import SupervisorDashboardPage from "./pages/SupervisorDashboardPage";
import TaskerDashboardPage from "./pages/TaskerDashboardPage";
import SupervisorRankingPage from "./pages/SupervisorRankingPage";
import TeamPassportPage from "./pages/TeamPassportPage";
import RegionsCountriesPage from "./pages/RegionsCountriesPage";
import AgencyAdminDashboardPage from "./pages/AgencyAdminDashboardPage";
import AgencySupervisorsPage from "./pages/AgencySupervisorsPage";
import AgencyTaskersPage from "./pages/AgencyTaskersPage";
import AgencyBranchesPage from "./pages/AgencyBranchesPage";
import AgencyMerchandisersPage from "./pages/AgencyMerchandisersPage";
import SuperAdminDashboardPage from "./pages/SuperAdminDashboardPage";
import StatisticsPage from "./pages/StatisticsPage";
import AllUsersPage from "./pages/AllUsersPage";
import GlobalTopRankingPage from "./pages/GlobalTopRankingPage";
import GlobalLocationsPage from "./pages/GlobalLocationsPage";

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Video de fondo para toda la aplicación */}
      <VideoBackground />
      
      {/* Contenido principal */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<IntroPage />} />
          
          {/* Redirección específica para tasker */}
          <Route 
            path="/dashboard-tasker" 
            element={
              <ProtectedRoute allowedRoles={['tasker']}>
                <TaskerDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Dashboards específicos por rol */}
          
          {/* Mercaderista - Solo su pasaporte e historial */}
          <Route 
            path="/pasaporte-digital" 
            element={
              <ProtectedRoute allowedRoles={['mercaderista']}>
                <PasaporteDigitalPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/historial" 
            element={
              <ProtectedRoute allowedRoles={['mercaderista']}>
                <HistoryPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Supervisor - Ve mercaderistas de su sucursal */}
          <Route 
            path="/dashboard-supervisor" 
            element={
              <ProtectedRoute allowedRoles={['supervisor']}>
                <SupervisorDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ranking-supervisor" 
            element={
              <ProtectedRoute allowedRoles={['supervisor']}>
                <SupervisorRankingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pasaporte-equipo" 
            element={
              <ProtectedRoute allowedRoles={['supervisor']}>
                <TeamPassportPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/regiones-paises" 
            element={
              <ProtectedRoute allowedRoles={['supervisor']}>
                <RegionsCountriesPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Tasker - Ve mercaderistas de su sucursal (mismas vistas que Supervisor) */}
          
          {/* Administrador Agencia - Ve usuarios de su país */}
          <Route 
            path="/dashboard-agencia" 
            element={
              <ProtectedRoute allowedRoles={['admin_agencia']}>
                <AgencyAdminDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/supervisores-agencia" 
            element={
              <ProtectedRoute allowedRoles={['admin_agencia']}>
                <AgencySupervisorsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/taskers-agencia" 
            element={
              <ProtectedRoute allowedRoles={['admin_agencia']}>
                <AgencyTaskersPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sucursales-agencia" 
            element={
              <ProtectedRoute allowedRoles={['admin_agencia']}>
                <AgencyBranchesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/merchandisers-pais" 
            element={
              <ProtectedRoute allowedRoles={['admin_agencia']}>
                <AgencyMerchandisersPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Super Admin Infinity - Ve todo */}
          <Route 
            path="/dashboard-global" 
            element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <SuperAdminDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/top-ranking-global" 
            element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <GlobalTopRankingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/paises-regiones-sucursales" 
            element={
              <ProtectedRoute allowedRoles={['supervisor', 'super_admin']}>
                <GlobalLocationsPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Rutas para Tasker y Admin Agencia - Estadísticas y Usuarios */}
          <Route 
            path="/estadisticas" 
            element={
              <ProtectedRoute allowedRoles={['tasker', 'admin_agencia']}>
                <StatisticsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/todos-usuarios" 
            element={
              <ProtectedRoute allowedRoles={['tasker', 'admin_agencia', 'super_admin']}>
                <AllUsersPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Rutas legacy para compatibilidad */}
          <Route 
            path="/dashboard-empresa" 
            element={
              <ProtectedRoute allowedRoles={['admin_agencia']}>
                <CompanyDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/actualizar-data" 
            element={
              <ProtectedRoute allowedRoles={['admin_agencia']}>
                <UpdateDataPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/top-ganadores" 
            element={
              <ProtectedRoute allowedRoles={['admin_agencia']}>
                <TopWinnersPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/historial-empresa" 
            element={
              <ProtectedRoute allowedRoles={['admin_agencia']}>
                <HistoryPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Rutas para todos los usuarios autenticados */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/perfil" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
