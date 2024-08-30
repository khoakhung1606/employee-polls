import React from "react";
import { connect } from "react-redux";

function LeaderBoard(props) {
  const { listUser } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        height: "100px",
      }}
    >
      <table
        style={{
          borderCollapse: "collapse",
          width: "60%",
          border: "1px solid black",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              User
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Answered
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            Object.values(listUser)
              .sort(
                (item1, item2) =>
                  Object.keys(item2.answers).length +
                  Object.keys(item2.questions).length -
                  (Object.keys(item1.answers).length +
                    Object.keys(item1.questions).length)
              )
              .map((user) => (
                <tr key={user.id}>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                      }}
                    >
                      <img
                        src={user.avatarURL ? user.avatarURL : "/login.PNG"}
                        alt="Avatar"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                        }}
                      >
                        <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                          {user.name}
                        </div>
                        <div style={{ color: "gray", fontSize: "14px" }}>
                          {user.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      textAlign: "center",
                    }}
                  >
                    {Object.keys(user.answers).length}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      textAlign: "center",
                    }}
                  >
                    {user.questions.length}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    listUser: state.userReducer.listUser,
  };
};

export default connect(mapStateToProps, null)(LeaderBoard);
