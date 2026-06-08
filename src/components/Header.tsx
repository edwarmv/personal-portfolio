import Hamburger from "hamburger-react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useEffect, useRef, useState, type MouseEvent } from "react";

const menuItems = [
  { name: "Edwar Martinez", href: "/" },
  { name: "Experience", href: "/my-work" },
  { name: "About", href: "/contact-me" },
  { name: "Contact", href: "/contact-me" },
];

const MENU_TRANSITION = "translate 0.3s ease-out";

export default function Header({ currentPath }: { currentPath: string }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const mobileMenuContainerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current!;
    document.documentElement.style.setProperty(
      "--header-height",
      `${header.offsetHeight}px`,
    );
  }, []);

  function handleMenuClose(mobileMenu: HTMLElement) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    mobileMenu.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      mobileMenu.style.transition = "none"; // Disable transition during drag
    });

    mobileMenu.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;
      // Ensure menu only moves right (to close)
      if (deltaX < 0) {
        mobileMenu.style.translate = `${deltaX}px`;
      }
    });

    mobileMenu.addEventListener("touchend", () => {
      if (!isDragging) return;
      isDragging = false;
      mobileMenu.style.transition = MENU_TRANSITION; // Re-enable transition

      const menuWidth = mobileMenu.offsetWidth;
      const currentTransform = parseFloat(
        mobileMenu.style.translate.replace("px", ""),
      );

      if (currentTransform * -1 > (menuWidth * 1) / 4) {
        // If dragged more than 50%
        mobileMenu.style.translate = `-${menuWidth}px`; // Close
        enableBodyScroll(mobileMenu);
        setMenuOpen(false);
      } else {
        mobileMenu.style.translate = "0"; // Return to open
      }
    });
  }

  function menuBtnHandleClick() {
    const mobileMenu = mobileMenuContainerRef.current;
    if (!mobileMenu) {
      return;
    }
    mobileMenu.style.transition = MENU_TRANSITION;
    // show menu
    mobileMenu.style.translate = "0";
    disableBodyScroll(mobileMenu);
    handleMenuClose(mobileMenu);
  }

  function handleMenuContainerClick(e: MouseEvent<HTMLElement>) {
    const mobileMenu = e.target as HTMLElement;
    if (mobileMenu === mobileMenuRef.current) return;
    const menuWidth = mobileMenu.offsetWidth;
    mobileMenu.style.translate = `-${menuWidth}px`; // Close
    enableBodyScroll(mobileMenu);
    setMenuOpen(false);
  }

  return (
    <>
      <header
        className="font-headline fixed right-0 left-0 z-10"
        ref={headerRef}
      >
        <nav className="bg-surface p-6 shadow-md">
          <ul className="flex items-center justify-between">
            <li className="text-xl">
              <a href="/">Edwar Martinez</a>
            </li>
            <li>
              <Hamburger
                toggled={isMenuOpen}
                toggle={setMenuOpen}
                onToggle={menuBtnHandleClick}
              />
            </li>
          </ul>
        </nav>
      </header>
      <div
        className="font-headline fixed inset-0 z-10 -translate-x-full"
        ref={mobileMenuContainerRef}
        onClick={handleMenuContainerClick}
      >
        <section
          className="bg-surface relative h-full w-[80%] max-w-96 px-6 py-8 shadow-md duration-200"
          ref={mobileMenuRef}
        >
          <ul className="flex flex-col gap-4 text-xl">
            {menuItems.map(({ href, name }) => (
              <li key={name}>
                <a
                  href={href}
                  aria-current={currentPath === href ? "page" : "false"}
                  className="text-on-surface/60 aria-[current=page]:text-on-surface bg-on-surface/10 block w-full p-4 aria-[current=page]:font-semibold"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
          <div className="absolute top-0 right-0 grid h-full w-6 place-content-center">
            <span className="bg-on-surface/10 inline-block h-[32px] w-[5px] rounded-2xl"></span>
          </div>
        </section>
      </div>
    </>
  );
}
