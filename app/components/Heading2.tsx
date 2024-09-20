function Heading2({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className="text-primary text-lg" {...props}>
      {children}
    </h2>
  );
}

export default Heading2;
