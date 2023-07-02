import { useId } from "react";

const API_ROOT = "htttp://codeial.codingninjas.com:8000/api/v2";

export const API_URLS = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  posts: (page, limit) => `${API_ROOT}/posts?page=${page}&limit=${limit}`,
  createPsot: (content) => `${API_ROOT}/posts/create`,
  createFriendship: (userId) =>
    `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
  friends: () => `${API_ROOT}/friendship/fetch_user_friends`,
  removeFriend: (userId) => `${API_ROOT}/remove_friendship?user_id=${userId}`,
  toggleLike: (itemId, itemtype) =>
    `${API_ROOT}/likes/toggle?likeable_id=${itemId}&likeable_type=${itemtype}`,
  getLikes: (itemId, itemtype) =>
    `${API_ROOT}/likes?likeable_id=${itemId}&likeable_type=${itemtype}`,
  comment: () => `${API_ROOT}/comments`,
  deleteComment: (commentId) => `${API_ROOT}/comments?comment_id=${commentId}`,
  editUser: () => `${API_ROOT}/users/edit`,
  userInfo: (userId) => `${API_ROOT}/users/${useId}`,
  searchUsers: (searchText) => `${API_ROOT}/users/search?text=${searchText}`,
};
