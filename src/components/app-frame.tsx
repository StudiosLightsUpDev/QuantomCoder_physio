import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, Home, UserRound, Waypoints } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Today", icon: Home },
  { to: "/exercises", label: "Library", icon: Waypoints },
  { to: "/progress", label: "Progress", icon: Activity },
  { to: "/profile", label: "You", icon: UserRound },
] as const;

export function AppFrame({
  children,
  hideNav = false,
}: {
  children: ReactNode;
  hideNav?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-sm bg-primary">
              <span className="block h-3 w-2 rounded-[1px] bg-primary-foreground" />
            </span>
            <span className="font-display text-[1.05rem] tracking-tight">PhysioCoach</span>
          </Link>
          <p className="hidden text-xs tracking-wide text-muted-foreground sm:block">
            Form first. Then volume.
          </p>
        </div>
      </header>
      <main
        className={cn(
          "mx-auto w-full max-w-5xl px-4 pt-6",
          hideNav ? "pb-8" : "pb-28",
        )}
      >
        {children}
      </main>
      {!hideNav && (
        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
          <ul className="mx-auto grid max-w-lg grid-cols-4 px-2 py-1">
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(`${item.to}/`);
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] tracking-wide",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={active ? 2.2 : 1.7} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
