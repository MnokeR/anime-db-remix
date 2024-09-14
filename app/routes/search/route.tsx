import { Outlet } from "@remix-run/react";
import Form from "./components/Form";
import { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "AnimeDB - Search" },
    { name: "description", content: "Search for your favorite Anime!" },
  ];
};

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
