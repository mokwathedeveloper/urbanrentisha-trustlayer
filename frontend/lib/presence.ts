const ONLINE_WINDOW_MS = 5 * 60 * 1000;

export function isOnline(lastActiveAt: string | null): boolean {
  if (!lastActiveAt) return false;
  return Date.now() - new Date(lastActiveAt).getTime() < ONLINE_WINDOW_MS;
}

export function formatLastSeen(lastActiveAt: string | null): string {
  if (!lastActiveAt) return "Activity not available";
  if (isOnline(lastActiveAt)) return "Online now";

  const diffMs = Date.now() - new Date(lastActiveAt).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 60) return `Last seen ${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Last seen ${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `Last seen ${days}d ago`;

  return `Last seen ${new Date(lastActiveAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}
