import { Route } from "react-router-dom";
import Layout from "../packages/layout/Layout";

export default function LayoutRoute({
  component: Component,
  type,
  ...restProps
}) {
  return (
    <Route
      {...restProps}
      render={(props) => {
        return (
          <Layout {...props} type={type}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
}
