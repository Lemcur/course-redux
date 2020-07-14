import _ from 'lodash'

import jsonPlaceholder from '../apis/jsonPlaceholder'

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_USER = 'FETCH_USER'

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts())

  const uniqueUserIds = _.uniq(_.map(getState().posts, 'userId'))

  uniqueUserIds.forEach(userId => dispatch(fetchUser(userId)))
}

const fetchPosts = () => async dispatch => {
  const promise = await jsonPlaceholder.get('/posts')

  dispatch({
    type: FETCH_POSTS,
    payload: promise.data,
  })
};

const fetchUser = userId => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${userId}`)

  dispatch({
    type: FETCH_USER,
    payload: response.data,
  })
}

// export const fetchUser = userId => dispatch => _fetchUser(userId, dispatch)

// const _fetchUser = _.memoize(async (userId, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${userId}`)

//   dispatch({
//     type: FETCH_USER,
//     payload: response.data,
//   })
// })
