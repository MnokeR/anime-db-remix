import clsx from "clsx";

type HeadingProps = {
  regular: string;
  red: string;
  className?: string;
};
function Heading({ regular, red, className }: HeadingProps) {
  return (
    // <h2 className={clsx("text-2xl font-semibold", className)}>
    //   {regular}
    //   <span className="text-primary">{red}</span>
    // </h2>
    <h2
      className={clsx("text-lg text-slate-800 dark:text-slate-300", className)}
    >
      {regular} {red}
    </h2>
  );
}

export default Heading;
