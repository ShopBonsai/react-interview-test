import React, { useState, useEffect } from 'react';
import { Toast, ToastBody } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "../actions/notificationAction";

export default function Notification(props) {
  const dispatch= useDispatch();
  const [show, setShow] = useState(false);
  const notifications = useSelector(state => state.notification.messages);

  useEffect(() => {
    if(notifications.length){
      setShow(true)
    };
  }, [notifications]);
  
  if(!notifications.length){
    return null;
  };

  const handleClostToast = () =>{
    setShow(false);
    dispatch(clearNotification());
  };

	return (
    <div onClick={handleClostToast}>
      <Toast className="toaster" isOpen={show}>
        <ToastBody>
          {notifications[0]}
        </ToastBody>
      </Toast>
    </div>
	)
};