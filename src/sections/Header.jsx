import { Link as LinkScroll } from "react-scroll";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Button from "../components/Button";

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 32);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 z-50 w-full  transition-all duration-500",
        hasScrolled && " bg-black-100/80 backdrop-blur-[8px]",
      )}
    >
      <div className="container-fluid flex items-center px-4 lg:px-7.5 xl:px-10 max-lg:py-4">
        <div className="flex-1">
          <LinkScroll
            to="hero"
            offset={-250}
            spy
            smooth
            className="cursor-pointer block"
          >
          <img
              src="/images/logo.png"
              width={180}
              height={180}
              alt="logo"
            />
          </LinkScroll>
        </div>

        <Button  className=" ml-auto lg:flex" href="mailto:info@meenterpriseai.com">
          Contact Us
        </Button>
      </div>
    </header>
  );
};

export default Header;
