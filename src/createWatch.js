const defaultConfig = {
  watchRequestStatus: {pending: true, error: false},
}

export default ({
  response = (e) => e, 
  error = (e) => e, 
  errorHandler = (context, err) => {},
} = {
  response: (e) => e,
  error: (e) => e,
  errorHandler: (context, err) => {},
}) => (context, action, watchRequestStatus = defaultConfig.watchRequestStatus) => (request) => {
  if (watchRequestStatus.pending) context.commit('api/REQUEST_PENDING', { action }, { root: true });

  return request
    .then((res) => {
      context.commit('api/REQUEST_SUCCESS', { action }, { root: true });
      return res;
    })
    .catch((err) => {
      if (watchRequestStatus.error) context.commit('api/REQUEST_FAILURE', { action, error: error(err) }, { root: true });
      errorHandler(context, err);
      throw err;
    });
};