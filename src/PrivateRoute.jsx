// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, condition, redirectPath, ...rest }) => {
//   // Check the Firebase field condition
//   const isAllowed = condition;

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAllowed ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to={redirectPath} />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;