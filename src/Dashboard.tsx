import { User } from './types/User';

interface DashboardProps {
  users: User[];
}

export function Dashboard({ users }: DashboardProps) {
  const totalUsers = users.length;
  const roles = [...new Set(users.map(user => user.role))];
  const totalRoles = roles.length;

  const getRoleCount = (role: string) => {
    return users.filter(user => user.role === role).length;
  };

  const getPercentage = (role: string) => {
    return ((getRoleCount(role) / totalUsers) * 100).toFixed(1);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to User Management</h1>
        <p className="dashboard-subtitle">Overview of your user management system</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-main">
          {/* Overview Stats */}
          <div className="dashboard-stats">
            <div className="stat-card">
              <span className="stat-icon">👥</span>
              <h3>Total Users</h3>
              <div className="stat-value">{totalUsers}</div>
              <p className="stat-description">Active users in the system</p>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🎯</span>
              <h3>Unique Roles</h3>
              <div className="stat-value">{totalRoles}</div>
              <p className="stat-description">Different job positions</p>
            </div>
          </div>

          {/* Role Distribution */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Role Distribution</h2>
              <p className="section-subtitle">Breakdown of users by role</p>
            </div>
            <div className="role-grid">
              {roles.map(role => (
                <div key={role} className="role-card">
                  <div className="role-header">
                    <h4>{role}</h4>
                    <span className="role-percentage">{getPercentage(role)}%</span>
                  </div>
                  <div className="role-count">
                    <strong>{getRoleCount(role)}</strong> users
                  </div>
                  <div className="role-bar">
                    <div 
                      className="role-progress" 
                      style={{ width: `${getPercentage(role)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Users Section */}
        <div className="dashboard-sidebar">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Users</h2>
              <p className="section-subtitle">Latest additions to the system</p>
            </div>
            <div className="recent-users">
              {users.slice(-5).reverse().map((user, index) => (
                <div key={index} className="user-card">
                  <div className="user-avatar">
                    {user.firstName[0]}{user.lastName[0]}
                  </div>
                  <div className="user-info">
                    <h4>{user.firstName} {user.lastName}</h4>
                    <p className="user-role">{user.role}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}