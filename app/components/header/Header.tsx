interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <header className="flex flex-col gap-6.5 lg:p-13 lg:pt-20 p-6.5 pt-7">
      <h1 className="md:text-5.5xl text-3.5xl text-gray-dark font-light">
        {title}
      </h1>
      <p className="xl:w-1/2 sm:w-2/3 md:text-1.5xl text-gray font-light">
        {subtitle}
      </p>
    </header>
  );
};

export default Header;
