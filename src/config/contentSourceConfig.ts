// 仅排除上游示例，保留源码且不影响以后新增的个人内容。
export const upstreamSampleContent: Record<
	"posts" | "dynamic" | "projects",
	string[]
> = {
	posts: [
		"code-examples.md",
		"draft.md",
		"encrypted-demo.md",
		"firefly.md",
		"guide/firefly-layout-system.md",
		"guide/firefly-wiki-link.md",
		"guide/index.md",
		"katex-math-example.md",
		"markdown-extended.md",
		"markdown-mermaid.md",
		"markdown-plantuml.md",
		"markdown-tutorial.md",
		"mdx-example.mdx",
		"video.md",
	],
	dynamic: [
		"2026-07-15-010756.md",
		"2026-07-15-020613.md",
		"2026-07-15-021127.md",
		"2026-07-15-161529.md",
	],
	projects: ["example-project.md", "firefly.md"],
};

export const excludedTemplateContent: Set<string> = new Set(
	Object.entries(upstreamSampleContent).flatMap(([collection, files]) =>
		files.map((file) => `src/content/${collection}/${file}`),
	),
);
