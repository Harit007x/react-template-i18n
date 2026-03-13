import { type RefObject, useRef, useEffect } from "react";
import clsx from "clsx";
import MenuItem from "./menu-item";
import { Icons } from "./icons";
import Header from "./header";
import { SideNavToggleBtn } from "./side-nav-toggle-btn";
import { useSidebarMediaQuery } from "@/hooks/useSidebarMediaQuery";
import { useHandleClickOutside } from "@/hooks/useHandleClickOutside";
import type { SideNavbar } from "@/utils/types";
import { useNavigate } from "react-router-dom";

interface SideNavProps {
  children: React.ReactNode;
  navBar: SideNavbar[];
}

const SideNav = ({ navBar, children }: SideNavProps) => {
  const sideNavRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { isSmallScreen, sidebarOpen, setSidebarOpen } = useSidebarMediaQuery(
    "(min-width: 1024px)"
  );

  // Prevent body scroll when sidebar is open on mobile/tablet
  useEffect(() => {
    if (isSmallScreen && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSmallScreen, sidebarOpen]);

  useHandleClickOutside(
    sideNavRef as RefObject<HTMLDivElement>,
    isSmallScreen,
    () => setSidebarOpen(false)
  );

  const toggleCollapse = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen w-full relative">
      {/* Backdrop overlay for mobile/tablet */}
      {isSmallScreen && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sideNavRef}
        className={clsx(
          "bg-sidebar border-r rtl:border-r-0 rtl:border-l border-sidebar-border h-screen shrink-0 overflow-hidden",
          {
            // Desktop: sticky positioning
            "lg:sticky lg:top-0 lg:z-40": !isSmallScreen,

            // Width handling
            "w-72 max-w-[85vw]": isSmallScreen || sidebarOpen,
            "w-0 border-none": !isSmallScreen && !sidebarOpen,

            // Visibility/Transform
            "lg:translate-x-0": !isSmallScreen,

            // Mobile specific transforms
            "fixed top-0 left-0 z-40 translate-x-0":
              isSmallScreen && sidebarOpen,
            "-translate-x-full fixed top-0 left-0 z-40":
              isSmallScreen && !sidebarOpen,
          }
        )}
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col w-full h-full w-[18rem]">
          {/* Fixed inner width to prevent content squishing during transition */}
          <div className="flex gap-4 items-center min-h-[4rem] h-16 border-b border-sidebar-border sticky top-0 bg-sidebar z-10">
            <div className="w-full flex justify-between items-center text-xl px-4">
              <div
                className="flex justify-start items-center gap-2 group cursor-pointer px-2 py-1 rounded-md select-none"
                onClick={() => navigate("/")}
              >
                <div className="size-7 rounded-sm bg-primary flex items-center justify-center text-white font-bold text-xl shadow-[0px_1px_15px_-3px_rgba(255,_255,_255,_1)]">
                  A
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">
                  Axoracomp
                </span>
              </div>

              <SideNavToggleBtn
                toggleCollapse={toggleCollapse}
                collapsed={!sidebarOpen}
              >
                <Icons.panelLeftClose className="h-4.5 w-4.5 m-[0.1rem] text-muted-foreground group-hover:text-text" />
              </SideNavToggleBtn>
            </div>
          </div>
          {/* Menu */}
          <div className="relative px-5 flex-grow overflow-y-auto no-scrollbar">
            {/* Scrollable content */}
            <div className="flex flex-col">
              {navBar.map((category, idx) => (
                <div key={idx} className="mt-4">
                  <p className="px-2 mb-1 text-sm font-medium ui-text text-text">
                    {category.title}
                  </p>
                  <div className="flex flex-col gap-1">
                    {category.items.map((item, itemIdx) => (
                      <MenuItem key={itemIdx} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="sticky -bottom-1 z-10 h-16 shrink-0 bg-gradient-to-t from-sidebar via-sidebar/80 to-transparent pointer-events-none"></div>
          </div>
          <p className="text-sm font-normal m-auto p-3 tracking-wide"></p>
        </div>
      </aside>

      {/* Content */}
      <main className="flex flex-col w-full flex-1 min-w-0">
        <Header collapsed={!sidebarOpen} toggleCollapse={toggleCollapse} />
        <div className="flex-1 p-4 m-0 bg-background">{children}</div>
      </main>
    </div>
  );
};

export default SideNav;
