import { gql } from "apollo-boost";

export const SET_NOTIFICATION = gql`
  mutation saveNotificationRequest($notification: NotificationRequest) {
    notification(notification: $notification)
  }
`;
