import type { SponsorConfig } from "../types/sponsorConfig";

// 配置自己的收款方式后再启用打赏入口。
export const sponsorConfig: SponsorConfig = {
	title: "",
	description: "",
	usage: "感谢你的阅读与支持。",
	showSponsorsList: false,
	showComment: false,
	showButtonInPost: false,
	methods: [],
	sponsors: [],
};
