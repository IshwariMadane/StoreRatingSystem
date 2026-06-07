import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0
  });

  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const [showUsers, setShowUsers] = useState(false);
  const [showStores, setShowStores] = useState(false);

  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddStore, setShowAddStore] = useState(false);

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER"
  });

  const [storeForm, setStoreForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: ""
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const res = await API.get("/admin/dashboard");

      setStats(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const getUsers = async () => {
    try {

      const res = await API.get("/admin/users");

      setUsers(res.data);

      setShowUsers(true);
      setShowStores(false);
      setShowAddUser(false);
      setShowAddStore(false);

    } catch (error) {

      console.log(error);

    }
  };

  const getStores = async () => {
    try {

      const res = await API.get("/admin/stores");

      setStores(res.data);

      setShowStores(true);
      setShowUsers(false);
      setShowAddUser(false);
      setShowAddStore(false);

    } catch (error) {

      console.log(error);

    }
  };

  const addUser = async () => {
    try {

      await API.post(
        "/admin/add-user",
        userForm
      );

      alert("User Added Successfully");

      setShowAddUser(false);

      getUsers();

    } catch (error) {

      alert("Failed To Add User");

    }
  };

  const addStore = async () => {
    try {

      await API.post(
        "/admin/add-store",
        storeForm
      );

      alert("Store Added Successfully");

      setShowAddStore(false);

      getStores();

    } catch (error) {

      alert("Failed To Add Store");

    }
  };

  return (
    <div className="container mt-5">

      <h1 className="text-center mb-4">
        Admin Dashboard
      </h1>

      <div className="row">

        <div className="col-md-4">
          <div className="card bg-primary text-white p-4 shadow">
            <h4>Total Users</h4>
            <h2>{stats.totalUsers}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white p-4 shadow">
            <h4>Total Stores</h4>
            <h2>{stats.totalStores}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-danger text-white p-4 shadow">
            <h4>Total Ratings</h4>
            <h2>{stats.totalRatings}</h2>
          </div>
        </div>

      </div>

      <div className="mt-4">

        <button
          className="btn btn-primary me-2"
          onClick={getUsers}
        >
          View Users
        </button>

        <button
          className="btn btn-success me-2"
          onClick={getStores}
        >
          View Stores
        </button>

        <button
          className="btn btn-warning me-2"
          onClick={() => {
            setShowAddUser(true);
            setShowAddStore(false);
            setShowUsers(false);
            setShowStores(false);
          }}
        >
          Add User
        </button>

        <button
          className="btn btn-info"
          onClick={() => {
            setShowAddStore(true);
            setShowAddUser(false);
            setShowUsers(false);
            setShowStores(false);
          }}
        >
          Add Store
        </button>

      </div>

      {showUsers && (
        <div className="mt-4">

          <h3>Users</h3>

          <table className="table table-bordered">

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>

              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

      {showStores && (
        <div className="mt-4">

          <h3>Stores</h3>

          <table className="table table-bordered">

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
              </tr>
            </thead>

            <tbody>

              {stores.map((store) => (
                <tr key={store.id}>
                  <td>{store.id}</td>
                  <td>{store.name}</td>
                  <td>{store.email}</td>
                  <td>{store.address}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

      {showAddUser && (
        <div className="card p-4 mt-4">

          <h3>Add User</h3>

          <input
            className="form-control mb-2"
            placeholder="Name"
            onChange={(e) =>
              setUserForm({
                ...userForm,
                name: e.target.value
              })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Email"
            onChange={(e) =>
              setUserForm({
                ...userForm,
                email: e.target.value
              })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Password"
            onChange={(e) =>
              setUserForm({
                ...userForm,
                password: e.target.value
              })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Address"
            onChange={(e) =>
              setUserForm({
                ...userForm,
                address: e.target.value
              })
            }
          />

          <select
            className="form-control mb-2"
            onChange={(e) =>
              setUserForm({
                ...userForm,
                role: e.target.value
              })
            }
          >
            <option value="USER">USER</option>
            <option value="OWNER">OWNER</option>
          </select>

          <button
            className="btn btn-warning"
            onClick={addUser}
          >
            Save User
          </button>

        </div>
      )}

      {showAddStore && (
        <div className="card p-4 mt-4">

          <h3>Add Store</h3>

          <input
            className="form-control mb-2"
            placeholder="Store Name"
            onChange={(e) =>
              setStoreForm({
                ...storeForm,
                name: e.target.value
              })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Store Email"
            onChange={(e) =>
              setStoreForm({
                ...storeForm,
                email: e.target.value
              })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Address"
            onChange={(e) =>
              setStoreForm({
                ...storeForm,
                address: e.target.value
              })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Owner ID"
            onChange={(e) =>
              setStoreForm({
                ...storeForm,
                owner_id: e.target.value
              })
            }
          />

          <button
            className="btn btn-info"
            onClick={addStore}
          >
            Save Store
          </button>

        </div>
      )}

      <button
        className="btn btn-dark mt-4"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>

    </div>
  );
}

export default AdminDashboard;