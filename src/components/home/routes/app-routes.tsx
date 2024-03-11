import { Navigate, Route, Routes } from "react-router-dom";
import { ICustomRoute } from "./app-routes.constants";
import AllProductsPage from "../../../modules/all-products/all-products";
import MyCart from "../../../modules/my-cart/my-cart";
import ProductDetails from "../../../modules/product-details/product-details";
import CheckoutPage from "../../../modules/checkout/checkout";
import AdminDashboard from "../../../modules/admin-modules/admin-dashboard/admin-dashboard";
import MyAccount from "../../../modules/my-account/my-account";
import BuyNow from "../../../modules/buy-now/buNow";

const AppRoutes = (props: { isAdmin: boolean }) => {
  const routes: Array<ICustomRoute> = props.isAdmin
    ? [
        { id: 0, path: "", element: <Navigate to="admin-dashboard" replace /> },
        { id: 2, path: "admin-dashboard", element: <AdminDashboard /> },
        { id: 3, path: "myaccount", element: <MyAccount /> },
        {
          id: 10,
          path: "*",
          element: <Navigate to="/admin-dashboard" replace />,
        },
      ]
    : [
        { id: 0, path: "", element: <Navigate to="products" replace /> },
        { id: 2, path: "products", element: <AllProductsPage /> },
        { id: 3, path: "products/:product", element: <ProductDetails /> },
        { id: 4, path: "cart", element: <MyCart /> },
        { id: 5, path: "checkout", element: <CheckoutPage /> },
        { id: 6, path: "myaccount", element: <MyAccount /> },
        {
          id: 7,
          path: "products/category/:category",
          element: <AllProductsPage />,
        },
        { id: 9, path: "buy-now", element: <BuyNow /> },
        {
          id: 10,
          path: "*",
          element: <Navigate to="/products" replace />,
        },
      ];
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
