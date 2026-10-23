import { Navigate, useParams } from "react-router-dom";

export default function ArtikelEdit() {
  const { slug } = useParams();
  return (
    <Navigate
      to={slug ? `/dashboard-artikel/edit/${encodeURIComponent(slug)}` : "/dashboard-artikel/edit"}
      replace
    />
  );
}
