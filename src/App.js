import { useEffect, useState } from "react";
import { getInvitations } from "./api/invitations";
import "./App.css";

function App() {
  const [invitations, setInvitations] = useState([]);
  const [callUpdateInvitations, setCallUpdateInvitations] = useState(false);

  useEffect(() => {
    getInvitationsAndUpdatedOnes();
  }, []);

  useEffect(() => {
    const params = {
      update: true,
    };
    setTimeout(() => {
      getInvitationsAndUpdatedOnes(params);
    }, 8000);
  }, [callUpdateInvitations]);

  const getInvitationsAndUpdatedOnes = (params) => {
    getInvitations(params)
      .then((response) => response.json())
      .then((data) => {
        if (params) {
          let invitationsArr = invitations;
          const updatedArray = data.invites;
          updatedArray.map((item) => {
            const itemObj = item;
            itemObj.new_notification = true;
            invitationsArr.push(item);
          });
          setInvitations(invitationsArr);
        } else {
          setInvitations(data.invites);
          setCallUpdateInvitations(true);
        }
      });
  };
  return (
    <div className="container">
      {invitations.map((item, index) => {
        return (
          <div
            className={`border notification-box ${
              item.status === "read" ? "read" : "unread"
            } ${item?.new_notification ? "new-notification" : ""}`}
            key={`${item.sender_id}_${item.sig_id}_${index}`}
          >
            {item?.new_notification && <div className="new_tag">new</div>}
            <div className="status">{item.status}</div>
            <div className="invite-text">{item.invite}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
