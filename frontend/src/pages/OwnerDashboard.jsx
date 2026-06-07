function OwnerDashboard() {

  return (
    <div className="container mt-5">

      <h1 className="text-center mb-4">
        Store Owner Dashboard
      </h1>

      <div className="row">

        <div className="col-md-6">

          <div className="card shadow p-4">

            <h3>Store Information</h3>

            <hr />

            <h5>Store Name</h5>
            <p>Reliance Fresh Pune</p>

            <h5>Average Rating</h5>
            <h2 className="text-success">
              4.5 ⭐
            </h2>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow p-4">

            <h3>Users Who Rated</h3>

            <table className="table table-bordered mt-3">

              <thead className="table-dark">
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Rating</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>Ishwari</td>
                  <td>user@gmail.com</td>
                  <td>5 ⭐</td>
                </tr>

                <tr>
                  <td>Rahul</td>
                  <td>rahul@gmail.com</td>
                  <td>4 ⭐</td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

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

export default OwnerDashboard;