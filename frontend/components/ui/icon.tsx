import type { CSSProperties } from "react";

export const ICON_GLYPHS = {
  warning: "warning",
  arrow_back: "arrow_back",
  arrow_forward: "arrow_forward",
  verified: "verified",
  bathtub: "bathtub",
  bed: "bed",
  notifications: "notifications",
  bookmark: "bookmark",
  menu_book: "menu_book",
  data_object: "data_object",
  apartment: "apartment",
  calendar_month: "calendar_month",
  event_available: "event_available",
  check: "check",
  done_all: "done_all",
  check_circle: "check_circle",
  expand_more: "expand_more",
  chevron_right: "chevron_right",
  expand_less: "expand_less",
  assignment: "assignment",
  schedule: "schedule",
  code: "code",
  content_copy: "content_copy",
  credit_card: "credit_card",
  download: "download",
  open_in_new: "open_in_new",
  visibility: "visibility",
  visibility_off: "visibility_off",
  description: "description",
  report: "report",
  flag: "flag",
  support_agent: "support_agent",
  favorite: "favorite",
  help: "help",
  home: "home",
  hourglass_empty: "hourglass_empty",
  badge: "badge",
  info: "info",
  key: "key",
  eco: "eco",
  lightbulb: "lightbulb",
  link: "link",
  lock: "lock",
  logout: "logout",
  mail: "mail",
  location_on: "location_on",
  open_in_full: "open_in_full",
  menu: "menu",
  chat_bubble: "chat_bubble",
  chat: "chat",
  more_vert: "more_vert",
  hub: "hub",
  call: "call",
  play_arrow: "play_arrow",
  add: "add",
  add_circle: "add_circle",
  rocket_launch: "rocket_launch",
  restart_alt: "restart_alt",
  search: "search",
  send: "send",
  settings: "settings",
  share: "share",
  gpp_maybe: "gpp_maybe",
  verified_user: "verified_user",
  tune: "tune",
  auto_awesome: "auto_awesome",
  star: "star",
  person: "person",
  person_check: "person_check",
  groups: "groups",
  person_off: "person_off",
  account_balance_wallet: "account_balance_wallet",
  close: "close",
  bolt: "bolt",
} as const;

export type IconName = keyof typeof ICON_GLYPHS;

interface IconProps {
  name: IconName;
  className?: string;
  style?: CSSProperties;
  size?: number;
  filled?: boolean;
}

/** Centralized Material Symbols wrapper — the single place to swap icon glyphs or libraries. */
export function Icon({ name, className, style, size = 20, filled = false }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined inline-block select-none align-middle leading-none ${className ?? ""}`}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 20`,
        ...style,
      }}
      aria-hidden="true"
    >
      {ICON_GLYPHS[name]}
    </span>
  );
}
