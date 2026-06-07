import { useEffect, useState } from "react";
import API from "../services/api";

function UserDashboard() {

  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {

      const res = await API.get(
        "/user/stores"
      );

      setStores(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const submitRating = async (
    storeId,
    rating
  ) => {

    try {

      await API.post(
        "/user/rating",
        {
          user_id: 4,
          store_id: storeId,
          rating
        }
      );

      alert("Rating Submitted");

      loadStores();

    } catch (error) {

      try {

        await API.put(
          "/user/rating",
          {
            user_id: 4,
            store_id: storeId,
            rating
          }
        );

        alert("Rating Updated");

        loadStores();

      } catch (err) {

        alert("Rating Failed");

      }

    }

  };

  return (
    <div className="container mt-5">

      <h1 className="text-center mb-4">
        User Dashboard
      </h1>

      <div className="card shadow p-4">

        <h3>Available Stores</h3>

        <table className="table table-bordered table-hover mt-3">

          <thead className="table-dark">

            <tr>
              <th>Store Name</th>
              <th>Address</th>
              <th>Overall Rating</th>
              <th>Your Rating</th>
              <th>Rate Store</th>
            </tr>

          </thead>

          <tbody>

            {stores.map((store, index) => (

              <tr key={index}>

                <td>{store.storeName}</td>

                <td>{store.address}</td>

                <td>
                  {store.overallRating} ⭐
                </td>

                <td>
                  {store.userSubmittedRating || "Not Rated"}
                </td>

                <td>

                  <button
                    className="btn btn-success btn-sm me-1"
                    onClick={() =>
                      submitRating(
                        index + 1,
                        5
                      )
                    }
                  >
                    5 ⭐
                  </button>

                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() =>
                      submitRating(
                        index + 1,
                        3
                      )
                    }
                  >
                    3 ⭐
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

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

export default UserDashboard;