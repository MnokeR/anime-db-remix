function Heading2({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className="relative text-xl text-primary after:content-[''] after:block after:w-full after:h-1 after:bg-primary"
      {...props}
    >
      {children}
    </h2>
  );
}

export default Heading2;
