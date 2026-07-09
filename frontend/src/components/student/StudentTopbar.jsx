import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function getInstructorAccess(user) {
  const approved =
    user?.role === "instructor" ||
    user?.isInstructorApproved === true ||
    (Array.isArray(user?.roles) &&
      user.roles.includes("instructor"));

  let status =
    user?.instructorApplicationStatus ||
    user?.instructorStatus ||
    "";

  if (
    !status &&
    typeof window !== "undefined" &&
    user
  ) {
    try {
      const identity =
        user?._id ||
        user?.id ||
        user?.email ||
        "current-user";

      const savedApplication = localStorage.getItem(
        `skillora_instructor_application_${identity}`
      );

      if (savedApplication) {
        const parsedApplication =
          JSON.parse(savedApplication);

        status =
          parsedApplication?.status || "";
      }
    } catch (error) {
      console.error(
        "Could not read instructor application status:",
        error
      );
    }
  }

  return {
    approved,
    status: String(status).toLowerCase(),
  };
}

function StudentTopbar({
  onMenuClick,
  theme = "dark",
}) {
  const { user } = useAuth();
  const isDark = theme === "dark";

  const [cartItems, setCartItems] = useState([]);
  const [notifications, setNotifications] =
    useState([]);
  const [adminMessages, setAdminMessages] =
    useState([]);
  const [isMessageOpen, setIsMessageOpen] =
    useState(false);

  const userIdentity =
    user?._id ||
    user?.id ||
    user?.email ||
    "current-user";

  const cartStorageKey = useMemo(
    () => `skillora_cart_${userIdentity}`,
    [userIdentity]
  );

  const notificationStorageKey = useMemo(
    () =>
      `skillora_notifications_${userIdentity}`,
    [userIdentity]
  );

  const messageStorageKey = useMemo(
    () =>
      `skillora_admin_messages_${userIdentity}`,
    [userIdentity]
  );

  const userName =
    user?.name ||
    user?.fullName ||
    user?.displayName ||
    "Skillora User";

  const userAvatar =
    user?.avatar ||
    user?.photoURL ||
    user?.profileImage ||
    "";

  const userInitial =
    userName?.charAt(0)?.toUpperCase() || "S";

  const { approved: isInstructor } =
    getInstructorAccess(user);

  const instructorPath = isInstructor
    ? "/instructor/dashboard"
    : "/become-instructor";

  useEffect(() => {
    const getStoredArray = (storageKey) => {
      try {
        const storedValue =
          localStorage.getItem(storageKey);

        if (!storedValue) return [];

        const parsedValue =
          JSON.parse(storedValue);

        return Array.isArray(parsedValue)
          ? parsedValue
          : [];
      } catch (error) {
        console.error(
          `Could not load ${storageKey}:`,
          error
        );

        return [];
      }
    };

    const loadTopbarData = () => {
      setCartItems(
        getStoredArray(cartStorageKey)
      );

      setNotifications(
        getStoredArray(notificationStorageKey)
      );

      setAdminMessages(
        getStoredArray(messageStorageKey)
      );
    };

    loadTopbarData();

    window.addEventListener(
      "storage",
      loadTopbarData
    );

    window.addEventListener(
      "skillora-cart-updated",
      loadTopbarData
    );

    window.addEventListener(
      "skillora-notifications-updated",
      loadTopbarData
    );

    window.addEventListener(
      "skillora-admin-messages-updated",
      loadTopbarData
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadTopbarData
      );

      window.removeEventListener(
        "skillora-cart-updated",
        loadTopbarData
      );

      window.removeEventListener(
        "skillora-notifications-updated",
        loadTopbarData
      );

      window.removeEventListener(
        "skillora-admin-messages-updated",
        loadTopbarData
      );
    };
  }, [
    cartStorageKey,
    notificationStorageKey,
    messageStorageKey,
  ]);

  useEffect(() => {
    if (!isMessageOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMessageOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [isMessageOpen]);

  const unreadNotificationCount =
    notifications.filter(
      (notification) =>
        notification?.isRead !== true &&
        notification?.read !== true
    ).length ||
    Number(
      user?.notificationCount ||
        user?.unreadNotifications ||
        0
    );

  const unreadMessageCount =
    adminMessages.filter(
      (message) =>
        message?.isRead !== true &&
        message?.read !== true
    ).length;

  const cartCount =
    cartItems.length ||
    Number(user?.cartCount || 0);

  const toggleTheme = () => {
    const nextTheme = isDark
      ? "light"
      : "dark";

    localStorage.setItem(
      "theme",
      nextTheme
    );

    document.body.style.backgroundColor =
      nextTheme === "dark"
        ? "#061311"
        : "#e8f3ee";

    window.dispatchEvent(
      new Event("themechange")
    );
  };

  const handleMarkAllMessagesRead = () => {
    const updatedMessages =
      adminMessages.map((message) => ({
        ...message,
        isRead: true,
        read: true,
      }));

    setAdminMessages(updatedMessages);

    localStorage.setItem(
      messageStorageKey,
      JSON.stringify(updatedMessages)
    );

    window.dispatchEvent(
      new CustomEvent(
        "skillora-admin-messages-updated",
        {
          detail: {
            messages: updatedMessages,
            unreadCount: 0,
          },
        }
      )
    );
  };

  const formatMessageDate = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const headerTheme = isDark
    ? "border-teal-400/10 bg-[#061311]/90"
    : "border-emerald-900/10 bg-[#e8f3ee]/90";

  const iconButtonTheme = isDark
    ? "border-white/10 bg-white/[0.035] text-slate-400 hover:border-teal-400/35 hover:bg-teal-400/10 hover:text-teal-300"
    : "border-emerald-900/10 bg-white/60 text-slate-600 hover:border-emerald-500/35 hover:bg-white hover:text-emerald-700";

  const messagePanelTheme = isDark
    ? "border-white/10 bg-[#071713] text-white"
    : "border-emerald-900/10 bg-[#f7fcf9] text-[#061311]";

  const messageCardTheme = isDark
    ? "border-white/[0.08] bg-white/[0.035]"
    : "border-emerald-900/10 bg-white";

  return (
    <>
      <header
        className={`sticky top-0 z-40 h-16 border-b backdrop-blur-2xl ${headerTheme}`}
      >
        <div className="flex h-full items-center justify-between gap-3 px-3 sm:px-5 lg:px-7">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition lg:hidden ${iconButtonTheme}`}
            aria-label="Open dashboard menu"
            title="Open menu"
          >
            <MenuIcon />
          </button>

          {/* Welcome user */}
          <div className="min-w-0 flex-1">
            <p
              className={`truncate text-[10px] font-semibold uppercase tracking-[0.12em] ${
                isDark
                  ? "text-slate-500"
                  : "text-slate-500"
              }`}
            >
              Welcome
            </p>

            <h2
              className={`truncate text-sm font-black sm:text-[15px] ${
                isDark
                  ? "text-white"
                  : "text-[#061311]"
              }`}
            >
              {userName}
            </h2>
          </div>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Start teaching */}
            <Link
              to={instructorPath}
              className={`flex h-9 items-center gap-2 rounded-xl border px-2.5 text-[11px] font-extrabold transition sm:px-3 ${
                isInstructor
                  ? isDark
                    ? "border-teal-400/25 bg-teal-400/10 text-teal-300 hover:bg-teal-400/15"
                    : "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15"
                  : iconButtonTheme
              }`}
              title={
                isInstructor
                  ? "Open Instructor Dashboard"
                  : "Start Teaching"
              }
            >
              <TeachingIcon />

              <span className="hidden xl:inline">
                {isInstructor
                  ? "Instructor Dashboard"
                  : "Start Teaching"}
              </span>
            </Link>

            {/* Cart */}
            <TopbarIconLink
              to="/student/cart"
              label="Cart"
              count={cartCount}
              themeClass={iconButtonTheme}
            >
              <CartIcon />
            </TopbarIconLink>

            {/* Messages */}
            <button
              type="button"
              onClick={() =>
                setIsMessageOpen(true)
              }
              className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition ${iconButtonTheme}`}
              aria-label="Admin messages"
              title="Admin messages"
            >
              <MessageIcon />

              <CountBadge
                count={unreadMessageCount}
              />
            </button>

            {/* Notifications */}
            <TopbarIconLink
              to="/student/notifications"
              label="Notifications"
              count={unreadNotificationCount}
              themeClass={iconButtonTheme}
            >
              <BellIcon />
            </TopbarIconLink>

            {/* Theme */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${iconButtonTheme}`}
              aria-label="Toggle theme"
              title={
                isDark
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {isDark ? (
                <SunIcon />
              ) : (
                <MoonIcon />
              )}
            </button>

            {/* Profile */}
            <Link
              to="/student/profile"
              className={`ml-0.5 rounded-xl border p-1 transition sm:ml-1 ${
                isDark
                  ? "border-transparent hover:border-white/10 hover:bg-white/[0.04]"
                  : "border-transparent hover:border-emerald-900/10 hover:bg-white/60"
              }`}
              title="My Profile"
            >
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="h-9 w-9 rounded-xl object-cover shadow-[0_0_20px_rgba(45,212,191,0.18)]"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-300 to-emerald-500 text-[13px] font-black text-[#061311] shadow-[0_0_20px_rgba(45,212,191,0.22)]">
                  {userInitial}
                </div>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Message floating panel */}
      {isMessageOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-md">
          <button
            type="button"
            onClick={() =>
              setIsMessageOpen(false)
            }
            className="absolute inset-0 cursor-default"
            aria-label="Close message panel"
          />

          <section
            className={`relative z-10 flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-[26px] border shadow-[0_35px_100px_rgba(0,0,0,0.55)] ${messagePanelTheme}`}
          >
            {/* Message header */}
            <header
              className={`flex items-start justify-between gap-4 border-b px-5 py-5 sm:px-6 ${
                isDark
                  ? "border-white/10"
                  : "border-emerald-900/10"
              }`}
            >
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-teal-500">
                  Skillora Communication
                </p>

                <h2 className="mt-1 text-lg font-black sm:text-xl">
                  Messages from Admin
                </h2>

                <p
                  className={`mt-1 text-[11px] ${
                    isDark
                      ? "text-slate-400"
                      : "text-slate-600"
                  }`}
                >
                  Important updates and direct
                  messages from the administration.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setIsMessageOpen(false)
                }
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition ${iconButtonTheme}`}
                aria-label="Close messages"
              >
                <CloseIcon />
              </button>
            </header>

            {/* Message actions */}
            {adminMessages.length > 0 && (
              <div
                className={`flex items-center justify-between gap-3 border-b px-5 py-3 sm:px-6 ${
                  isDark
                    ? "border-white/10"
                    : "border-emerald-900/10"
                }`}
              >
                <p
                  className={`text-[11px] font-semibold ${
                    isDark
                      ? "text-slate-400"
                      : "text-slate-600"
                  }`}
                >
                  {unreadMessageCount} unread
                  message
                  {unreadMessageCount === 1
                    ? ""
                    : "s"}
                </p>

                {unreadMessageCount > 0 && (
                  <button
                    type="button"
                    onClick={
                      handleMarkAllMessagesRead
                    }
                    className="text-[11px] font-black text-teal-500 transition hover:text-teal-400"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
            )}

            {/* Message list */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {adminMessages.length > 0 ? (
                <div className="space-y-3">
                  {adminMessages.map(
                    (message, index) => {
                      const messageRead =
                        message?.isRead === true ||
                        message?.read === true;

                      return (
                        <article
                          key={
                            message?._id ||
                            message?.id ||
                            index
                          }
                          className={`rounded-2xl border p-4 ${
                            !messageRead
                              ? "border-teal-400/30 bg-teal-400/[0.08]"
                              : messageCardTheme
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="truncate text-[13px] font-black">
                                  {message?.title ||
                                    message?.subject ||
                                    "Message from Admin"}
                                </h3>

                                {!messageRead && (
                                  <span className="h-2 w-2 shrink-0 rounded-full bg-teal-400" />
                                )}
                              </div>

                              <p className="mt-1 text-[10px] font-semibold text-teal-500">
                                {message?.sender ||
                                  message?.senderName ||
                                  "Skillora Admin"}
                              </p>
                            </div>

                            <span
                              className={`shrink-0 text-[9px] ${
                                isDark
                                  ? "text-slate-500"
                                  : "text-slate-500"
                              }`}
                            >
                              {formatMessageDate(
                                message?.createdAt ||
                                  message?.date ||
                                  message?.sentAt
                              )}
                            </span>
                          </div>

                          <p
                            className={`mt-3 whitespace-pre-line text-[12px] leading-5 ${
                              isDark
                                ? "text-slate-300"
                                : "text-slate-700"
                            }`}
                          >
                            {message?.message ||
                              message?.body ||
                              message?.text ||
                              "No message content available."}
                          </p>
                        </article>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="flex min-h-[260px] flex-col items-center justify-center px-5 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-500">
                    <LargeMessageIcon />
                  </div>

                  <h3 className="mt-4 text-sm font-black">
                    No admin messages
                  </h3>

                  <p
                    className={`mt-2 max-w-sm text-[11px] leading-5 ${
                      isDark
                        ? "text-slate-400"
                        : "text-slate-600"
                    }`}
                  >
                    Messages sent by the Skillora
                    administration will appear here.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function TopbarIconLink({
  to,
  label,
  count = 0,
  themeClass,
  children,
}) {
  return (
    <Link
      to={to}
      className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition ${themeClass}`}
      aria-label={label}
      title={label}
    >
      {children}

      <CountBadge count={count} />
    </Link>
  );
}

function CountBadge({ count }) {
  if (!count || count <= 0) {
    return null;
  }

  return (
    <span className="absolute -right-1.5 -top-1.5 flex min-h-[17px] min-w-[17px] items-center justify-center rounded-full bg-red-500 px-1 text-[8px] font-black leading-none text-white shadow-md">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20 7H6" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
      <path d="M8 9h8M8 13h5" />
    </svg>
  );
}

function LargeMessageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
      <path d="M8 9h8M8 13h5" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

function TeachingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 8 9-5 9 5-9 5-9-5Z" />
      <path d="M7 10.5V15c0 1.7 2.2 3 5 3s5-1.3 5-3v-4.5" />
      <path d="M21 8v6" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export default StudentTopbar;