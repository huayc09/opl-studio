export type ConversationScrollMetrics = {
  scrollHeight: number;
  scrollTop: number;
  clientHeight: number;
};

export function isConversationNearEnd(
  metrics: ConversationScrollMetrics,
  thresholdPx = 96,
): boolean {
  return metrics.scrollHeight - metrics.scrollTop - metrics.clientHeight <= thresholdPx;
}

export function shouldAutoFollowConversation(input: {
  atLatest: boolean;
  followingLatest: boolean;
  composerFocused: boolean;
}): boolean {
  return input.atLatest && input.followingLatest && !input.composerFocused;
}
