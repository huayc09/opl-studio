import { describe, expect, test } from "bun:test";
import {
  isConversationNearEnd,
  shouldAutoFollowConversation
} from "../../src/workbench/conversationScrollPolicy";

describe("conversation scroll policy", () => {
  test("only a viewport near the end follows streaming messages", () => {
    expect(isConversationNearEnd({ scrollHeight: 1000, scrollTop: 504, clientHeight: 400 })).toBe(true);
    expect(isConversationNearEnd({ scrollHeight: 1000, scrollTop: 300, clientHeight: 400 })).toBe(false);
  });

  test("reading history or using the composer suppresses automatic scrolling", () => {
    expect(shouldAutoFollowConversation({
      atLatest: true,
      followingLatest: true,
      composerFocused: false
    })).toBe(true);
    expect(shouldAutoFollowConversation({
      atLatest: true,
      followingLatest: false,
      composerFocused: false
    })).toBe(false);
    expect(shouldAutoFollowConversation({
      atLatest: true,
      followingLatest: true,
      composerFocused: true
    })).toBe(false);
    expect(shouldAutoFollowConversation({
      atLatest: false,
      followingLatest: true,
      composerFocused: false
    })).toBe(false);
  });
});
