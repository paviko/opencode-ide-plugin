import { describe, it, expect } from "vitest"
import { render } from "../test/test-utils"
import { MarkdownRenderer } from "./MarkdownRenderer"

describe("MarkdownRenderer BiDi / RTL support", () => {
  it("renders pure English text with dir='auto'", () => {
    const { container } = render(<MarkdownRenderer>Hello world</MarkdownRenderer>)
    const paragraph = container.querySelector("p")
    expect(paragraph).toBeDefined()
    expect(paragraph?.getAttribute("dir")).toBe("auto")
  })

  it("renders Arabic text with dir='rtl' and data-rtl attribute", () => {
    const { container } = render(<MarkdownRenderer>مرحبا بالعالم</MarkdownRenderer>)
    const paragraph = container.querySelector("p")
    expect(paragraph).toBeDefined()
    expect(paragraph?.getAttribute("dir")).toBe("rtl")
    expect(paragraph?.getAttribute("data-rtl")).toBe("true")
  })

  it("renders list items starting with Latin prefix and containing Arabic text with dir='rtl'", () => {
    const { container } = render(
      <MarkdownRenderer>
        {"* **Tools**: وظائف ينفذها الـ AI مثل البحث"}
      </MarkdownRenderer>
    )
    const li = container.querySelector("li")
    expect(li).toBeDefined()
    expect(li?.getAttribute("dir")).toBe("rtl")
    expect(li?.getAttribute("data-rtl")).toBe("true")
  })

  it("renders list items with pure English text with dir='auto'", () => {
    const { container } = render(
      <MarkdownRenderer>
        {"* **Tools**: actions the AI can run"}
      </MarkdownRenderer>
    )
    const li = container.querySelector("li")
    expect(li).toBeDefined()
    expect(li?.getAttribute("dir")).toBe("auto")
  })
})
