// 仅移除构建产物中的原作者收款码和示例资源；public/ 源文件保留备查。
import fs from "node:fs/promises";
import path from "node:path";
import { resolveSiteRoot } from "./site-root";

const root = path.resolve(resolveSiteRoot());
const samples = [
	"assets/images/sponsor/alipay.png",
	"assets/images/sponsor/wechat.png",
	"assets/images/ad/ad1.webp",
	"gallery/encrypted-test/urls.txt",
	"gallery/firefly-2026/urls.txt",
	"gallery/firefly-2026/1.avif",
	"gallery/firefly-2026/cover.avif",
];
for (const file of samples) {
	const target = path.resolve(root, file);
	if (!target.startsWith(root + path.sep))
		throw new Error("Asset outside build directory");
	try {
		await fs.unlink(target);
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
	}
}
console.log(
	"[PERSONALIZATION] Excluded upstream payment codes and gallery samples from build output.",
);
