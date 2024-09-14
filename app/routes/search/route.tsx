import { Outlet } from "@remix-run/react";
import Form from "./components/Form";

function Search() {
  return (
    <main>
      <section>
        <Form />
      </section>

      <Outlet />
    </main>
  );
}

export default Search;
