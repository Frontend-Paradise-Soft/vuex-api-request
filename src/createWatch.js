export default ({
  response = (e) => e, 
  error = (e) => e, 
  errorHandler = (context, err) => {},
} = {
  response: (e) => e,
  error: (e) => e,
  errorHandler: (context, err) => {},
}) => (context, action, watchItems = ['pending', 'error']) => (request) => {
  const watchPendingStatus = watchItems && watchItems.includes('pending');
  const watchErrorStatus = watchItems && watchItems.includes('error');

  if (watchPendingStatus) context.commit('api/REQUEST_PENDING', { action }, { root: true });

  return request
    .then((res) => {
      context.commit('api/REQUEST_SUCCESS', { action }, { root: true });
      return res;
    })
    .catch((err) => {
      if (watchErrorStatus) context.commit('api/REQUEST_FAILURE', { action, error: error(err) }, { root: true });
      errorHandler(context, err);
      throw err;
    });
};