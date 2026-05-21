import { describe, it, expect, beforeEach } from "vitest";
import { LinkedList, Node } from "./linkedList";

// Each `describe` block groups related tests for one method.
// `beforeEach` runs before every test, giving each test a fresh list — so
// tests cannot influence each other through shared state.

describe("LinkedList", () => {
  let list: LinkedList;

  beforeEach(() => {
    list = new LinkedList();
  });

  describe("a fresh list", () => {
    it("has no head", () => {
      expect(list.head).toBeNull();
    });

    it("reports isEmpty() === true", () => {
      expect(list.isEmpty()).toBe(true);
    });

    it("has size 0", () => {
      expect(list.size()).toBe(0);
    });

    it("returns an empty array from toArray()", () => {
      expect(list.toArray()).toEqual([]);
    });
  });

  describe("insertAtBeginning", () => {
    it("returns true when the song is new", () => {
      expect(list.insertAtBeginning("A", "Artist A")).toBe(true);
    });

    it("places the new song at the head", () => {
      list.insertAtBeginning("A", "Artist A");
      list.insertAtBeginning("B", "Artist B");

      expect(list.head?.data.title).toBe("B");
    });

    it("links the new node to the previous head", () => {
      list.insertAtBeginning("A", "Artist A");
      list.insertAtBeginning("B", "Artist B");

      expect(list.toArray()).toEqual([
        { title: "B", artist: "Artist B" },
        { title: "A", artist: "Artist A" },
      ]);
    });

    it("rejects duplicates and returns false", () => {
      list.insertAtBeginning("A", "Artist A");

      expect(list.insertAtBeginning("A", "Different Artist")).toBe(false);
      expect(list.size()).toBe(1);
    });
  });

  describe("insertAfter", () => {
    beforeEach(() => {
      // Build: A -> B -> C
      list.insertAtBeginning("C", "Artist C");
      list.insertAtBeginning("B", "Artist B");
      list.insertAtBeginning("A", "Artist A");
    });

    it("inserts in the middle of the list", () => {
      const ok = list.insertAfter("A", "X", "Artist X");

      expect(ok).toBe(true);
      expect(list.toArray().map((s) => s.title)).toEqual(["A", "X", "B", "C"]);
    });

    it("inserts at the end of the list", () => {
      list.insertAfter("C", "X", "Artist X");

      expect(list.toArray().map((s) => s.title)).toEqual(["A", "B", "C", "X"]);
    });

    it("returns false if the anchor title does not exist", () => {
      expect(list.insertAfter("ZZZ", "X", "Artist X")).toBe(false);
      expect(list.size()).toBe(3);
    });

    it("rejects duplicates", () => {
      expect(list.insertAfter("A", "B", "Artist B")).toBe(false);
      expect(list.size()).toBe(3);
    });
  });

  describe("delete", () => {
    beforeEach(() => {
      // Build: A -> B -> C
      list.insertAtBeginning("C", "Artist C");
      list.insertAtBeginning("B", "Artist B");
      list.insertAtBeginning("A", "Artist A");
    });

    it("removes the head", () => {
      const ok = list.delete("A");

      expect(ok).toBe(true);
      expect(list.toArray().map((s) => s.title)).toEqual(["B", "C"]);
    });

    it("removes a middle node", () => {
      list.delete("B");

      expect(list.toArray().map((s) => s.title)).toEqual(["A", "C"]);
    });

    it("removes the last node", () => {
      list.delete("C");

      expect(list.toArray().map((s) => s.title)).toEqual(["A", "B"]);
    });

    it("returns false when the title is not in the list", () => {
      expect(list.delete("ZZZ")).toBe(false);
      expect(list.size()).toBe(3);
    });

    it("returns false on an empty list", () => {
      const empty = new LinkedList();
      expect(empty.delete("A")).toBe(false);
    });

    it("makes the list empty when the only element is removed", () => {
      const tiny = new LinkedList();
      tiny.insertAtBeginning("only", "Artist");

      tiny.delete("only");

      expect(tiny.isEmpty()).toBe(true);
      expect(tiny.head).toBeNull();
    });
  });

  describe("find", () => {
    it("returns null on an empty list", () => {
      expect(list.find("A")).toBeNull();
    });

    it("returns the matching node", () => {
      list.insertAtBeginning("A", "Artist A");

      const found = list.find("A");

      expect(found).toBeInstanceOf(Node);
      expect(found?.data).toEqual({ title: "A", artist: "Artist A" });
    });

    it("returns null when no node matches", () => {
      list.insertAtBeginning("A", "Artist A");

      expect(list.find("ZZZ")).toBeNull();
    });
  });

  describe("size", () => {
    it("counts every node in the list", () => {
      list.insertAtBeginning("A", "Artist A");
      list.insertAtBeginning("B", "Artist B");
      list.insertAtBeginning("C", "Artist C");

      expect(list.size()).toBe(3);
    });
  });
});
