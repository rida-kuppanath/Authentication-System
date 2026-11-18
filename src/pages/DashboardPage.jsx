import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-2xl mx-auto">

        <div className="bg-white rounded-lg shadow p-6">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              Dashboard
            </h1>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>

          <div className="text-center">

            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.fullName}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
            )}

            <h2 className="text-xl font-semibold">
              {user.fullName}
            </h2>

            <p className="text-gray-500">
              @{user.username}
            </p>

            <p className="mt-4">
              {user.email}
            </p>

            <p className="text-gray-500 mt-2">
              Joined:{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardPage;