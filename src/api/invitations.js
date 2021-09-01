const baseUrl = "http://localhost:3010";

export const getInvitations = (params = {}) => {
  return fetch(`${baseUrl}/invitations?` + new URLSearchParams(params));
};
